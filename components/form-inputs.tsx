/**
 * Reusable Form Components
 */

import React from "react";
import clsx from "clsx";

// Text Input Component
export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
>(({ label, error, className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      ref={ref}
      className={clsx(
        "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
        error ? "border-red-500" : "border-gray-300",
        className
      )}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));
TextInput.displayName = "TextInput";

// Textarea Component
export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
  }
>(({ label, error, className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <textarea
      ref={ref}
      className={clsx(
        "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
        error ? "border-red-500" : "border-gray-300",
        className
      )}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));
TextArea.displayName = "TextArea";

// Select Component
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    error?: string;
    options: { label: string; value: string }[];
  }
>(({ label, error, options, className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <select
      ref={ref}
      className={clsx(
        "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white",
        error ? "border-red-500" : "border-gray-300",
        className
      )}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));
Select.displayName = "Select";

// Date Input Component
export const DateInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
  }
>(({ label, error, className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      ref={ref}
      type="date"
      className={clsx(
        "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
        error ? "border-red-500" : "border-gray-300",
        className
      )}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));
DateInput.displayName = "DateInput";

// Checkbox Component
export const CheckboxInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  }
>(({ label, className, ...props }, ref) => (
  <div className="flex items-center">
    <input
      ref={ref}
      type="checkbox"
      className={clsx(
        "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer",
        className
      )}
      {...props}
    />
    {label && (
      <label className="ml-2 block text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    )}
  </div>
));
CheckboxInput.displayName = "CheckboxInput";

// File Input Component
export const FileInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    accept?: string;
  }
>(({ label, error, accept = "image/*", className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      ref={ref}
      type="file"
      accept={accept}
      className={clsx(
        "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
        error ? "border-red-500" : "border-gray-300",
        className
      )}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));
FileInput.displayName = "FileInput";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "font-medium flex justify-center items-center p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        // Sizes
        size === "sm" && "px-3  text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        // Variants
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        variant === "secondary" &&
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        variant === "outline" &&
          "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

// Form Group Component
export const FormGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx("space-y-4", className)}>
    {children}
  </div>
);

// Section Card Component
export const SectionCard = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx("bg-white rounded-lg shadow p-6 border border-gray-200", className)}>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

// Grid Component
export const FormGrid = ({
  children,
  cols = 2,
  className,
}: {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}) => (
  <div
    className={clsx(
      "gap-4",
      cols === 1 && "grid grid-cols-1",
      cols === 2 && "grid grid-cols-1 md:grid-cols-2",
      cols === 3 && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      className
    )}
  >
    {children}
  </div>
);
