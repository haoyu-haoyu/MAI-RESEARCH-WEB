import { Project, ProjectPageData, Publication, SiteContent, TeamMember } from './types';

interface ProjectRecord extends Project {
  hidden?: boolean;
  image_alt?: string;
  link_label?: string;
  page?: ProjectPageData;
  redirect?: string;
  route?: string;
  text?: string;
  title_link?: string | null;
}

interface TeamRecord {
  id?: string;
  name: string;
  image: string;
  image_alt?: string;
  role_1?: string;
  role_2?: string;
  bio?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  image_position?: string;
  image_fit?: 'cover' | 'contain';
  image_scale?: number;
}

interface PublicationRecord {
  id?: string;
  title?: string;
  authors?: string | string[];
  year?: string | number;
  publication?: string;
  journal?: string;
  link?: string;
  citation_id?: string;
  pdf?: string;
  doi?: string;
}

const contentUrls = {
  projects: new URL('./data/projects.json', import.meta.url),
  publications: new URL('./data/publications.json', import.meta.url),
  team: new URL('./data/team.json', import.meta.url)
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const withBasePath = (value: string) => {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(value)) {
    return value;
  }

  return `${import.meta.env.BASE_URL}${value.replace(/^\.\//, '')}`;
};

const fetchArray = async <T>(url: URL, label: string): Promise<T[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load ${label} (${response.status} ${response.statusText})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error(`${label} must contain a JSON array`);
  }

  return data as T[];
};

const normalizeProjects = (records: ProjectRecord[]) => {
  const projects: Project[] = [];
  const projectPages: Record<string, ProjectPageData> = {};
  const projectRedirects: Record<string, string> = {};

  records.forEach((record, index) => {
    const id = record.id || slugify(record.title) || `project-${index + 1}`;
    const image = withBasePath(record.image);

    if (!record.hidden) {
      projects.push({
        id,
        title: record.title,
        category: record.category || 'Research Project',
        description: record.text || record.description || '',
        image,
        link: record.route || record.link || record.title_link || '#research',
        size: ['small', 'medium', 'large'].includes(record.size) ? record.size : 'small',
        year: String(record.year || '')
      });
    }

    if (record.page) {
      projectPages[id] = {
        ...record.page,
        id,
        image: withBasePath(record.page.image)
      };
    }

    if (record.route && record.redirect) {
      projectRedirects[record.route] = record.redirect;
    }
  });

  return { projects, projectPages, projectRedirects };
};

const normalizeTeam = (records: TeamRecord[]): TeamMember[] =>
  records.map((record, index) => ({
    id: record.id || slugify(record.name) || `team-member-${index + 1}`,
    name: record.name,
    role: record.role_1 || '',
    roleDetail: record.role_2 || undefined,
    image: withBasePath(record.image),
    imagePosition: record.image_position,
    imageFit: record.image_fit,
    imageScale: record.image_scale,
    bio: record.bio || '',
    socials: {
      email: record.email || undefined,
      github: record.github || undefined,
      linkedin: record.linkedin || undefined
    }
  }));

const normalizePublications = (records: PublicationRecord[]): Publication[] =>
  records
    .map((record, index) => {
      const title = record.title || 'Untitled';
      const year = String(record.year || '');
      const authors = Array.isArray(record.authors)
        ? record.authors
        : record.authors
          ? [record.authors]
          : [];

      return {
        id: record.id || record.citation_id || `${year || 'undated'}-${slugify(title) || index + 1}`,
        title,
        journal: record.publication || record.journal || '',
        year,
        authors,
        link: record.link || '',
        pdf: record.pdf,
        doi: record.doi || ''
      };
    })
    .sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

export const loadSiteContent = async (): Promise<SiteContent> => {
  const [projectRecords, publicationRecords, teamRecords] = await Promise.all([
    fetchArray<ProjectRecord>(contentUrls.projects, 'projects'),
    fetchArray<PublicationRecord>(contentUrls.publications, 'publications'),
    fetchArray<TeamRecord>(contentUrls.team, 'team')
  ]);
  const { projects, projectPages, projectRedirects } = normalizeProjects(projectRecords);

  return {
    projects,
    projectPages,
    projectRedirects,
    publications: normalizePublications(publicationRecords),
    team: normalizeTeam(teamRecords)
  };
};
