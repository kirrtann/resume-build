/**
 * Resume Builder - Type Definitions
 * Central location for all TypeScript interfaces and types
 */

// Personal Information
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary?: string;
  profilePhoto?: string; // base64 string
}

// Education Entry
export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  currentlyStudying?: boolean;
  description?: string;
}

// Experience/Job Entry
export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking?: boolean;
  description?: string;
  responsibilities?: string[];
}

// Skills Entry
export interface Skill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

// Projects Entry
export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

// Certifications Entry
export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// Languages Entry
export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: "elementary" | "limited" | "professional" | "full";
}

// Custom Section Entry
export interface CustomSectionEntry {
  id: string;
  title: string;
  description: string;
}

// Main Resume Data Structure
export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Skill[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  customSections: CustomSectionEntry[];
}

// Customization/Theme Settings
export interface CustomizationSettings {
  theme: "minimal" | "professional" | "creative";
  primaryColor: string;
  secondaryColor: string;
  fontFamily: "sans" | "serif" | "mono";
  fontSize: "small" | "medium" | "large";
  spacing: "compact" | "normal" | "relaxed";
  darkMode: boolean;
  sectionsVisibility: {
    personalInfo: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
    certifications: boolean;
    languages: boolean;
    customSections: boolean;
  };
}

// Resume Store State
export interface ResumeState {
  // Data
  resume: ResumeData;
  customization: CustomizationSettings;
  
  // UI State
  activeSection: keyof Omit<ResumeData, "personalInfo"> | "personalInfo";
  sectionOrder: Array<keyof Omit<ResumeData, "personalInfo"> | "personalInfo">;
  
  // Undo/Redo
  history: ResumeData[];
  historyIndex: number;
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: EducationEntry) => void;
  updateEducation: (id: string, education: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;
  
  addExperience: (experience: ExperienceEntry) => void;
  updateExperience: (id: string, experience: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  
  addProject: (project: ProjectEntry) => void;
  updateProject: (id: string, project: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;
  
  addCertification: (cert: CertificationEntry) => void;
  updateCertification: (id: string, cert: Partial<CertificationEntry>) => void;
  removeCertification: (id: string) => void;
  
  addLanguage: (language: LanguageEntry) => void;
  updateLanguage: (id: string, language: Partial<LanguageEntry>) => void;
  removeLanguage: (id: string) => void;
  
  addCustomSection: (section: CustomSectionEntry) => void;
  updateCustomSection: (id: string, section: Partial<CustomSectionEntry>) => void;
  removeCustomSection: (id: string) => void;
  
  // Customization
  updateCustomization: (settings: Partial<CustomizationSettings>) => void;
  toggleSectionVisibility: (section: keyof CustomizationSettings["sectionsVisibility"]) => void;
  
  // Section Management
  setActiveSection: (section: keyof Omit<ResumeData, "personalInfo"> | "personalInfo") => void;
  reorderSections: (newOrder: typeof ResumeData.prototype) => void;
  
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  
  // Import/Export
  importData: (data: ResumeData) => void;
  exportData: () => ResumeData;
}

// Component Props Types
export interface SectionProps {
  section: keyof Omit<ResumeData, "personalInfo"> | "personalInfo";
  isActive: boolean;
}

export interface FormSectionProps {
  section: keyof Omit<ResumeData, "personalInfo"> | "personalInfo";
}
