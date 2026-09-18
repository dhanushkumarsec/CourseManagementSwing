/* ==========================================================================
   EduPulse CMS - Main Application Entrypoint & Router
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing EduPulse Course Management System...');

  // 1. Initialize Theme from LocalStorage
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // 2. Subscribe Router to AppState Changes
  window.AppState.subscribe((state) => {
    // Re-render Header Navbar
    window.renderNavbar();

    // Render Active View based on state.currentView
    switch (state.currentView) {
      case 'catalog':
        window.renderCatalogView();
        break;
      case 'details':
        window.renderDetailsView();
        break;
      case 'player':
        window.renderPlayerView();
        break;
      case 'studio':
        window.renderStudioView();
        break;
      case 'analytics':
        window.renderAnalyticsView();
        break;
      case 'profile':
        window.renderProfileView();
        break;
      default:
        window.renderCatalogView();
        break;
    }

    // Refresh icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // 3. Reset Demo Data Button
  document.getElementById('btn-reset-data')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to reset all courses and student progress back to initial demo data?')) {
      window.AppState.resetDemoData();
      window.showToast('Demo data restored successfully!', 'success');
      window.AppState.setView('catalog');
    }
  });

  // 4. Footer filter links
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = e.currentTarget.dataset.category;
      if (cat) {
        window.activeCategoryFilter = cat;
        window.AppState.setView('catalog');
      }
    });
  });

  document.querySelectorAll('.nav-link-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget.dataset.target;
      if (target) {
        window.AppState.setView(target);
      }
    });
  });

  // 5. Initial Render
  window.AppState.notify();
});
