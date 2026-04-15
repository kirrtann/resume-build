/**
 * PDF Export Utility
 * Handles exporting resume to PDF format
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportResumeToPDF = async (
  elementId: string = "resume-preview",
  fileName: string = "resume.pdf"
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Resume preview element not found");
    }

    // Get the element's dimensions
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - 2 * margin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // Add image to PDF, handling multiple pages if needed
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight - 2 * margin;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 2 * margin;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
};

export const printResume = (elementId: string = "resume-preview") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Resume preview element not found");
    }

    const printWindow = window.open("", "", "height=650,width=900");
    if (!printWindow) {
      throw new Error("Could not open print window");
    }

    printWindow.document.write(
      "<html><head><title>Resume</title>"
    );
    printWindow.document.write(
      "<style>" +
        "body { font-family: Arial, sans-serif; margin: 20px; }" +
        "* { margin: 0; padding: 0; }" +
        "@media print { body { margin: 0; } }" +
        "</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(element.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 250);
  } catch (error) {
    console.error("Error printing resume:", error);
    throw new Error("Failed to print resume. Please try again.");
  }
};

// Export resume data as JSON
export const exportResumeAsJSON = (
  data: any,
  fileName: string = "resume.json"
) => {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting JSON:", error);
    throw new Error("Failed to export resume data.");
  }
};

// Import resume data from JSON file
export const importResumeFromJSON = (
  file: File
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsText(file);
  });
};
