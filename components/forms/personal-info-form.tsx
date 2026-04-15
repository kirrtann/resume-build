/**
 * Personal Info Form Section
 */

import React, { useState } from "react";
import {
  TextInput,
  TextArea,
  FileInput,
  Button,
  FormGroup,
  FormGrid,
} from "@/components/form-inputs";
import { useResumeStore } from "@/lib/resume-store";
import { Trash2, Upload } from "lucide-react";

export const PersonalInfoForm = () => {
  const { resume, updatePersonalInfo } = useResumeStore();
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    resume.personalInfo.profilePhoto || null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setPhotoPreview(base64);
        updatePersonalInfo({ profilePhoto: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    updatePersonalInfo({ profilePhoto: "" });
  };

  return (
    <div className="space-y-6">
      {/* Photo Section */}
      <div className="flex flex-col items-center space-y-3">
        {photoPreview ? (
          <div className="relative">
            <img
              src={photoPreview}
              alt="Profile"
              className="w-24 h-24 rounded-lg object-cover border-4 border-blue-200"
            />
            <button
              onClick={handleRemovePhoto}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <Upload size={32} className="text-gray-400" />
          </div>
        )}
        <FileInput
          accept="image/*"
          onChange={handlePhotoChange}
          label="Upload Profile Photo"
          className="text-sm"
        />
      </div>

      {/* Contact Information */}
      <FormGroup>
        <FormGrid cols={2}>
          <TextInput
            label="Full Name"
            name="fullName"
            value={resume.personalInfo.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
          <TextInput
            label="Email"
            type="email"
            name="email"
            value={resume.personalInfo.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
          />
        </FormGrid>

        <FormGrid cols={2}>
          <TextInput
            label="Phone"
            name="phone"
            value={resume.personalInfo.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
          />
          <TextInput
            label="Location"
            name="location"
            value={resume.personalInfo.location}
            onChange={handleInputChange}
            placeholder="New York, NY"
          />
        </FormGrid>

        <TextInput
          label="Website / Portfolio"
          name="website"
          value={resume.personalInfo.website}
          onChange={handleInputChange}
          placeholder="https://yourwebsite.com"
          type="url"
        />

        <TextArea
          label="Professional Summary"
          name="summary"
          value={resume.personalInfo.summary}
          onChange={handleInputChange}
          placeholder="Brief overview of your professional background and goals"
          rows={4}
        />
      </FormGroup>
    </div>
  );
};
