/* ==========================================================================
   EduPulse CMS - Top Header Navigation Component
   ========================================================================== */

function renderNavbar() {
  const headerEl = document.getElementById('app-header');
  if (!headerEl) return;

  const currentRole = window.AppState.currentRole;
  const currentView = window.AppState.currentView;

  headerEl.innerHTML = `
    <nav class="navbar">
      <div class="nav-brand" id="nav-logo">
        <i data-lucide="graduation-cap"></i>
        <span>EduPulse</span>
      </div>

      <div class="nav-menu">
        <button class="nav-tab-btn ${currentView === 'catalog' ? 'active' : ''}" data-view="catalog">
          <i data-lucide="compass"></i> Browse Catalog
        </button>

        ${currentRole === 'student' ? `
          <button class="nav-tab-btn ${currentView === 'profile' ? 'active' : ''}" data-view="profile">
            <i data-lucide="book-open"></i> My Learning
          </button>
        ` : ''}

        ${currentRole === 'instructor' ? `
          <button class="nav-tab-btn ${currentView === 'studio' ? 'active' : ''}" data-view="studio">
            <i data-lucide="layout-dashboard"></i> Course Studio
          </button>
          <button class="nav-tab-btn ${currentView === 'analytics' ? 'active' : ''}" data-view="analytics">
            <i data-lucide="bar-chart-3"></i> Analytics & Roster
          </button>
        ` : ''}
      </div>

      <div class="nav-actions">
        <!-- Role Switcher -->
        <button id="btn-toggle-role" class="role-badge-btn ${currentRole}" title="Click to switch between Student & Instructor views">
          <i data-lucide="${currentRole === 'student' ? 'user' : 'shield-check'}"></i>
          <span>${currentRole === 'student' ? 'Student View' : 'Instructor View'}</span>
          <i data-lucide="arrow-left-right" style="width: 14px; height: 14px; opacity: 0.7;"></i>
        </button>

        <!-- Dark/Light Theme Toggle -->
        <button id="btn-toggle-theme" class="btn-icon" title="Toggle Theme Mode">
          <i data-lucide="sun"></i>
        </button>
      </div>
    </nav>
  `;

  // Attach Event Listeners
  document.getElementById('nav-logo')?.addEventListener('click', () => {
    window.AppState.setView('catalog');
  });

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.currentTarget.dataset.view;
      if (view) window.AppState.setView(view);
    });
  });

  document.getElementById('btn-toggle-role')?.addEventListener('click', () => {
    const nextRole = currentRole === 'student' ? 'instructor' : 'student';
    window.AppState.setRole(nextRole);
    window.showToast(`Switched to ${nextRole === 'student' ? 'Student' : 'Instructor Studio'} Mode`, 'info');
    
    // Default view when changing role
    if (nextRole === 'instructor') {
      window.AppState.setView('studio');
    } else {
      window.AppState.setView('catalog');
    }
  });

  document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
  });

  // Re-initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Global window assignment
window.renderNavbar = renderNavbar;
