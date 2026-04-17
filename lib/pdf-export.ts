import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportResumeToPDF = async (
  elementId: string = "resume-preview",
  fileName: string = "resume.pdf",
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Resume preview element not found");
    }

    const style = document.createElement("style");
    style.id = "pdf-color-fix";
    style.innerHTML = `
      * {
        color: #000 !important;
        background: #fff !important;
        background-color: #fff !important;
        border-color: #000 !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
    style.remove();

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 6;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
};
