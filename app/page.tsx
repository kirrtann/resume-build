"use client";

import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useResumeStore, useResumeLocalStorage } from "@/lib/resume-store";
import { Sidebar } from "@/components/sidebar";
import { ResumePreview } from "@/components/resume-preview";
import { CustomizationPanel } from "@/components/customization-panel";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";
import { EducationForm } from "@/components/forms/education-form";
import { ExperienceForm } from "@/components/forms/experience-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { CustomSectionsForm } from "@/components/forms/custom-sections-form";
import {
  CertificationsForm,
  LanguagesForm,
} from "@/components/forms/certifications-languages-form";
import { SectionCard } from "@/components/form-inputs";

export default function Home() {
  const [showCustomization, setShowCustomization] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const { resume, customization, activeSection } = useResumeStore();

  const { saveToLocalStorage, loadFromLocalStorage } = useResumeLocalStorage();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resume.personalInfo.fullName
      ? `${resume.personalInfo.fullName.replace(/\\s+/g, "_")}_Resume`
      : "Resume",
  });

  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      useResumeStore.setState({
        resume: saved.resume,
        customization: saved.customization,
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(resume, customization);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resume, customization]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personalInfo":
        return <PersonalInfoForm />;
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "languages":
        return <LanguagesForm />;
      case "customSections":
        return <CustomSectionsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onCustomizationClick={() => setShowCustomization(!showCustomization)}
        showCustomization={showCustomization}
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        onExportPDF={handlePrint}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex gap-4 p-4">
        {/* Form Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            <SectionCard
              title={`Edit ${activeSection}`}
              className="sticky top-0 z-10"
            >
              <p className="text-sm text-gray-600">
                Update your {activeSection} information below
              </p>
            </SectionCard>
            {renderActiveSection()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {showCustomization ? (
            <div className="sticky top-0 z-10">
              <CustomizationPanel setShowCustomization={setShowCustomization} />
            </div>
          ) : (
            <div className="border-2 border-gray-200 rounded-lg overflow-y-auto bg-white h-full print:border-0 print:rounded-0">
              <div ref={printRef}>
                <ResumePreview data={resume} customization={customization} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
