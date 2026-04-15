/**
 * Custom Sections Form
 * Allows users to add custom sections with title and description
 */

import React, { useState } from "react";
import {
  TextInput,
  TextArea,
  Button,
  FormGroup,
  SectionCard,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { CustomSectionEntry } from "@/lib/types";
import { Plus, Trash2, X } from "lucide-react";

export const CustomSectionsForm = () => {
  const { resume, addCustomSection, updateCustomSection, removeCustomSection } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CustomSectionEntry>>({});

  const handleAddSection = () => {
    setFormData({});
    setEditingId("");
  };

  const handleEditSection = (section: CustomSectionEntry) => {
    setFormData(section);
    setEditingId(section.id);
  };

  const handleSave = () => {
    if (!formData.title || !formData.title.trim()) {
      alert("Please enter a section title");
      return;
    }

    if (formData.id === null || formData.id === undefined) {
      addCustomSection({
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description || "",
      });
    } else {
      updateCustomSection(formData.id, {
        ...formData,
      });
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Existing Custom Sections */}
      {resume.customSections.map((section) => (
        <SectionCard key={section.id} title={section.title || "Custom Section"}>
          <div className="space-y-2">
            <p className="text-gray-700 whitespace-pre-wrap">
              {section.description}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditSection(section)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeCustomSection(section.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </SectionCard>
      ))}

      {/* Form */}
      {editingId !== null || Object.keys(formData).length > 0 ? (
        <SectionCard title={editingId ? "Edit Custom Section" : "Add Custom Section"}>
          <FormGroup>
            <TextInput
              label="Section Title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="e.g., Awards, Volunteer Work, Publications"
              required
            />

            <TextArea
              label="Section Content"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Enter your content here. You can use multiple lines."
              rows={6}
            />
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Section
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddSection} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Custom Section
        </Button>
      )}
    </div>
  );
};
