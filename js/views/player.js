/* ==========================================================================
   EduPulse CMS - Interactive Lesson Workspace / Player View
   ========================================================================== */

function renderPlayerView() {
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
  const enrollment = window.AppState.getStudentEnrollment(courseId);

  // Default to first lesson if none selected
  let currentLessonId = window.AppState.selectedLessonId;
  let activeLesson = null;
  let activeModule = null;

  course.modules.forEach(mod => {
    mod.lessons.forEach(les => {
      if (!activeLesson && (!currentLessonId || les.id === currentLessonId)) {
        activeLesson = les;
        activeModule = mod;
      }
    });
  });

  if (!activeLesson && course.modules[0]?.lessons[0]) {
    activeLesson = course.modules[0].lessons[0];
    activeModule = course.modules[0];
  }

  const completedLessonIds = enrollment ? enrollment.completedLessonIds : [];
  const isLessonCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;

  mainEl.innerHTML = `
    <div class="player-layout">
      <!-- Left Player & Content Area -->
      <div class="player-main-content">
        <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
          <button id="btn-player-back" class="btn btn-secondary btn-sm">
            <i data-lucide="arrow-left"></i> Exit to Course Details
          </button>
          <div style="font-size: 0.9rem; color: var(--text-muted);">
            <strong>${course.title}</strong> &bull; ${activeModule ? activeModule.title : ''}
          </div>
        </div>

        ${activeLesson ? `
          <!-- Video or Article Player Box -->
          ${activeLesson.type === 'video' && activeLesson.videoUrl ? `
            <div class="video-container">
              <iframe 
                src="${activeLesson.videoUrl}?autoplay=0&rel=0" 
                title="${activeLesson.title}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
          ` : `
            <div class="glass-card" style="margin-bottom: 24px;">
              <div class="badge badge-info" style="margin-bottom: 12px;">Reading Article</div>
              <h2>${activeLesson.title}</h2>
              <p style="margin-top: 12px; font-size: 1.05rem; line-height: 1.7; color: var(--text-primary);">${activeLesson.content}</p>
            </div>
          `}

          <!-- Lesson Navigation Bar -->
          <div class="lesson-body-content">
            <div class="lesson-header-bar">
              <div>
                <h2>${activeLesson.title}</h2>
                <span style="font-size: 0.85rem; color: var(--text-muted);"><i data-lucide="clock"></i> Est. Duration: ${activeLesson.duration}</span>
              </div>

              <div style="display: flex; align-items: center; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="chk-mark-lesson-complete" ${isLessonCompleted ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent-primary);">
                  <strong style="font-size: 0.95rem;">Mark as Completed</strong>
                </label>
              </div>
            </div>

            <p style="color: var(--text-secondary); font-size: 0.95rem;">${activeLesson.content}</p>
          </div>
        ` : `
          <div class="empty-state text-center" style="padding: 60px 0;">
            <p>Select a lesson from the curriculum sidebar to begin.</p>
          </div>
        `}
      </div>

      <!-- Right Curriculum Sidebar -->
      <aside class="player-sidebar">
        <div class="sidebar-header">
          <h3>Course Content</h3>
          <div class="sidebar-progress-box">
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
              <span>Course Progress</span>
              <strong>${enrollment ? enrollment.progressPercentage : 0}%</strong>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${enrollment ? enrollment.progressPercentage : 0}%;"></div>
            </div>
          </div>
        </div>

        <div style="flex: 1; overflow-y: auto;">
          ${course.modules.map(mod => `
            <div class="sidebar-module-group">
              <div class="sidebar-module-title">
                <span>${mod.title}</span>
              </div>
              <div class="sidebar-lessons-list">
                ${mod.lessons.map(les => {
                  const isComp = completedLessonIds.includes(les.id);
                  const isAct = activeLesson && activeLesson.id === les.id;

                  return `
                    <button class="sidebar-lesson-btn ${isAct ? 'active' : ''} ${isComp ? 'completed' : ''}" data-lesson-id="${les.id}">
                      <i data-lucide="${isComp ? 'check-circle' : (les.type === 'video' ? 'play-circle' : 'file-text')}" class="check-icon" style="width: 18px; height: 18px;"></i>
                      <span style="flex: 1;">${les.title}</span>
                      <small style="opacity: 0.7;">${les.duration}</small>
                    </button>
                  `;
                }).join('')}

                ${mod.quiz ? `
                  <button class="sidebar-lesson-btn quiz-btn" data-quiz-id="${mod.quiz.id}" style="background: rgba(245, 158, 11, 0.1); color: var(--color-warning);">
                    <i data-lucide="help-circle" style="color: var(--color-warning); width: 18px; height: 18px;"></i>
                    <span style="flex: 1; font-weight: 700;">Take Quiz: ${mod.quiz.title}</span>
                    ${enrollment && enrollment.quizScores[mod.quiz.id] !== undefined ? `
                      <span class="badge badge-success">${enrollment.quizScores[mod.quiz.id]}%</span>
                    ` : '<span class="badge badge-warning">Quiz</span>'}
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </aside>
    </div>
  `;

  // Attach Player Event Listeners
  document.getElementById('btn-player-back')?.addEventListener('click', () => {
    window.AppState.setView('details', { courseId });
  });

  document.querySelectorAll('.sidebar-lesson-btn[data-lesson-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lesId = e.currentTarget.dataset.lessonId;
      window.AppState.setView('player', { courseId, lessonId: lesId });
    });
  });

  document.querySelectorAll('.quiz-btn[data-quiz-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const quizId = e.currentTarget.dataset.quizId;
      window.openQuizModal(courseId, quizId);
    });
  });

  document.getElementById('chk-mark-lesson-complete')?.addEventListener('change', (e) => {
    if (activeLesson) {
      window.AppState.markLessonCompleted(courseId, activeLesson.id, e.target.checked);
      window.showToast(
        e.target.checked ? 'Lesson marked as complete!' : 'Lesson status updated', 
        e.target.checked ? 'success' : 'info'
      );
      renderPlayerView();
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

window.renderPlayerView = renderPlayerView;
