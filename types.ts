export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  year: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  authors: string[];
  link: string;
  doi: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleDetail?: string; // For things like "PhD Student (DRIVE-Health CDT)"
  image: string;
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