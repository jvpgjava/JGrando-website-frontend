export interface SocialLink {
  label: string;
  url: string;
  type: 'github' | 'linkedin' | 'whatsapp' | 'instagram' | string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  socials: SocialLink[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  techStack: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  impact: string;
  period: string;
  stack: string[];
  link?: string | null;
}

export interface ServiceItem {
  name: string;
  description: string;
  focus: string[];
}

export interface ProfileResponse {
  personalInfo: PersonalInfo;
  skills: SkillGroup[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  status: string;
  referenceId: string;
}

