/* ==========================================================================
   EduPulse CMS - Course Details View
   ========================================================================== */

function renderDetailsView() {
  const mainEl = document.getElementById('app-main');
  const courseId = window.AppState.selectedCourseId;
  if (!mainEl || !courseId) {
    window.AppState.setView('catalog');
    return;
  }

  const course = window.AppState.getCourseById(courseId);
  if (!course) {
    window.AppState.setView('catalog');
    return;
  }

  const student = window.AppState.getActiveStudent();
  const enrollment = student ? student.enrolledCourses.find(e => e.courseId === course.id) : null;
  const isEnrolled = !!enrollment;

  mainEl.innerHTML = `
    <div class="container course-details-container">
      <!-- Breadcrumb -->
      <div style="margin-bottom: 16px;">
        <button id="btn-back-catalog" class="btn btn-secondary btn-sm">
          <i data-lucide="arrow-left"></i> Back to Catalog
        </button>
      </div>

      <!-- Hero Header -->
      <section class="details-hero">
        <div class="details-header-info">
          <span class="badge badge-primary">${course.category}</span>
          <h1>${course.title}</h1>
          
          <div class="details-meta">
            <span><i data-lucide="star" style="color: #f59e0b; fill: #f59e0b;"></i> <strong>${course.rating}</strong> (${course.ratingCount} reviews)</span>
            <span><i data-lucide="users"></i> ${course.studentsCount} Students Enrolled</span>
            <span><i data-lucide="clock"></i> ${course.duration} Total</span>
            <span><i data-lucide="bar-chart"></i> ${course.level}</span>
          </div>

          <p class="details-description">${course.overview}</p>

          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff;">
                ${course.instructor.charAt(0)}
              </div>
              <div>
                <strong style="display: block; color: var(--text-primary);">${course.instructor}</strong>
                <small style="color: var(--text-muted);">${course.instructorRole || 'Lead Instructor'}</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Enrollment Action Box -->
        <div class="details-preview-card">
          <div class="details-preview-thumb">
            <img src="${course.thumbnail}" alt="${course.title}">
            <button class="play-overlay-btn" id="btn-play-preview" title="Watch Course Trailer">
              <i data-lucide="play" style="fill: #fff; width: 24px; height: 24px; margin-left: 3px;"></i>
            </button>
          </div>

          <div style="font-size: 2rem; font-weight: 800; margin-bottom: 16px;">
            ${course.price === 0 ? 'FREE' : `$${course.price.toFixed(2)}`}
          </div>

          ${isEnrolled ? `
            <button id="btn-start-learning" class="btn btn-primary btn-lg full-width" style="width: 100%;">
              <i data-lucide="play-circle"></i> Continue Learning (${enrollment.progressPercentage}%)
            </button>
          ` : `
            <button id="btn-enroll-now" class="btn btn-primary btn-lg full-width" style="width: 100%;">
              <i data-lucide="shopping-cart"></i> Enroll Now Instant Access
            </button>
          `}

          <ul style="list-style: none; text-align: left; margin-top: 20px; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 10px;">
            <li><i data-lucide="check-circle-2" style="color: var(--color-success); width: 16px; margin-right: 6px;"></i> Full lifetime access to all modules</li>
            <li><i data-lucide="check-circle-2" style="color: var(--color-success); width: 16px; margin-right: 6px;"></i> Interactive Quizzes & Assessments</li>
            <li><i data-lucide="check-circle-2" style="color: var(--color-success); width: 16px; margin-right: 6px;"></i> Verified Certificate of Completion</li>
          </ul>
        </div>
      </section>

      <!-- Syllabus Accordions -->
      <section class="syllabus-section">
        <div class="section-header">
          <div class="section-title">
            <i data-lucide="book-open"></i>
            <h2>Course Syllabus & Curriculum</h2>
          </div>
          <span>${course.modules.length} Modules • ${(course.modules.reduce((acc, m) => acc + m.lessons.length, 0))} Lessons</span>
        </div>

        <div class="accordion-list">
          ${course.modules.map((mod, idx) => `
            <div class="module-accordion-item">
              <button class="accordion-header" data-acc-idx="${idx}">
                <span>${mod.title}</span>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <small style="color: var(--text-muted); font-weight: 500;">${mod.lessons.length} Lessons</small>
                  <i data-lucide="chevron-down" class="acc-chevron"></i>
                </div>
              </button>
              
              <div class="accordion-body ${idx === 0 ? 'open' : ''}" id="acc-body-${idx}">
                ${mod.lessons.map(les => `
                  <div class="lesson-list-item">
                    <div class="lesson-info">
                      <i data-lucide="${les.type === 'video' ? 'video' : 'file-text'}" class="lesson-type-icon"></i>
                      <span>${les.title}</span>
                    </div>
                    <span style="color: var(--text-muted); font-size: 0.82rem;">${les.duration}</span>
                  </div>
                `).join('')}

                ${mod.quiz ? `
                  <div class="lesson-list-item" style="background: var(--accent-primary-light); padding: 8px 12px; border-radius: var(--radius-sm); margin-top: 8px;">
                    <div class="lesson-info">
                      <i data-lucide="help-circle" style="color: var(--accent-primary);"></i>
                      <strong>Quiz: ${mod.quiz.title}</strong>
                    </div>
                    <span class="badge badge-primary">${mod.quiz.questions.length} Questions</span>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  // Attach Event Listeners
  document.getElementById('btn-back-catalog')?.addEventListener('click', () => {
    window.AppState.setView('catalog');
  });

  document.getElementById('btn-enroll-now')?.addEventListener('click', () => {
    window.AppState.enrollStudentInCourse(course.id);
    window.showToast('Enrolled successfully! Redirecting to lesson workspace...', 'success');
    window.AppState.setView('player', { courseId: course.id });
  });

  document.getElementById('btn-start-learning')?.addEventListener('click', () => {
    window.AppState.setView('player', { courseId: course.id });
  });

  document.getElementById('btn-play-preview')?.addEventListener('click', () => {
    window.showToast('Playing preview video trailer', 'info');
  });

  // Accordion Expand/Collapse Logic
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.accIdx;
      const body = document.getElementById(`acc-body-${idx}`);
      if (body) {
        body.classList.toggle('open');
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

window.renderDetailsView = renderDetailsView;
