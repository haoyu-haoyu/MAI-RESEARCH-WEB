export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  size: 'small' | 'medium' | 'large';
  year: string;
}

export interface ProjectPageResource {
  label: string;
  href: string;
  description?: string;
  primary?: boolean;
}

export interface ProjectPageSection {
  label: string;
  title: string;
  text: string;
}

export interface ProjectPageMetric {
  value: string;
  label: string;
}

export interface ProjectPageData {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
  headline: string;
  summary: string;
  focus: string;
  model: string;
  overview: ProjectPageSection[];
  ideas: ProjectPageSection[];
  metrics: ProjectPageMetric[];
  resources: ProjectPageResource[];
  note?: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  authors: string[];
  link: string;
  pdf?: string;
  doi: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleDetail?: string; // For things like "PhD Student (DRIVE-Health CDT)"
  image: string;
  imagePosition?: string;
  imageFit?: 'cover' | 'contain';
  imageScale?: number;
  bio: string;
  socials?: {
    email?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteContent {
  projects: Project[];
  projectPages: Record<string, ProjectPageData>;
  publications: Publication[];
  team: TeamMember[];
}
