/**
 * Experience Form Section
 */

import React, { useState } from "react";
import {
  TextInput,
  TextArea,
  DateInput,
  CheckboxInput,
  Button,
  FormGroup,
  FormGrid,
  SectionCard,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { ExperienceEntry } from "@/lib/types";
import { Plus, Trash2, X } from "lucide-react";

export const ExperienceForm = () => {
  const { resume, addExperience, updateExperience, removeExperience } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceEntry>>({});
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newResponsibility, setNewResponsibility] = useState("");

  const handleAddExperience = () => {
    setFormData({});
    setResponsibilities([]);
    setEditingId("");
  };

  const handleEditExperience = (experience: ExperienceEntry) => {
    setFormData(experience);
    setResponsibilities(experience.responsibilities || []);
    setEditingId(experience.id);
  };

  const handleSave = () => {
    if (formData.id === null || formData.id === undefined) {
      addExperience({
        id: Date.now().toString(),
        company: formData.company || "",
        position: formData.position || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        currentlyWorking: formData.currentlyWorking || false,
        description: formData.description || "",
        responsibilities: responsibilities,
      });
    } else {
      updateExperience(formData.id, {
        ...formData,
        responsibilities: responsibilities,
      });
    }
    setFormData({});
    setResponsibilities([]);
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({});
    setResponsibilities([]);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()]);
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Existing Experience Entries */}
      {resume.experience.map((experience) => (
        <SectionCard key={experience.id} title={experience.position || "Experience"}>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">{experience.company}</p>
            <p className="text-gray-700">{experience.position}</p>
            <p className="text-sm text-gray-600">
              {experience.startDate}{" "}
              {!experience.currentlyWorking && `- ${experience.endDate}`}
              {experience.currentlyWorking && "- Present"}
            </p>
            {experience.description && (
              <p className="text-gray-600">{experience.description}</p>
            )}
            {experience.responsibilities && experience.responsibilities.length > 0 && (
              <ul className="list-disc pl-5 text-gray-600 text-sm mt-2">
                {experience.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditExperience(experience)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeExperience(experience.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </SectionCard>
      ))}

      {/* Form */}
      {editingId !== null || Object.keys(formData).length > 0 ? (
        <SectionCard title="Add/Edit Experience">
          <FormGroup>
            <FormGrid cols={2}>
              <TextInput
                label="Company"
                name="company"
                value={formData.company || ""}
                onChange={handleInputChange}
                placeholder="Company Name"
                required
              />
              <TextInput
                label="Job Title"
                name="position"
                value={formData.position || ""}
                onChange={handleInputChange}
                placeholder="Senior Developer"
                required
              />
            </FormGrid>

            <FormGrid cols={2}>
              <DateInput
                label="Start Date"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleInputChange}
              />
              <DateInput
                label="End Date"
                name="endDate"
                value={formData.endDate || ""}
                onChange={handleInputChange}
                disabled={formData.currentlyWorking}
              />
            </FormGrid>

            <CheckboxInput
              name="currentlyWorking"
              checked={formData.currentlyWorking || false}
              onChange={handleInputChange}
              label="I currently work here"
            />

            <TextArea
              label="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Brief description of your role"
              rows={3}
            />

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsibilities
              </label>
              <div className="space-y-2 mb-3">
                {responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200"
                  >
                    <span className="text-sm text-gray-700">{resp}</span>
                    <button
                      onClick={() => removeResponsibility(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <TextInput
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addResponsibility();
                    }
                  }}
                  placeholder="Add a responsibility"
                />
                <Button onClick={addResponsibility} variant="secondary">
                  Add
                </Button>
              </div>
            </div>
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Experience
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddExperience} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Experience
        </Button>
      )}
    </div>
  );
};
