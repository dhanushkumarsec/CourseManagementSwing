/* ==========================================================================
   EduPulse CMS - Modal Dialog Helper Component
   ========================================================================== */

function openDialogModal(modalId) {
  const dialog = document.getElementById(modalId);
  if (dialog && typeof dialog.showModal === 'function') {
    dialog.showModal();
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeDialogModal(modalId) {
  const dialog = document.getElementById(modalId);
  if (dialog && typeof dialog.close === 'function') {
    dialog.close();
  }
}

// Global Event listener for data-close-dialog attributes & light dismiss
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-dialog]') || e.target.closest('[data-close-dialog]')) {
      const dialog = e.target.closest('dialog');
      if (dialog) dialog.close();
    }
  });

  // Light dismiss: Close on backdrop click
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
});

window.openDialogModal = openDialogModal;
window.closeDialogModal = closeDialogModal;
