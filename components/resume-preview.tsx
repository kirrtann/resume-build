/**
 * Resume Preview Component
 * Renders resume in different templates/themes
 */

import React from "react";
import { ResumeData, CustomizationSettings } from "@/lib/types";
import clsx from "clsx";
import "@/components/ui/print.css";
import Image from "next/image";
interface ResumePreviewProps {
  data: ResumeData;
  customization: CustomizationSettings;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  customization,
}) => {
  const { theme } = customization;

  if (theme === "minimal") {
    return <MinimalTemplate data={data} customization={customization} />;
  } else if (theme === "creative") {
    return <CreativeTemplate data={data} customization={customization} />;
  } else {
    return <ProfessionalTemplate data={data} customization={customization} />;
  }
};

// Professional Template
const ProfessionalTemplate: React.FC<ResumePreviewProps> = ({
  data,
  customization,
}) => {
  const { darkMode, primaryColor, sectionsVisibility, fontFamily } =
    customization;

  return (
    <div
      id="resume-preview"
      className={clsx(
        "w-full max-w-4xl mx-auto p-4 print:p-0 Print-style",
        fontFamily,
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
      )}
    >
      {/* Header */}
      <div
        className="mb-5 pb-4 border-b-2"
        style={{
          borderColor: primaryColor,
          fontFamily: fontFamily,
        }}
      >
        <div className="flex items-start justify-between">
          {data.personalInfo.profilePhoto && (
            <Image
              src={data.personalInfo.profilePhoto}
              alt={data.personalInfo.fullName}
              width={80}
              height={80}
              unoptimized
              className="w-20 h-20 rounded-lg object-cover mr-4"
            />
          )}
          <div className="flex-1 ">
            <h1
              className="text-4xl font-bold mb-1"
              style={{ color: primaryColor }}
            >
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <p
              style={{ fontFamily: fontFamily }}
              className="text-lg opacity-75 max-h-[150px] overflow-hidden"
            >
              {data.personalInfo.summary || "Professional Summary"}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div
          className="mt-4 flex flex-wrap gap-4 text-sm"
          style={{ fontFamily: fontFamily }}
        >
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo.website && (
            <a
              href={data.personalInfo.website}
              className={clsx("hover:underline")}
              style={{ color: primaryColor }}
            >
              {data.personalInfo.website}
            </a>
          )}
        </div>
      </div>

      {/* Experience */}
      {sectionsVisibility.experience && data.experience.length > 0 && (
        <Section title="Experience" primaryColor={primaryColor}>
          <div className="space-y-4" style={{ fontFamily: fontFamily }}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <span className="text-sm opacity-75">
                    {exp.startDate} -{" "}
                    {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="opacity-75 mb-2">{exp.company}</p>
                {exp.description && <p className="mb-2">{exp.description}</p>}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc pl-5 text-sm opacity-75">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {sectionsVisibility.education && data.education.length > 0 && (
        <Section title="Education" primaryColor={primaryColor}>
          <div className="space-y-4" style={{ fontFamily: fontFamily }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="opacity-75">{edu.school}</p>
                  </div>
                  <span className="text-sm opacity-75">
                    {edu.startDate} -{" "}
                    {edu.currentlyStudying ? "Present" : edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-sm opacity-75 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {sectionsVisibility.skills && data.skills.length > 0 && (
        <Section title="Skills" primaryColor={primaryColor}>
          <div
            className="flex flex-wrap gap-2"
            style={{ fontFamily: fontFamily }}
          >
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className={clsx(
                  "px-3 py-1 rounded text-sm",
                  darkMode ? "bg-gray-800" : "bg-gray-100",
                )}
              >
                <span className="font-medium">{skill.name}</span>
                {skill.level && (
                  <span className="opacity-75 ml-2">({skill.level})</span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {sectionsVisibility.projects && data.projects.length > 0 && (
        <Section title="Projects" primaryColor={primaryColor}>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-lg">{proj.title}</h3>
                <p className="opacity-75 text-sm mb-2">
                  {proj.startDate && proj.endDate
                    ? `${proj.startDate} - ${proj.endDate}`
                    : proj.startDate}
                </p>
                <p className="mb-2">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-sm opacity-75">
                    <strong>Tech:</strong> {proj.technologies.join(", ")}
                  </p>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    className="text-sm"
                    style={{ color: primaryColor }}
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {sectionsVisibility.certifications && data.certifications.length > 0 && (
        <Section title="Certifications" primaryColor={primaryColor}>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-sm opacity-75">
                  {cert.issuer} • {cert.issueDate}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {sectionsVisibility.languages && data.languages.length > 0 && (
        <Section title="Languages" primaryColor={primaryColor}>
          <div className="grid grid-cols-2 gap-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="text-sm">
                <span className="font-medium">{lang.language}</span>
                <span className="opacity-75 ml-2">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Custom Sections */}
      {sectionsVisibility.customSections && data.customSections.length > 0 && (
        <>
          {data.customSections.map((section) => (
            <Section
              key={section.id}
              title={section.title}
              primaryColor={primaryColor}
            >
              <p className="text-sm whitespace-pre-wrap">
                {section.description}
              </p>
            </Section>
          ))}
        </>
      )}
    </div>
  );
};

// Minimal Template
const MinimalTemplate: React.FC<ResumePreviewProps> = ({
  data,
  customization,
}) => {
  const { darkMode, primaryColor, sectionsVisibility } = customization;

  return (
    <div
      id="resume-preview"
      className={clsx(
        "w-full max-w-4xl mx-auto p-14 print:p-0",
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
      )}
    >
      {/* Compact Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          {data.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm mt-2 opacity-75">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {data.personalInfo.summary && (
        <p className="mb-6 italic text-sm">{data.personalInfo.summary}</p>
      )}

      {/* Compact Sections */}
      {sectionsVisibility.experience && data.experience.length > 0 && (
        <MinimalSection title="Experience" primaryColor={primaryColor}>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3 text-sm">
              <div className="font-semibold">
                {exp.position} • {exp.company}
              </div>
              <div className="opacity-75">
                {exp.startDate} -{" "}
                {exp.currentlyWorking ? "Present" : exp.endDate}
              </div>
            </div>
          ))}
        </MinimalSection>
      )}

      {sectionsVisibility.education && data.education.length > 0 && (
        <MinimalSection title="Education" primaryColor={primaryColor}>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3 text-sm">
              <div className="font-semibold">
                {edu.degree} in {edu.field}
              </div>
              <div className="opacity-75">{edu.school}</div>
            </div>
          ))}
        </MinimalSection>
      )}

      {sectionsVisibility.skills && data.skills.length > 0 && (
        <MinimalSection title="Skills" primaryColor={primaryColor}>
          <div className="text-sm">
            {data.skills.map((skill, idx) => (
              <span key={skill.id}>
                {skill.name}
                {idx < data.skills.length - 1 && " • "}
              </span>
            ))}
          </div>
        </MinimalSection>
      )}

      {sectionsVisibility.projects && data.projects.length > 0 && (
        <MinimalSection title="Projects" primaryColor={primaryColor}>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3 text-sm">
              <div className="font-semibold">{proj.title}</div>
              <div className="opacity-75">{proj.description}</div>
            </div>
          ))}
        </MinimalSection>
      )}

      {sectionsVisibility.languages && data.languages.length > 0 && (
        <MinimalSection title="Languages" primaryColor={primaryColor}>
          <div className="text-sm">
            {data.languages.map((lang, idx) => (
              <span key={lang.id}>
                {lang.language}
                {idx < data.languages.length - 1 && " • "}
              </span>
            ))}
          </div>
        </MinimalSection>
      )}

      {sectionsVisibility.customSections && data.customSections.length > 0 && (
        <>
          {data.customSections.map((section) => (
            <MinimalSection
              key={section.id}
              title={section.title}
              primaryColor={primaryColor}
            >
              <p className="text-sm whitespace-pre-wrap">
                {section.description}
              </p>
            </MinimalSection>
          ))}
        </>
      )}
    </div>
  );
};

// Creative Template
const CreativeTemplate: React.FC<ResumePreviewProps> = ({
  data,
  customization,
}) => {
  const { darkMode, primaryColor, secondaryColor, sectionsVisibility } =
    customization;

  return (
    <div
      id="resume-preview"
      className={clsx(
        "w-full max-w-4xl mx-auto print:p-0",
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
      )}
    >
      <div className="p-4 text-white" style={{ backgroundColor: primaryColor }}>
        {data.personalInfo.profilePhoto && (
          <Image
            src={data.personalInfo.profilePhoto}
            alt={data.personalInfo.fullName}
            width={96}
            height={96}
            unoptimized
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white"
          />
        )}
        <h1 className="text-4xl font-bold mb-2">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-lg opacity-90 mb-4">{data.personalInfo.summary}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {sectionsVisibility.experience && data.experience.length > 0 && (
          <CreativeSection title="Experience" primaryColor={primaryColor}>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="font-medium" style={{ color: secondaryColor }}>
                  {exp.company}
                </p>
                <p className="text-sm opacity-75 mb-2">
                  {exp.startDate} -{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-sm">{exp.description}</p>
                )}
              </div>
            ))}
          </CreativeSection>
        )}

        {sectionsVisibility.skills && data.skills.length > 0 && (
          <CreativeSection title="Skills" primaryColor={primaryColor}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded text-center text-sm font-medium"
                  style={{
                    backgroundColor:
                      darkMode + " rgba(0,0,0,0.1)" || "rgba(0,0,0,0.05)",
                  }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </CreativeSection>
        )}

        {sectionsVisibility.projects && data.projects.length > 0 && (
          <CreativeSection title="Projects" primaryColor={primaryColor}>
            <div className="grid gap-4">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded border-l-4"
                  style={{ borderColor: primaryColor }}
                >
                  <h3 className="font-semibold text-lg">{proj.title}</h3>
                  <p className="text-sm opacity-75 mb-2">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor:
                              darkMode + " rgba(0,0,0,0.1)" ||
                              "rgba(0,0,0,0.05)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CreativeSection>
        )}

        {sectionsVisibility.customSections &&
          data.customSections.length > 0 && (
            <>
              {data.customSections.map((section) => (
                <CreativeSection
                  key={section.id}
                  title={section.title}
                  primaryColor={primaryColor}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {section.description}
                  </p>
                </CreativeSection>
              ))}
            </>
          )}
      </div>
    </div>
  );
};

// Helper Components
const Section: React.FC<{
  title: string;
  primaryColor: string;
  children: React.ReactNode;
}> = ({ title, primaryColor, children }) => (
  <div className="mb-8">
    <h2
      className="text-2xl font-bold mb-4 pb-2 border-b-2"
      style={{ borderColor: primaryColor, color: primaryColor }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const MinimalSection: React.FC<{
  title: string;
  primaryColor: string;
  children: React.ReactNode;
}> = ({ title, primaryColor, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
      {title}
    </h2>
    {children}
  </div>
);

const CreativeSection: React.FC<{
  title: string;
  primaryColor: string;
  children: React.ReactNode;
}> = ({ title, primaryColor, children }) => (
  <div className="mb-8">
    <h2
      className="text-2xl font-bold mb-6 pb-2 border-b-4"
      style={{ borderColor: primaryColor, color: primaryColor }}
    >
      {title}
    </h2>
    {children}
  </div>
);
