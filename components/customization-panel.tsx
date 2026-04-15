/**
 * Customization Panel
 * Controls theme, colors, and section visibility
 */

import React from "react";
import {
  Select,
  CheckboxInput,
  Button,
  FormGroup,
  SectionCard,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { Moon, Sun, RefreshCw } from "lucide-react";
import clsx from "clsx";

export const CustomizationPanel = () => {
  const { customization, updateCustomization, toggleSectionVisibility } =
    useResumeStore();

  const handleColorChange = (type: "primary" | "secondary", color: string) => {
    updateCustomization({
      [type === "primary" ? "primaryColor" : "secondaryColor"]: color,
    });
  };

  const handleThemeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateCustomization({ theme: e.target.value as any });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCustomization({ fontFamily: e.target.value as any });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCustomization({ fontSize: e.target.value as any });
  };

  const handleSpacingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCustomization({ spacing: e.target.value as any });
  };

  const toggleDarkMode = () => {
    updateCustomization({ darkMode: !customization.darkMode });
  };

  const resetToDefaults = () => {
    if (
      confirm(
        "Are you sure you want to reset customization to default settings?"
      )
    ) {
      updateCustomization({
        theme: "professional",
        primaryColor: "#1f2937",
        secondaryColor: "#3b82f6",
        fontFamily: "sans",
        fontSize: "medium",
        spacing: "normal",
        darkMode: false,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <SectionCard title="Template & Theme">
        <FormGroup>
          <Select
            label="Resume Template"
            value={customization.theme}
            onChange={handleThemeChange}
            options={[
              { label: "Professional", value: "professional" },
              { label: "Minimal", value: "minimal" },
              { label: "Creative", value: "creative" },
            ]}
          />

          <div className="flex gap-2">
            <button
              onClick={toggleDarkMode}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-colors",
                customization.darkMode
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              )}
            >
              <Moon size={18} />
              Dark Mode
            </button>
            <button
              onClick={toggleDarkMode}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-colors",
                !customization.darkMode
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              )}
            >
              <Sun size={18} />
              Light Mode
            </button>
          </div>
        </FormGroup>
      </SectionCard>

      {/* Colors */}
      <SectionCard title="Colors">
        <FormGroup>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <code className="text-sm text-gray-600">
                {customization.primaryColor}
              </code>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customization.secondaryColor}
                onChange={(e) => handleColorChange("secondary", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <code className="text-sm text-gray-600">
                {customization.secondaryColor}
              </code>
            </div>
          </div>
        </FormGroup>
      </SectionCard>

      {/* Typography */}
      <SectionCard title="Typography">
        <FormGroup>
          <Select
            label="Font Family"
            value={customization.fontFamily}
            onChange={handleFontChange}
            options={[
              { label: "Sans Serif", value: "sans" },
              { label: "Serif", value: "serif" },
              { label: "Monospace", value: "mono" },
            ]}
          />

          <Select
            label="Font Size"
            value={customization.fontSize}
            onChange={handleFontSizeChange}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" },
            ]}
          />

          <Select
            label="Spacing"
            value={customization.spacing}
            onChange={handleSpacingChange}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Normal", value: "normal" },
              { label: "Relaxed", value: "relaxed" },
            ]}
          />
        </FormGroup>
      </SectionCard>

      {/* Section Visibility */}
      <SectionCard title="Visible Sections">
        <FormGroup>
          <CheckboxInput
            checked={customization.sectionsVisibility.personalInfo}
            onChange={() => toggleSectionVisibility("personalInfo")}
            label="Personal Information"
          />
          <CheckboxInput
            checked={customization.sectionsVisibility.experience}
            onChange={() => toggleSectionVisibility("experience")}
            label="Experience"
          />
          <CheckboxInput
            checked={customization.sectionsVisibility.education}
            onChange={() => toggleSectionVisibility("education")}
            label="Education"
          />
          <CheckboxInput
            checked={customization.sectionsVisibility.skills}
            onChange={() => toggleSectionVisibility("skills")}
            label="Skills"
          />
          <CheckboxInput
            checked={customization.sectionsVisibility.projects}
            onChange={() => toggleSectionVisibility("projects")}
            label="Projects"
          />
          <CheckboxInput
            checked={customization.sectionsVisibility.certifications}
            onChange={() => toggleSectionVisibility("certifications")}
            label="Certifications"
          />
          <CheckboxInput
            checked={customization.sectionsVisibility.languages}
            onChange={() => toggleSectionVisibility("languages")}
            label="Languages"
          />
        </FormGroup>
      </SectionCard>

      {/* Reset */}
      <Button
        onClick={resetToDefaults}
        variant="outline"
        className="w-full"
      >
        <RefreshCw size={18} className="mr-2" />
        Reset to Defaults
      </Button>
    </div>
  );
};
