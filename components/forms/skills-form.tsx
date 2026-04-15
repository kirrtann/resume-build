/**
 * Skills Form Section
 */

import React, { useState } from "react";
import {
  TextInput,
  Select,
  Button,
  FormGroup,
  SectionCard,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { Skill } from "@/lib/types";
import { Plus, Trash2, BarChart3 } from "lucide-react";

export const SkillsForm = () => {
  const { resume, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({});

  const handleAddSkill = () => {
    setFormData({});
    setEditingId("");
  };

  const handleEditSkill = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id);
  };

  const handleSave = () => {
    if (!formData.name || !formData.name.trim()) {
      alert("Please enter a skill name");
      return;
    }

    if (formData.id === null || formData.id === undefined) {
      addSkill({
        id: Date.now().toString(),
        name: formData.name,
        level: formData.level || "intermediate",
      });
    } else {
      updateSkill(formData.id, formData);
    }
    setFormData({});
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({});
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const levelOptions = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
    { label: "Expert", value: "expert" },
  ];

  const getLevelColor = (level?: string) => {
    switch (level) {
      case "beginner":
        return "bg-yellow-100 text-yellow-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-green-100 text-green-800";
      case "expert":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Skills Grid */}
      {resume.skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {resume.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between bg-white rounded-lg shadow border border-gray-200 p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{skill.name}</p>
                <span
                  className={`inline-block text-xs font-semibold mt-1 px-2 py-1 rounded capitalize ${getLevelColor(
                    skill.level
                  )}`}
                >
                  {skill.level}
                </span>
              </div>
              <div className="flex gap-2 ml-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditSkill(skill)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      {editingId !== null || Object.keys(formData).length > 0 ? (
        <SectionCard title="Add/Edit Skill">
          <FormGroup>
            <TextInput
              label="Skill Name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="e.g., JavaScript, React, Python"
              required
            />

            <Select
              label="Proficiency Level"
              name="level"
              value={formData.level || "intermediate"}
              onChange={handleInputChange}
              options={levelOptions}
            />
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Skill
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddSkill} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Skill
        </Button>
      )}

      {/* Skills Summary */}
      {resume.skills.length > 0 && (
        <SectionCard title="Skills Summary">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" />
              <span className="text-gray-700">
                Total skills: <strong>{resume.skills.length}</strong>
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Expert:</strong> {resume.skills.filter((s) => s.level === "expert").length}
              </p>
              <p>
                <strong>Advanced:</strong> {resume.skills.filter((s) => s.level === "advanced").length}
              </p>
              <p>
                <strong>Intermediate:</strong> {resume.skills.filter((s) => s.level === "intermediate").length}
              </p>
              <p>
                <strong>Beginner:</strong> {resume.skills.filter((s) => s.level === "beginner").length}
              </p>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
};
