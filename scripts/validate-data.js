import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const loadArray = async filename => {
  const filePath = path.join(projectRoot, 'data', filename);
  const value = JSON.parse(await readFile(filePath, 'utf8'));
  if (!Array.isArray(value)) throw new Error(`data/${filename} must contain a JSON array`);
  return value;
};

const requireFields = (records, fields, label) => {
  records.forEach((record, index) => {
    fields.forEach(field => {
      if (record[field] === undefined || record[field] === null || record[field] === '') {
        throw new Error(`${label}[${index}] is missing ${field}`);
      }
    });
  });
};

const requireUniqueValues = (records, label, getValue) => {
  const seen = new Set();
  records.forEach(record => {
    const value = getValue(record);
    if (seen.has(value)) throw new Error(`${label} contains duplicate value: ${value}`);
    seen.add(value);
  });
};

const requireImages = async records => {
  await Promise.all(records.map(async record => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(record.image)) return;
    try {
      await access(path.join(projectRoot, 'public', record.image));
    } catch {
      throw new Error(`Missing image referenced by data: public/${record.image}`);
    }
  }));
};

const [projects, publications, team] = await Promise.all([
  loadArray('projects.json'),
  loadArray('publications.json'),
  loadArray('team.json')
]);

requireFields(projects, ['title', 'text', 'image', 'link'], 'projects');
requireFields(publications, ['title', 'authors', 'link'], 'publications');
requireFields(team, ['name', 'image', 'role_1', 'bio', 'email'], 'team');
requireUniqueValues(projects, 'projects', record => record.id || record.title);
requireUniqueValues(team, 'team', record => record.id || record.name);
requireUniqueValues(
  publications,
  'publications',
  record => record.citation_id || `${record.year || ''}:${record.title}`
);
await requireImages([...projects, ...team]);

console.log(
  `Validated ${projects.length} projects, ${team.length} team members, `
  + `${publications.length} Scholar records.`
);
