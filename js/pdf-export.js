// PDF Export functionality
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  
  // Create PDF in A4 format with proper encoding
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
  });

  // Add custom fonts
  doc.addFileToVFS("Roboto-Regular.ttf", robotoRegular);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFileToVFS("Roboto-Bold.ttf", robotoBold);
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");

  // Set the normal font as default
  doc.setFont("Roboto", "normal");
  
  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('cs-CZ');
  
  // Header
  doc.setFontSize(22);
  doc.setFont("Roboto", "bold");
  doc.text("Kalkulačka Mzdy", 105, 20, { align: "center" });
  
  // Add date
  doc.setFontSize(10);
  doc.setFont("Roboto", "normal");
  doc.text(`Vytvořeno: ${formattedDate}`, 20, 30);
  
  // Add decorative line
  doc.setDrawColor(67, 97, 238); // Primary color
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);

  // Get the gross wage value
  const grossWage = document.getElementById("grossWage").innerText;
  
  // Summary section
  doc.setFontSize(12);
  doc.setFont("Roboto", "bold");
  doc.text(`Hrubá mzda: ${grossWage} Kč`, 20, 45);
  doc.setFont("Roboto", "normal");
  doc.text(`Čistý příjem: ${document.getElementById("netIncome").innerText} Kč`, 20, 52);
  
  // Generate the table
  doc.autoTable({
    html: 'table',
    startY: 60,
    styles: {
      font: 'Roboto',
      fontSize: 10,
      cellPadding: 4,
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [67, 97, 238],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [246, 248, 255],
    },
    columnStyles: {
      1: { halign: 'right' },
    },
    didParseCell: function(data) {
      // Apply bold styling to the net income row and total cost row
      const rowIndex = data.row.index;
      if ((rowIndex === 5 || rowIndex === 8) && data.section === 'body') {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [237, 240, 252];
      }
    },
    margin: { top: 60, right: 20, bottom: 20, left: 20 },
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Stránka ${i} z ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
  }

  doc.save("mzdy.pdf");
} 