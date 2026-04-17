import React from "react";
import { useResumeStore } from "@/lib/resume-store";
import {
  User,
  Briefcase,
  BookOpen,
  Lightbulb,
  Code,
  Award,
  Globe,
  Palette,
  Download,
  Redo2,
  Undo2,
  Menu,
  X,
  Plus,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/form-inputs";

interface SidebarProps {
  onCustomizationClick: () => void;
  showCustomization: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  onExportPDF?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onCustomizationClick,
  showCustomization,
  isExpanded = true,
  onToggle,
  onExportPDF,
}) => {
  const { activeSection, setActiveSection, undo, redo, history, historyIndex } =
    useResumeStore();

  const sections = [
    { id: "personalInfo", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "skills", label: "Skills", icon: Lightbulb },
    { id: "projects", label: "Projects", icon: Code },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "languages", label: "Languages", icon: Globe },
    { id: "customSections", label: "Custom Sections", icon: Plus },
  ] as const;

  return (
    <aside
      className={clsx(
        "transition-all duration-300 bg-linear-to-b from-gray-50 to-gray-100 border-r border-gray-200",
        isExpanded ? "w-64" : "w-24",
      )}
    >
      <div
        className={clsx(
          "p-4 border-b border-gray-200 flex items-center",
          isExpanded ? "justify-between" : "justify-center",
        )}
      >
        {isExpanded && (
          <h2 className="text-lg font-bold text-gray-900">Resume Builder</h2>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        <div className="p-4 space-y-2">
          {isExpanded && (
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
              Sections
            </p>
          )}
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveSection(section.id as any)}
                className={clsx(
                  "w-full flex items-center  gap-3 px-2 py-2 rounded-lg transition-colors",
                  isExpanded ? "justify-start" : "justify-center",
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200",
                )}
                title={section.label}
              >
                <IconComponent size={20} />
                {isExpanded && <span className="text-sm">{section.label}</span>}
              </button>
            );
          })}
        </div>

        <div className="border-t border-gray-200 mx-4"></div>
        <div className="p-4 space-y-2">
          {isExpanded && (
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
              History
            </p>
          )}

          <div
            className={clsx(
              "flex",
              isExpanded ? "grid grid-cols-2 gap-2" : "grid grid-cols-1",
            )}
          >
            <button
              onClick={undo}
              disabled={historyIndex === 0}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-lg transition-colors",
                historyIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200",
              )}
              title="Undo"
            >
              <Undo2 size={18} />
              {isExpanded && <span className="text-sm">Undo</span>}
            </button>
            <button
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-lg transition-colors",
                historyIndex === history.length - 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200",
              )}
              title="Redo"
            >
              <Redo2 size={18} />
              {isExpanded && <span className="text-sm">Redo</span>}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 mx-4"></div>
        <div className="p-4 space-y-2">
          {isExpanded && (
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
              Customize
            </p>
          )}
          <button
            onClick={onCustomizationClick}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ",
              isExpanded ? "justify-start" : "justify-center",
              showCustomization
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200",
            )}
            title="Customization"
          >
            <Palette size={20} />
            {isExpanded && <span className="text-sm">Customize</span>}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 space-y-2">
        {isExpanded && (
          <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
            Export
          </p>
        )}

        <div className="space-y-2">
          <Button
            onClick={onExportPDF}
            size="sm"
            variant="primary"
            className={clsx(
              "w-full text-xs justify-content items-centerß",
              !isExpanded && "py-2",
            )}
            title="Export as PDF"
          >
            <Download size={16} />
            {isExpanded && <span className="ml-2">PDF</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};
