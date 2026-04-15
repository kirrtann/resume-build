/**
 * Projects Form Section
 */

import React, { useState } from "react";
import {
  TextInput,
  TextArea,
  DateInput,
  Button,
  FormGroup,
  FormGrid,
  SectionCard,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { ProjectEntry } from "@/lib/types";
import { Plus, Trash2, X, Tag } from "lucide-react";

export const ProjectsForm = () => {
  const { resume, addProject, updateProject, removeProject } = useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProjectEntry>>({});
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");

  const handleAddProject = () => {
    setFormData({});
    setTechnologies([]);
    setEditingId("");
  };

  const handleEditProject = (project: ProjectEntry) => {
    setFormData(project);
    setTechnologies(project.technologies || []);
    setEditingId(project.id);
  };

  const handleSave = () => {
    if (!formData.title || !formData.title.trim()) {
      alert("Please enter a project title");
      return;
    }

    if (formData.id === null || formData.id === undefined) {
      addProject({
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description || "",
        technologies: technologies,
        link: formData.link || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
      });
    } else {
      updateProject(formData.id, {
        ...formData,
        technologies: technologies,
      });
    }
    setFormData({});
    setTechnologies([]);
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({});
    setTechnologies([]);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Existing Projects */}
      {resume.projects.map((project) => (
        <SectionCard key={project.id} title={project.title || "Project"}>
          <div className="space-y-2">
            <p className="text-gray-700">{project.description}</p>
            {project.startDate && (
              <p className="text-sm text-gray-600">
                {project.startDate} {project.endDate && `- ${project.endDate}`}
              </p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-block mt-2"
              >
                View Project →
              </a>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditProject(project)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeProject(project.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </SectionCard>
      ))}

      {/* Form */}
      {editingId !== null || Object.keys(formData).length > 0 ? (
        <SectionCard title="Add/Edit Project">
          <FormGroup>
            <TextInput
              label="Project Title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="My Awesome Project"
              required
            />

            <TextArea
              label="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Describe your project, its features, and your contribution"
              rows={4}
            />

            <TextInput
              label="Project Link (optional)"
              name="link"
              value={formData.link || ""}
              onChange={handleInputChange}
              placeholder="https://github.com/example/project"
              type="url"
            />

            <FormGrid cols={2}>
              <DateInput
                label="Start Date (optional)"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleInputChange}
              />
              <DateInput
                label="End Date (optional)"
                name="endDate"
                value={formData.endDate || ""}
                onChange={handleInputChange}
              />
            </FormGrid>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <div className="space-y-2 mb-3">
                {technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200"
                  >
                    <span className="text-sm text-gray-700 flex items-center gap-2">
                      <Tag size={14} />
                      {tech}
                    </span>
                    <button
                      onClick={() => removeTechnology(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <TextInput
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                  placeholder="e.g., React, Node.js, PostgreSQL"
                />
                <Button onClick={addTechnology} variant="secondary">
                  Add
                </Button>
              </div>
            </div>
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Project
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddProject} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Project
        </Button>
      )}
    </div>
  );
};
