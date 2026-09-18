/* ==========================================================================
   EduPulse CMS - Certificate of Completion HTML5 Canvas Generator
   ========================================================================== */

function generateCertificateCanvas(studentName, courseTitle, completionDate, certId) {
  const canvas = document.getElementById('certificate-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;  // 1000
  const height = canvas.height; // 700

  // 1. Clear background
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, width, height);

  // 2. Elegant Outer Border
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Inner gold border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Corner Accent Flourishes
  const drawCorner = (x, y) => {
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
  };
  drawCorner(40, 40);
  drawCorner(width - 40, 40);
  drawCorner(40, height - 40);
  drawCorner(width - 40, height - 40);

  // 3. Header Logo & Title
  ctx.fillStyle = '#6366f1';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ EDUPULSE ACADEMY', width / 2, 90);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 38px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CERTIFICATE OF COMPLETION', width / 2, 160);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('THIS IS PROUDLY PRESENTED TO', width / 2, 220);

  // 4. Student Name
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(studentName.toUpperCase(), width / 2, 290);

  // Decorative line under student name
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, 310);
  ctx.lineTo(width / 2 + 200, 310);
  ctx.stroke();

  // 5. Course Completion Text
  ctx.fillStyle = '#9ca3af';
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('FOR SUCCESSFULLY MASTERING ALL MODULES AND ASSESSMENTS IN', width / 2, 365);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`"${courseTitle}"`, width / 2, 415);

  // 6. Seal Badge
  ctx.save();
  ctx.translate(width / 2, 510);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(0, 0, 45, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0b0f19';
  ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VERIFIED', 0, -5);
  ctx.fillText('EXCELLENCE', 0, 12);
  ctx.restore();

  // 7. Footer Meta: Date & Certificate ID & Signature
  ctx.fillStyle = '#9ca3af';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Issue Date: ${completionDate || '2026-09-18'}`, 80, 620);
  ctx.fillText(`Certificate ID: ${certId}`, 80, 645);

  ctx.textAlign = 'right';
  ctx.fillText('Authorized Signature', width - 80, 620);
  ctx.fillStyle = '#6366f1';
  ctx.font = 'italic bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Dr. Sarah Jenkins', width - 80, 645);
}

function setupCertificateDownload(courseTitle) {
  const downloadBtn = document.getElementById('btn-download-cert');
  const canvas = document.getElementById('certificate-canvas');
  if (!downloadBtn || !canvas) return;

  // Remove existing listeners
  const newBtn = downloadBtn.cloneNode(true);
  downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);

  newBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `EduPulse_Certificate_${courseTitle.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    window.showToast('Certificate downloaded successfully!', 'success');
  });
}

window.generateCertificateCanvas = generateCertificateCanvas;
window.setupCertificateDownload = setupCertificateDownload;
