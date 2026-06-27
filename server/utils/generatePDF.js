const PDFDocument = require('pdfkit');

const generatePDF = (resumeText) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Header
    doc
      .fontSize(20)
      .fillColor('#4338ca')
      .font('Helvetica-Bold')
      .text('Rewritten Resume', { align: 'center' });

    doc.moveDown(0.5);

    doc
      .moveTo(50, doc.y)
      .lineTo(562, doc.y)
      .strokeColor('#4338ca')
      .lineWidth(1)
      .stroke();

    doc.moveDown(1);

    // Resume content
    const lines = resumeText.split('\n');

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        doc.moveDown(0.5);
        return;
      }

      // Section headings (ALL CAPS lines)
      if (trimmed === trimmed.toUpperCase() && trimmed.length > 3) {
        doc.moveDown(0.5);
        doc
          .fontSize(13)
          .fillColor('#4338ca')
          .font('Helvetica-Bold')
          .text(trimmed);
        doc
          .moveTo(50, doc.y + 2)
          .lineTo(562, doc.y + 2)
          .strokeColor('#e0e7ff')
          .lineWidth(0.5)
          .stroke();
        doc.moveDown(0.3);
        return;
      }

      // Bullet points
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        doc
          .fontSize(10)
          .fillColor('#374151')
          .font('Helvetica')
          .text(`• ${trimmed.replace(/^[-•]\s*/, '')}`, {
            indent: 15,
            lineGap: 3,
          });
        return;
      }

      // Bold lines (likely names or job titles)
      if (trimmed.length < 60 && !trimmed.includes('.')) {
        doc
          .fontSize(11)
          .fillColor('#1f2937')
          .font('Helvetica-Bold')
          .text(trimmed);
        return;
      }

      // Normal text
      doc
        .fontSize(10)
        .fillColor('#374151')
        .font('Helvetica')
        .text(trimmed, { lineGap: 3 });
    });

    doc.end();
  });
};

module.exports = generatePDF;