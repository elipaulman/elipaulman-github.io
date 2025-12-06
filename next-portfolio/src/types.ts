export type Personal = {
  name: string;
  shortName: string;
  title: string;
  email: string;
  schoolEmail: string;
  phone: string;
  location: string;
  website: string;
  gpa: string;
  university: string;
  graduationDate: string;
  linkedIn: string;
  github: string;
  about: {
    short: string;
    detailed: string;
  };
  hobbies: string;
};

export type SocialMediaLink = {
  url: string;
  label: string;
  icon: string;
  repositories?: string;
};

export type Socials = {
  email: {
    primary: string;
    school: string;
  };
  phone: string;
  socialMedia: {
    linkedin: SocialMediaLink;
    github: SocialMediaLink;
  };
  website: string;
  resume: {
    path: string;
    label: string;
    icon: string;
  };
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type Skills = {
  programmingLanguages: SkillItem[];
  frameworks: SkillItem[];
  tools?: SkillItem[];
  skills?: SkillItem[];
};

export type Experience = {
  id: string;
  date: string;
  title: string;
  company: string;
  logo: string;
  logoAlt: string;
  responsibilities: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  techUsed: string;
  link: string;
  linkText: string;
  tags?: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  dates: string;
  image: string;
  imageAlt: string;
  details: string[];
};

export type FAQ = {
  id: string;
  question: string;
  answer:
    | string
    | {
        programmingLanguages?: string;
        software?: string;
        frameworks?: string;
        otherSkills?: string;
        leadership?: string[];
        roles?: string[];
        goals?: string;
      };
  expanded: boolean;
};
