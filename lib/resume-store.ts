/**
 * Resume Store - Zustand State Management
 * Handles all resume data, customization, and actions
 */

import { create } from "zustand";
import { ResumeData, CustomizationSettings, ResumeState } from "./types";

// Default Resume Data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    profilePhoto: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  customSections: [],
};

// Default Customization Settings
const defaultCustomization: CustomizationSettings = {
  theme: "professional",
  primaryColor: "#1f2937",
  secondaryColor: "#3b82f6",
  fontFamily: "sans",
  fontSize: "medium",
  spacing: "normal",
  darkMode: false,
  sectionsVisibility: {
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: false,
    languages: false,
    customSections: true,
  },
};

// Export the store
export const useResumeStore = create<ResumeState>((set, get) => ({
  // Initial State
  resume: defaultResumeData,
  customization: defaultCustomization,
  activeSection: "personalInfo",
  sectionOrder: [
    "personalInfo",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
  ],
  history: [defaultResumeData],
  historyIndex: 0,

  // Personal Info Actions
  updatePersonalInfo: (info) => {
    set((state) => {
      const updated = {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Education Actions
  addEducation: (education) => {
    set((state) => {
      const updated = {
        ...state.resume,
        education: [...state.resume.education, education],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateEducation: (id, education) => {
    set((state) => {
      const updated = {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...education } : e,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeEducation: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Experience Actions
  addExperience: (experience) => {
    set((state) => {
      const updated = {
        ...state.resume,
        experience: [...state.resume.experience, experience],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateExperience: (id, experience) => {
    set((state) => {
      const updated = {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...experience } : e,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeExperience: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Skills Actions
  addSkill: (skill) => {
    set((state) => {
      const updated = {
        ...state.resume,
        skills: [...state.resume.skills, skill],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateSkill: (id, skill) => {
    set((state) => {
      const updated = {
        ...state.resume,
        skills: state.resume.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeSkill: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        skills: state.resume.skills.filter((s) => s.id !== id),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Projects Actions
  addProject: (project) => {
    set((state) => {
      const updated = {
        ...state.resume,
        projects: [...state.resume.projects, project],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateProject: (id, project) => {
    set((state) => {
      const updated = {
        ...state.resume,
        projects: state.resume.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeProject: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        projects: state.resume.projects.filter((p) => p.id !== id),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Certifications Actions
  addCertification: (cert) => {
    set((state) => {
      const updated = {
        ...state.resume,
        certifications: [...state.resume.certifications, cert],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateCertification: (id, cert) => {
    set((state) => {
      const updated = {
        ...state.resume,
        certifications: state.resume.certifications.map((c) =>
          c.id === id ? { ...c, ...cert } : c,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeCertification: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        certifications: state.resume.certifications.filter((c) => c.id !== id),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Languages Actions
  addLanguage: (language) => {
    set((state) => {
      const updated = {
        ...state.resume,
        languages: [...state.resume.languages, language],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateLanguage: (id, language) => {
    set((state) => {
      const updated = {
        ...state.resume,
        languages: state.resume.languages.map((l) =>
          l.id === id ? { ...l, ...language } : l,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeLanguage: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        languages: state.resume.languages.filter((l) => l.id !== id),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Custom Sections Actions
  addCustomSection: (section) => {
    set((state) => {
      const updated = {
        ...state.resume,
        customSections: [...state.resume.customSections, section],
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateCustomSection: (id, section) => {
    set((state) => {
      const updated = {
        ...state.resume,
        customSections: state.resume.customSections.map((cs) =>
          cs.id === id ? { ...cs, ...section } : cs,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  removeCustomSection: (id) => {
    set((state) => {
      const updated = {
        ...state.resume,
        customSections: state.resume.customSections.filter(
          (cs) => cs.id !== id,
        ),
      };
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // Customization Actions
  updateCustomization: (settings) => {
    set((state) => ({
      customization: { ...state.customization, ...settings },
    }));
  },

  toggleSectionVisibility: (section) => {
    set((state) => ({
      customization: {
        ...state.customization,
        sectionsVisibility: {
          ...state.customization.sectionsVisibility,
          [section]: !state.customization.sectionsVisibility[section],
        },
      },
    }));
  },

  // Section Management
  setActiveSection: (section) => {
    set(() => ({
      activeSection: section,
    }));
  },

  reorderSections: (newOrder) => {
    set(() => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sectionOrder: newOrder as any,
    }));
  },

  // Undo/Redo
  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          resume: state.history[newIndex],
          historyIndex: newIndex,
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          resume: state.history[newIndex],
          historyIndex: newIndex,
        };
      }
      return state;
    });
  },

  // Import/Export
  importData: (data) => {
    set((state) => {
      const updated = data;
      return {
        resume: updated,
        history: [...state.history.slice(0, state.historyIndex + 1), updated],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  exportData: () => {
    return get().resume;
  },
}));

// Local Storage persistence hook
export const useResumeLocalStorage = () => {
  const STORAGE_KEY = "resume_builder_data";

  const saveToLocalStorage = (
    data: ResumeData,
    customization: CustomizationSettings,
  ) => {
    try {
      const dataToStore = { resume: data, customization };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  };

  const loadFromLocalStorage = (): {
    resume: ResumeData;
    customization: CustomizationSettings;
  } | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      return null;
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  };

  return { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
};
