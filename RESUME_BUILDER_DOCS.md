# Resume Builder - Professional Web Application

A fully functional, feature-rich Resume Builder web application built with React, Next.js, and Tailwind CSS. Create, customize, and export your professional resume with ease.

## Features

### 1. **Multiple Resume Sections**
- **Personal Information**: Name, email, phone, location, website, profile photo, and professional summary
- **Experience**: Add multiple jobs with company, position, dates, descriptions, and responsibilities
- **Education**: Manage education history with school, degree, field, dates, and descriptions
- **Skills**: Track skills with proficiency levels (Beginner, Intermediate, Advanced, Expert)
- **Projects**: Showcase personal/professional projects with descriptions, technologies, and links
- **Certifications**: Document professional certifications with issuer, dates, and credential information
- **Languages**: List languages with proficiency levels (Elementary, Limited, Professional, Full)

### 2. **Design & Customization**
- **3 Professional Templates**:
  - Professional: Classic, clean layout with structured sections
  - Minimal: Simple, streamlined design for minimalist look
  - Creative: Modern design with color accents and visual hierarchy
- **Theme Customization**:
  - Primary and secondary color selection
  - Font family options (Sans Serif, Serif, Monospace)
  - Font size adjustment (Small, Medium, Large)
  - Spacing control (Compact, Normal, Relaxed)
  - Dark/Light mode toggle
  - Section visibility toggle (show/hide any section)

### 3. **Real-Time Preview**
- Live resume preview as you type
- Instant visual feedback for all changes
- Multiple template views
- Print-optimized layout

### 4. **Smart Data Management**
- **Undo/Redo**: Full version history with ability to revert changes
- **Auto-Save**: Automatic local storage saving as you work
- **Import/Export**: 
  - Download resume as PDF
  - Print-friendly format
  - Export resume data as JSON
  - Import previously saved JSON resume

### 5. **Form Features**
- **Dynamic Entries**: Add/edit/delete multiple entries in each section
- **Input Validation**: Field validation for required inputs
- **Rich Input Types**:
  - Text inputs with placeholder suggestions
  - Textarea for longer content
  - Date pickers for easy date selection
  - Color picker for customization
  - File upload for profile photo
  - Checkboxes for toggle options (e.g., "Currently working here")

### 6. **User Experience**
- **Responsive Design**: Works beautifully on desktop and tablet
- **Intuitive Navigation**: Sidebar for quick section access
- **Collapsible Sidebar**: Save screen space on smaller displays
- **Visual Feedback**: Hover effects, active states, and transitions
- **Loading States**: Smooth transitions and state management

## Tech Stack

### Frontend
- **Next.js 16.2.3**: React framework for production
- **React 19.2.4**: UI library
- **TypeScript**: For type safety
- **Tailwind CSS 4**: Utility-first styling
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon library
- **html2canvas**: Convert DOM to images for PDF
- **jsPDF**: PDF generation
- **clsx**: Conditional CSS classes

### Development Tools
- **ESLint**: Code quality
- **PostCSS**: CSS processing

## Project Structure

```
resume-build/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── form-inputs.tsx      # Reusable form components
│   ├── customization-panel.tsx  # Theme customization
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── resume-preview.tsx   # Resume templates
│   └── forms/
│       ├── personal-info-form.tsx
│       ├── education-form.tsx
│       ├── experience-form.tsx
│       ├── skills-form.tsx
│       ├── projects-form.tsx
│       └── certifications-languages-form.tsx
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── resume-store.ts      # Zustand store & state management
│   ├── pdf-export.ts        # PDF export utilities
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-build
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run start
```

## Usage Guide

### Creating Your Resume

1. **Start with Personal Info**
   - Click "Personal Info" in the sidebar
   - Upload a profile photo (optional)
   - Enter your contact details and professional summary

2. **Add Experience**
   - Click "Experience" section
   - Click "Add Experience"
   - Fill in job details
   - Add multiple responsibilities
   - Save entry

3. **Add Education**
   - Click "Education" section
   - Add your educational background
   - Mark if currently studying

4. **Add Skills**
   - Click "Skills"
   - Add individual skills with proficiency levels
   - View skills summary

5. **Add Projects**
   - Click "Projects"
   - Add project details and technologies
   - Include links to live projects or repositories

