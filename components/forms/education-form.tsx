/**
 * Education Form Section
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
import { EducationEntry } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export const EducationForm = () => {
  const { resume, addEducation, updateEducation, removeEducation } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EducationEntry>>({});

  const handleAddEducation = () => {
    setFormData({});
    setEditingId("");
  };

  const handleEditEducation = (education: EducationEntry) => {
    setFormData(education);
    setEditingId(education.id);
  };

  const handleSave = () => {
    if (formData.id === null || formData.id === undefined) {
      addEducation({
        id: Date.now().toString(),
        school: formData.school || "",
        degree: formData.degree || "",
        field: formData.field || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        currentlyStudying: formData.currentlyStudying || false,
        description: formData.description || "",
      });
    } else {
      updateEducation(formData.id, formData);
    }
    setFormData({});
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({});
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="space-y-4">
      {/* Existing Education Entries */}
      {resume.education.map((education) => (
        <SectionCard key={education.id} title={education.degree || "Education"}>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">{education.school}</p>
            <p className="text-gray-700">{education.degree} in {education.field}</p>
            <p className="text-sm text-gray-600">
              {education.startDate} {!education.currentlyStudying && `- ${education.endDate}`}
              {education.currentlyStudying && "- Present"}
            </p>
            {education.description && (
              <p className="text-gray-600">{education.description}</p>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditEducation(education)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeEducation(education.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </SectionCard>
      ))}

      {/* Form */}
      {editingId !== null || Object.keys(formData).length > 0 ? (
        <SectionCard title="Add/Edit Education">
          <FormGroup>
            <FormGrid cols={2}>
              <TextInput
                label="School/University"
                name="school"
                value={formData.school || ""}
                onChange={handleInputChange}
                placeholder="University of Example"
                required
              />
              <TextInput
                label="Degree"
                name="degree"
                value={formData.degree || ""}
                onChange={handleInputChange}
                placeholder="Bachelor of Science"
                required
              />
            </FormGrid>

            <TextInput
              label="Field of Study"
              name="field"
              value={formData.field || ""}
              onChange={handleInputChange}
              placeholder="Computer Science"
            />

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
                disabled={formData.currentlyStudying}
              />
            </FormGrid>

            <CheckboxInput
              name="currentlyStudying"
              checked={formData.currentlyStudying || false}
              onChange={handleInputChange}
              label="I currently study here"
            />

            <TextArea
              label="Description (optional)"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Additional details about your education"
              rows={3}
            />
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Education
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddEducation} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Education
        </Button>
      )}
    </div>
  );
};
