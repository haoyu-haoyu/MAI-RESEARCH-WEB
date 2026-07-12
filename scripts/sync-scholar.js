import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(projectRoot, 'data', 'publications.json');

const unquote = value => {
  const trimmed = value.trim();
  if (
    trimmed.length >= 2
    && ((trimmed.startsWith('"') && trimmed.endsWith('"'))
      || (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const loadLocalEnvironment = async () => {
  for (const filename of ['.env.local', '.env']) {
    const envPath = path.join(projectRoot, filename);

    try {
      await access(envPath);
      const contents = await readFile(envPath, 'utf8');

      contents.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z\d_]*)\s*=\s*(.*)\s*$/);
        if (!match || process.env[match[1]] !== undefined) return;
        process.env[match[1]] = unquote(match[2]);
      });
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
};

const fetchScholarPage = async ({ apiKey, authorId, start }) => {
  const endpoint = new URL('https://serpapi.com/search.json');
  endpoint.search = new URLSearchParams({
    engine: 'google_scholar_author',
    author_id: authorId,
    api_key: apiKey,
    hl: 'en',
    start: String(start)
  }).toString();

  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(30_000)
  });

  if (!response.ok) {
    const details = (await response.text()).slice(0, 300);
    throw new Error(`SerpApi request failed (${response.status}): ${details}`);
  }

  return response.json();
};

await loadLocalEnvironment();

const apiKey = process.env.SERPAPI_KEY;
const authorId = process.env.SCHOLAR_USER_ID;

if (!apiKey || !authorId) {
  throw new Error(
    'Missing SERPAPI_KEY or SCHOLAR_USER_ID. Set them in the environment, .env.local, or .env.'
  );
}

const publications = [];
const seenIds = new Set();
let start = 0;

while (true) {
  const data = await fetchScholarPage({ apiKey, authorId, start });
  const articles = Array.isArray(data.articles) ? data.articles : [];

  if (articles.length === 0) break;

  articles.forEach(article => {
    const citationId = article.citation_id || '';
    const fallbackId = `${article.year || ''}:${article.title || ''}`;
    const identity = citationId || fallbackId;

    if (seenIds.has(identity)) return;
    seenIds.add(identity);
    publications.push({
      title: article.title || '',
      authors: article.authors || '',
      year: article.year || '',
      publication: article.publication || '',
      link: article.link || '',
      citation_id: citationId
    });
  });

  if (!data.serpapi_pagination?.next) break;
  start += articles.length;
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(publications, null, 2)}\n`, 'utf8');

console.log(`Saved ${publications.length} publications to data/publications.json`);