6. **Optional: Certifications & Languages**
   - Toggle visibility in customization panel
   - Add certifications with credential links
   - Add languages with proficiency levels

### Customizing Your Resume

1. **Click Customize** button in sidebar to access customization options:
   - Select template (Professional, Minimal, Creative)
   - Choose primary and secondary colors
   - Adjust typography and spacing
   - Toggle dark/light mode
   - Show/hide sections

2. **View Changes** in real-time in the preview panel

### Exporting Your Resume

1. **PDF Export**: Click "PDF" to download as PDF file
2. **Print**: Click "Print" to print-friendly format
3. **JSON Export**: Click "JSON" to export data
4. **JSON Import**: Click "Import" to load a saved JSON resume

### Saving Your Work

- Resume automatically saves to browser's local storage
- All changes are preserved when you close and reopen the browser
- Clear localStorage to reset data

### Undo/Redo

- Use "Undo" to revert previous changes
- Use "Redo" to restore undone changes
- Full version history available

## State Management

The application uses **Zustand** for state management with the following features:

- **Global Store**: Single source of truth for resume data
- **Immutable Updates**: All updates are immutable
- **History Tracking**: Full undo/redo capability
- **Local Storage Persistence**: Auto-save functionality
- **Type Safety**: Full TypeScript support

### Store Structure

```typescript
- resume: ResumeData (all resume content)
- customization: CustomizationSettings (theme & display options)
- activeSection: Current editing section
- sectionOrder: Customizable section ordering
- history: Version history array
- historyIndex: Current position in history
```

## Component Architecture

### Form Components (`components/form-inputs.tsx`)
Reusable form inputs including:
- TextInput
- TextArea
- Select
- DateInput
- CheckboxInput
- FileInput
- Button
- FormGroup (container)
- SectionCard (styled card)
- FormGrid (responsive grid)

### Section Forms (`components/forms/`)
Each section has its own form component:
- PersonalInfoForm
- EducationForm
- ExperienceForm
- SkillsForm
- ProjectsForm
- CertificationsForm
- LanguagesForm

### Main Components
- **Sidebar**: Navigation and export options
- **ResumePreview**: Renders three different templates
- **CustomizationPanel**: Theme customization controls

## PDF Export

The application uses `html2canvas` and `jsPDF` to convert the resume preview to PDF:

1. DOM element is captured as canvas
2. Canvas is converted to image
3. Image is added to PDF document
4. Multi-page support for longer resumes
5. Automatic download to user's device

## Keyboard Shortcuts (Ready to Add)

Future enhancement: Add keyboard shortcuts like:
- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Y` / `Cmd+Y`: Redo
- `Ctrl+S` / `Cmd+S`: Save (manual trigger)
- `Ctrl+P` / `Cmd+P`: Print

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- **Code Splitting**: Lazy loaded components
- **Image Optimization**: Profile photo handling
- **CSS-in-JS Efficiency**: Tailwind purging
- **State Updates**: Efficient Zustand selectors
- **Local Storage**: Async persistence

## Future Enhancements

### Planned Features
- [ ] Drag-and-drop section reordering
- [ ] More resume templates (5+)
- [ ] Resume sharing via shareable links
- [ ] Cloud storage integration
- [ ] Collaboration features
- [ ] ATS (Applicant Tracking System) optimization
- [ ] AI-powered content suggestions
- [ ] Resume scoring/analysis
- [ ] Budget for different formats
- [ ] Mobile app version

### Bonus Features (Already Implemented)
- ✅ Dark/Light mode
- ✅ Import/Export JSON
- ✅ Undo/Redo functionality
- ✅ Auto-save to localStorage
- ✅ Multiple templates/themes
- ✅ Responsive design
- ✅ Customizable colors and fonts
- ✅ Print-friendly layout

## Troubleshooting

### Resume not saving
- Clear browser cache and localStorage
- Check browser console for errors
- Ensure JavaScript is enabled

### PDF export issues
- Try a different browser
- Disable browser extensions
- Ensure resume preview loads properly

### Style issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Restart dev server

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Changelog

### Version 0.1.0
- Initial release
- 3 resume templates
- Full customization panel
- PDF export functionality
- Local storage auto-save
- Undo/redo history
- Import/export JSON
- Responsive design
- Dark mode support

---

**Built with ❤️ using React, Next.js, and Tailwind CSS**
