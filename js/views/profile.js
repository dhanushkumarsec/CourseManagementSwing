/* ==========================================================================
   EduPulse CMS - Student Profile & Learning Dashboard View
   ========================================================================== */

function renderProfileView() {
  const mainEl = document.getElementById('app-main');
  if (!mainEl) return;

  const student = window.AppState.getActiveStudent();
  if (!student) return;

  const enrolledList = student.enrolledCourses || [];

  mainEl.innerHTML = `
    <div class="container profile-container" style="padding-top: 24px;">
      <!-- Profile Welcome Header -->
      <div class="glass-card" style="margin-bottom: 32px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: #ffffff;">
            ${student.name.charAt(0)}
          </div>
          <div>
            <h2>Welcome Back, ${student.name}!</h2>
            <p>${student.email} &bull; Active Student Account</p>
            <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
              <span class="badge badge-primary">${enrolledList.length} Courses Enrolled</span>
              <span class="badge badge-success">${enrolledList.filter(e => e.certificateId).length} Certificates Earned</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enrolled Courses Grid -->
      <div class="section-header">
        <div class="section-title">
          <i data-lucide="book-open"></i>
          <h2>My Active Enrolled Courses</h2>
        </div>
      </div>

      ${enrolledList.length === 0 ? `
        <div class="empty-state text-center glass-card" style="padding: 40px 0;">
          <i data-lucide="compass" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
          <h3>No active course enrollments</h3>
          <p>Browse our course marketplace to enroll in your first course!</p>
          <button id="btn-browse-catalog" class="btn btn-primary" style="margin-top: 16px;">
            Explore Courses Catalog
          </button>
        </div>
      ` : `
        <div class="course-grid" style="margin-bottom: 40px;">
          ${enrolledList.map(enr => {
            const course = window.AppState.getCourseById(enr.courseId);
            if (!course) return '';

            return `
              <div class="course-card">
                <div class="course-card-thumb">
                  <img src="${course.thumbnail}" alt="${course.title}">
                  <span class="badge badge-primary thumb-category-badge">${course.category}</span>
                </div>

                <div class="course-card-body">
                  <h3 class="course-card-title">${course.title}</h3>
                  <div class="course-card-instructor">
                    <i data-lucide="user-check" style="width: 14px;"></i>
                    <span>${course.instructor}</span>
                  </div>

                  <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                      <span>Completion Progress</span>
                      <strong>${enr.progressPercentage}%</strong>
                    </div>
                    <div class="progress-bar-bg">
                      <div class="progress-bar-fill" style="width: ${enr.progressPercentage}%;"></div>
                    </div>
                  </div>

                  <div class="course-card-footer">
                    <button class="btn btn-primary btn-sm btn-resume-course" data-course-id="${course.id}">
                      <i data-lucide="play-circle"></i> Continue Learning
                    </button>

                    ${enr.certificateId ? `
                      <button class="btn btn-secondary btn-sm btn-view-cert" data-course-id="${course.id}">
                        <i data-lucide="award"></i> Certificate
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  // Attach Profile Event Listeners
  document.getElementById('btn-browse-catalog')?.addEventListener('click', () => {
    window.AppState.setView('catalog');
  });

  document.querySelectorAll('.btn-resume-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.dataset.courseId;
      window.AppState.setView('player', { courseId });
    });
  });

  document.querySelectorAll('.btn-view-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.dataset.courseId;
      const course = window.AppState.getCourseById(courseId);
      const enr = student.enrolledCourses.find(item => item.courseId === courseId);
      
      if (course && enr && enr.certificateId) {
        window.generateCertificateCanvas(student.name, course.title, enr.enrolledDate, enr.certificateId);
        window.setupCertificateDownload(course.title);
        window.openDialogModal('modal-certificate');
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

window.renderProfileView = renderProfileView;
