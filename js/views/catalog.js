/* ==========================================================================
   EduPulse CMS - Course Catalog / Marketplace View
   ========================================================================== */

let activeCategoryFilter = 'All';
let activeSearchQuery = '';
let activeLevelFilter = 'All';
let activeSortOption = 'recommended';

function renderCatalogView() {
  const mainEl = document.getElementById('app-main');
  if (!mainEl) return;

  const courses = window.AppState.getCourses();
  const student = window.AppState.getActiveStudent();
  const categories = ['All', 'Web Development', 'Data Science & AI', 'UI/UX Design', 'Cloud & DevOps', 'Cyber Security'];

  // Filter Logic
  let filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategoryFilter === 'All' || course.category === activeCategoryFilter;
    const matchesLevel = activeLevelFilter === 'All' || course.level === activeLevelFilter;
    const matchesSearch = activeSearchQuery === '' || 
      course.title.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      course.overview.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(activeSearchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Sort Logic
  if (activeSortOption === 'price-low') {
    filteredCourses.sort((a, b) => a.price - b.price);
  } else if (activeSortOption === 'price-high') {
    filteredCourses.sort((a, b) => b.price - a.price);
  } else if (activeSortOption === 'rating') {
    filteredCourses.sort((a, b) => b.rating - a.rating);
  }

  mainEl.innerHTML = `
    <div class="container catalog-container">
      <!-- Hero Header -->
      <section class="catalog-hero">
        <h1 class="hero-title">Unlock World-Class Knowledge</h1>
        <p class="hero-subtitle">Explore interactive courses with real-world projects, quizzes, and instant certificates designed by industry leaders.</p>

        <!-- Search Input -->
        <div class="search-bar-wrapper">
          <i data-lucide="search"></i>
          <input 
            type="search" 
            id="catalog-search-input" 
            class="search-input" 
            placeholder="Search courses, instructors, or topics (e.g. React, Python, Figma)..."
            value="${activeSearchQuery}"
          >
        </div>
      </section>

      <!-- Filter Controls Bar -->
      <section class="catalog-controls">
        <div class="filter-bar">
          <!-- Category Pills -->
          <div class="category-pills">
            ${categories.map(cat => `
              <button class="pill-btn ${activeCategoryFilter === cat ? 'active' : ''}" data-category="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Secondary Filters -->
          <div class="filter-dropdowns">
            <select id="select-level-filter">
              <option value="All" ${activeLevelFilter === 'All' ? 'selected' : ''}>All Levels</option>
              <option value="Beginner" ${activeLevelFilter === 'Beginner' ? 'selected' : ''}>Beginner</option>
              <option value="Intermediate" ${activeLevelFilter === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="Advanced" ${activeLevelFilter === 'Advanced' ? 'selected' : ''}>Advanced</option>
            </select>

            <select id="select-sort-option">
              <option value="recommended" ${activeSortOption === 'recommended' ? 'selected' : ''}>Recommended</option>
              <option value="rating" ${activeSortOption === 'rating' ? 'selected' : ''}>Highest Rated</option>
              <option value="price-low" ${activeSortOption === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${activeSortOption === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Course Cards Grid -->
      <section class="catalog-grid-section">
        ${filteredCourses.length === 0 ? `
          <div class="empty-state text-center" style="padding: 60px 0;">
            <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
            <h3>No courses found</h3>
            <p>Try searching for a different keyword or resetting your filter options.</p>
            <button id="btn-reset-filters" class="btn btn-secondary" style="margin-top: 16px;">
              Reset Filters
            </button>
          </div>
        ` : `
          <div class="course-grid">
            ${filteredCourses.map(course => {
              const enrollment = student ? student.enrolledCourses.find(e => e.courseId === course.id) : null;
              const isEnrolled = !!enrollment;

              return `
                <div class="course-card" data-course-id="${course.id}">
                  <div class="course-card-thumb">
                    <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
                    <span class="badge badge-primary thumb-category-badge">${course.category}</span>
                    <span class="thumb-level-badge">${course.level}</span>
                  </div>

                  <div class="course-card-body">
                    <h3 class="course-card-title">${course.title}</h3>
                    <div class="course-card-instructor">
                      <i data-lucide="user-check" style="width: 14px; height: 14px;"></i>
                      <span>${course.instructor}</span>
                    </div>

                    <div class="course-card-stats">
                      <div class="stat-item rating">
                        <i data-lucide="star" style="width: 14px; height: 14px;"></i>
                        <span><strong>${course.rating}</strong> (${course.ratingCount})</span>
                      </div>
                      <div class="stat-item">
                        <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
                        <span>${course.duration}</span>
                      </div>
                      <div class="stat-item">
                        <i data-lucide="users" style="width: 14px; height: 14px;"></i>
                        <span>${course.studentsCount}</span>
                      </div>
                    </div>

                    ${isEnrolled ? `
                      <div class="progress-bar-bg" style="margin-bottom: 12px;">
                        <div class="progress-bar-fill" style="width: ${enrollment.progressPercentage}%;"></div>
                      </div>
                    ` : ''}

                    <div class="course-card-footer">
                      <div class="course-price">
                        ${course.price === 0 ? 'FREE' : `$${course.price.toFixed(2)}`}
                      </div>
                      
                      <button class="btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'} btn-sm btn-open-course" data-course-id="${course.id}">
                        ${isEnrolled ? (enrollment.progressPercentage >= 100 ? 'Review Course' : 'Continue Learning') : 'Explore Course'}
                        <i data-lucide="arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </section>
    </div>
  `;

  // Attach Catalog Event Listeners
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value;
      renderCatalogView();
    });
  }

  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeCategoryFilter = e.currentTarget.dataset.category;
      renderCatalogView();
    });
  });

  document.getElementById('select-level-filter')?.addEventListener('change', (e) => {
    activeLevelFilter = e.target.value;
    renderCatalogView();
  });

  document.getElementById('select-sort-option')?.addEventListener('change', (e) => {
    activeSortOption = e.target.value;
    renderCatalogView();
  });

  document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
    activeCategoryFilter = 'All';
    activeSearchQuery = '';
    activeLevelFilter = 'All';
    activeSortOption = 'recommended';
    renderCatalogView();
  });

  document.querySelectorAll('.btn-open-course, .course-card').forEach(el => {
    el.addEventListener('click', (e) => {
      const courseId = e.currentTarget.dataset.courseId;
      if (!courseId) return;

      const student = window.AppState.getActiveStudent();
      const isEnrolled = student && student.enrolledCourses.some(en => en.courseId === courseId);

      if (isEnrolled && window.AppState.currentRole === 'student') {
        window.AppState.setView('player', { courseId });
      } else {
        window.AppState.setView('details', { courseId });
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

window.renderCatalogView = renderCatalogView;
