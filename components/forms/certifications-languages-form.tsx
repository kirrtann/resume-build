/**
 * Certifications & Languages Form Section
 */

import React, { useState } from "react";
import {
  TextInput,
  DateInput,
  Select,
  Button,
  FormGroup,
  FormGrid,
  SectionCard,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { CertificationEntry, LanguageEntry } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

// Certifications Form
export const CertificationsForm = () => {
  const { resume, addCertification, updateCertification, removeCertification } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CertificationEntry>>({});

  const handleAddCertification = () => {
    setFormData({});
    setEditingId("");
  };

  const handleEditCertification = (cert: CertificationEntry) => {
    setFormData(cert);
    setEditingId(cert.id);
  };

  const handleSave = () => {
    if (!formData.name || !formData.issuer) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.id === null || formData.id === undefined) {
      addCertification({
        id: Date.now().toString(),
        name: formData.name,
        issuer: formData.issuer,
        issueDate: formData.issueDate || "",
        expiryDate: formData.expiryDate || "",
        credentialId: formData.credentialId || "",
        credentialUrl: formData.credentialUrl || "",
      });
    } else {
      updateCertification(formData.id, formData);
    }
    setFormData({});
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({});
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Existing Certifications */}
      {resume.certifications.map((cert) => (
        <SectionCard key={cert.id} title={cert.name || "Certification"}>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">{cert.issuer}</p>
            <p className="text-sm text-gray-600">
              Issued: {cert.issueDate}
              {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
            </p>
            {cert.credentialId && (
              <p className="text-sm text-gray-600">
                Credential ID: {cert.credentialId}
              </p>
            )}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-block"
              >
                View Credential →
              </a>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditCertification(cert)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeCertification(cert.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </SectionCard>
      ))}

      {/* Form */}
      {editingId !== null || Object.keys(formData).length > 0 ? (
        <SectionCard title="Add/Edit Certification">
          <FormGroup>
            <FormGrid cols={2}>
              <TextInput
                label="Certification Name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                placeholder="AWS Certified Solutions Architect"
                required
              />
              <TextInput
                label="Issuing Organization"
                name="issuer"
                value={formData.issuer || ""}
                onChange={handleInputChange}
                placeholder="Amazon Web Services"
                required
              />
            </FormGrid>

            <FormGrid cols={2}>
              <DateInput
                label="Issue Date"
                name="issueDate"
                value={formData.issueDate || ""}
                onChange={handleInputChange}
              />
              <DateInput
                label="Expiry Date (optional)"
                name="expiryDate"
                value={formData.expiryDate || ""}
                onChange={handleInputChange}
              />
            </FormGrid>

            <TextInput
              label="Credential ID (optional)"
              name="credentialId"
              value={formData.credentialId || ""}
              onChange={handleInputChange}
              placeholder="ABC123XYZ"
            />

            <TextInput
              label="Credential URL (optional)"
              name="credentialUrl"
              value={formData.credentialUrl || ""}
              onChange={handleInputChange}
              placeholder="https://..."
              type="url"
            />
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Certification
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddCertification} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Certification
        </Button>
      )}
    </div>
  );
};

// Languages Form
export const LanguagesForm = () => {
  const { resume, addLanguage, updateLanguage, removeLanguage } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<LanguageEntry>>({});

  const handleAddLanguage = () => {
    setFormData({});
    setEditingId("");
  };

  const handleEditLanguage = (language: LanguageEntry) => {
    setFormData(language);
    setEditingId(language.id);
  };

  const handleSave = () => {
    if (!formData.language) {
      alert("Please enter a language name");
      return;
    }

    if (formData.id === null || formData.id === undefined) {
      addLanguage({
        id: Date.now().toString(),
        language: formData.language,
        proficiency: formData.proficiency || "professional",
      });
    } else {
      updateLanguage(formData.id, formData);
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

  const proficiencyOptions = [
    { label: "Elementary", value: "elementary" },
    { label: "Limited Working", value: "limited" },
    { label: "Professional Working", value: "professional" },
    { label: "Full Professional", value: "full" },
  ];

  const getProficiencyColor = (proficiency?: string) => {
    switch (proficiency) {
      case "elementary":
        return "bg-yellow-100 text-yellow-800";
      case "limited":
        return "bg-orange-100 text-orange-800";
      case "professional":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing Languages */}
      {resume.languages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {resume.languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center justify-between bg-white rounded-lg shadow border border-gray-200 p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{language.language}</p>
                <span
                  className={`inline-block text-xs font-semibold mt-1 px-2 py-1 rounded capitalize ${getProficiencyColor(
                    language.proficiency
                  )}`}
                >
                  {language.proficiency}
                </span>
              </div>
              <div className="flex gap-2 ml-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditLanguage(language)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeLanguage(language.id)}
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
        <SectionCard title="Add/Edit Language">
          <FormGroup>
            <TextInput
              label="Language"
              name="language"
              value={formData.language || ""}
              onChange={handleInputChange}
              placeholder="English, Spanish, Mandarin, etc."
              required
            />

            <Select
              label="Proficiency Level"
              name="proficiency"
              value={formData.proficiency || "professional"}
              onChange={handleInputChange}
              options={proficiencyOptions}
            />
          </FormGroup>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Language
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </SectionCard>
      ) : (
        <Button onClick={handleAddLanguage} className="w-full">
          <Plus size={20} className="mr-2" />
          Add Language
        </Button>
      )}
    </div>
  );
};
