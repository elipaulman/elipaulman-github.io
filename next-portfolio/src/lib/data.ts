import personalJson from "@/data/personal.json";
import socialsJson from "@/data/socials.json";
import skillsJson from "@/data/skills.json";
import experienceJson from "@/data/experience.json";
import projectsJson from "@/data/projects.json";
import educationJson from "@/data/education.json";
import faqJson from "@/data/faq.json";
import type {
  Personal,
  Socials,
  Skills,
  Experience,
  Project,
  Education,
  FAQ,
} from "@/types";

export const personal = personalJson as Personal;
export const socials = socialsJson as Socials;
export const skills = skillsJson as Skills;
export const experience = experienceJson as Experience[];
export const projects = projectsJson as Project[];
export const education = educationJson as Education[];
export const faq = faqJson as FAQ[];
