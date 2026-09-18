/* ==========================================================================
   EduPulse CMS - Instructor Studio & Course Builder View
   ========================================================================== */

let studioModulesList = [];

function renderStudioView() {
  const mainEl = document.getElementById('app-main');
  if (!mainEl) return;

  const courses = window.AppState.getCourses();

  mainEl.innerHTML = `
    <div class="container studio-container" style="padding-top: 24px;">
      <div class="studio-header">
        <div>
          <h1>Instructor Course Studio</h1>
          <p>Create, customize, and publish interactive courses for your global student audience.</p>
        </div>

        <button id="btn-open-create-course" class="btn btn-primary btn-lg">
          <i data-lucide="plus-circle"></i> Create New Course
        </button>
      </div>

      <div class="glass-card">
        <div class="section-header">
          <div class="section-title">
            <i data-lucide="folder-kanban"></i>
            <h3>Your Managed Courses (${courses.length})</h3>
          </div>
        </div>

        ${courses.length === 0 ? `
          <div class="empty-state text-center" style="padding: 40px 0;">
            <p>You haven't created any courses yet. Click "Create New Course" to get started!</p>
          </div>
        ` : `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Course Info</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Enrolled Students</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${courses.map(course => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${course.thumbnail}" alt="" style="width: 50px; height: 36px; border-radius: var(--radius-sm); object-fit: cover;">
                        <div>
                          <strong style="display: block; color: var(--text-primary);">${course.title}</strong>
                          <small style="color: var(--text-muted);">${course.modules.length} Modules</small>
                        </div>
                      </div>
                    </td>
                    <td><span class="badge badge-primary">${course.category}</span></td>
                    <td><strong>${course.price === 0 ? 'FREE' : `$${course.price.toFixed(2)}`}</strong></td>
                    <td>${course.studentsCount} Students</td>
                    <td>
                      <i data-lucide="star" style="width: 14px; color: #f59e0b; fill: #f59e0b;"></i>
                      <strong>${course.rating}</strong>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="btn btn-secondary btn-sm btn-edit-course" data-course-id="${course.id}" title="Edit Course">
                          <i data-lucide="edit-3"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete-course" data-course-id="${course.id}" title="Delete Course">
                          <i data-lucide="trash-2"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;

  // Attach Listeners
  document.getElementById('btn-open-create-course')?.addEventListener('click', () => {
    openStudioFormModal(null);
  });

  document.querySelectorAll('.btn-edit-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.courseId;
      openStudioFormModal(id);
    });
  });

  document.querySelectorAll('.btn-delete-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.courseId;
      if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
        window.AppState.deleteCourse(id);
        window.showToast('Course deleted', 'info');
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

function openStudioFormModal(courseId) {
  const form = document.getElementById('form-course-studio');
  const titleEl = document.getElementById('modal-studio-title');
  if (!form) return;

  if (courseId) {
    const course = window.AppState.getCourseById(courseId);
    if (!course) return;

    if (titleEl) titleEl.innerHTML = `<i data-lucide="edit"></i> Edit Course: ${course.title}`;
    document.getElementById('studio-course-id').value = course.id;
    document.getElementById('studio-title').value = course.title;
    document.getElementById('studio-category').value = course.category;
    document.getElementById('studio-level').value = course.level;
    document.getElementById('studio-price').value = course.price;
    document.getElementById('studio-instructor').value = course.instructor;
    document.getElementById('studio-thumbnail').value = course.thumbnail || '';
    document.getElementById('studio-description').value = course.overview;

    studioModulesList = JSON.parse(JSON.stringify(course.modules || []));
  } else {
    if (titleEl) titleEl.innerHTML = `<i data-lucide="plus-circle"></i> Create New Course`;
    form.reset();
    document.getElementById('studio-course-id').value = '';
    
    // Default initial module template
    studioModulesList = [
      {
        id: `mod-${Date.now()}-1`,
        title: "Module 1: Course Fundamentals",
        lessons: [
          {
            id: `les-${Date.now()}-1`,
            title: "Lesson 1: Introduction",
            type: "video",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/embed/gT0LhBwIgDw",
            content: "Welcome to this course! In this lesson we cover the course objectives."
          }
        ]
      }
    ];
  }

  renderStudioModulesList();
  window.openDialogModal('modal-course-studio');
}

function renderStudioModulesList() {
  const container = document.getElementById('studio-modules-container');
  if (!container) return;

  container.innerHTML = studioModulesList.map((mod, mIdx) => `
    <div class="module-builder-card" data-module-idx="${mIdx}">
      <div class="module-header-inputs">
        <input 
          type="text" 
          class="module-title-input" 
          value="${mod.title}" 
          placeholder="Module Title (e.g. Module 1: Basics)"
          data-module-idx="${mIdx}"
          required
        >
        <button type="button" class="btn btn-danger btn-sm btn-remove-module" data-module-idx="${mIdx}">
          <i data-lucide="trash"></i>
        </button>
      </div>

      <div class="module-lessons-container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <small style="font-weight: 700; color: var(--text-secondary);">Lessons (${mod.lessons.length})</small>
          <button type="button" class="btn btn-secondary btn-sm btn-add-lesson" data-module-idx="${mIdx}">
            <i data-lucide="plus"></i> Add Lesson
          </button>
        </div>

        ${mod.lessons.map((les, lIdx) => `
          <div class="lesson-builder-row">
            <input 
              type="text" 
              value="${les.title}" 
              placeholder="Lesson Title"
              class="lesson-title-input"
              data-module-idx="${mIdx}" 
              data-lesson-idx="${lIdx}"
              required
            >
            <select class="lesson-type-select" data-module-idx="${mIdx}" data-lesson-idx="${lIdx}" style="width: 120px;">
              <option value="video" ${les.type === 'video' ? 'selected' : ''}>Video</option>
              <option value="text" ${les.type === 'text' ? 'selected' : ''}>Article</option>
            </select>
            <input 
              type="text" 
              value="${les.duration}" 
              placeholder="15 min"
              class="lesson-duration-input"
              data-module-idx="${mIdx}" 
              data-lesson-idx="${lIdx}"
              style="width: 90px;"
            >
            <button type="button" class="btn-icon btn-remove-lesson" data-module-idx="${mIdx}" data-lesson-idx="${lIdx}" title="Delete Lesson">
              <i data-lucide="x"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Attach Studio Form Listeners
  container.querySelectorAll('.module-title-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const mIdx = parseInt(e.target.dataset.moduleIdx, 10);
      studioModulesList[mIdx].title = e.target.value;
    });
  });

  container.querySelectorAll('.lesson-title-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const mIdx = parseInt(e.target.dataset.moduleIdx, 10);
      const lIdx = parseInt(e.target.dataset.lessonIdx, 10);
      studioModulesList[mIdx].lessons[lIdx].title = e.target.value;
    });
  });

  container.querySelectorAll('.lesson-type-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const mIdx = parseInt(e.target.dataset.moduleIdx, 10);
      const lIdx = parseInt(e.target.dataset.lessonIdx, 10);
      studioModulesList[mIdx].lessons[lIdx].type = e.target.value;
    });
  });

  container.querySelectorAll('.lesson-duration-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const mIdx = parseInt(e.target.dataset.moduleIdx, 10);
      const lIdx = parseInt(e.target.dataset.lessonIdx, 10);
      studioModulesList[mIdx].lessons[lIdx].duration = e.target.value;
    });
  });

  container.querySelectorAll('.btn-remove-module').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mIdx = parseInt(e.currentTarget.dataset.moduleIdx, 10);
      studioModulesList.splice(mIdx, 1);
      renderStudioModulesList();
    });
  });

  container.querySelectorAll('.btn-add-lesson').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mIdx = parseInt(e.currentTarget.dataset.moduleIdx, 10);
      studioModulesList[mIdx].lessons.push({
        id: `les-${Date.now()}-${Math.floor(Math.random()*100)}`,
        title: "New Lesson",
        type: "video",
        duration: "10 min",
        videoUrl: "https://www.youtube.com/embed/gT0LhBwIgDw",
        content: "New lesson content details..."
      });
      renderStudioModulesList();
    });
  });

  container.querySelectorAll('.btn-remove-lesson').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mIdx = parseInt(e.currentTarget.dataset.moduleIdx, 10);
      const lIdx = parseInt(e.currentTarget.dataset.lessonIdx, 10);
      studioModulesList[mIdx].lessons.splice(lIdx, 1);
      renderStudioModulesList();
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

// Global initialization for form submission
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-add-module')?.addEventListener('click', () => {
    studioModulesList.push({
      id: `mod-${Date.now()}`,
      title: `Module ${studioModulesList.length + 1}: New Topic`,
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: "Lesson 1: Overview",
          type: "video",
          duration: "15 min",
          videoUrl: "https://www.youtube.com/embed/gT0LhBwIgDw",
          content: "Lesson details..."
        }
      ]
    });
    renderStudioModulesList();
  });

  document.getElementById('form-course-studio')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('studio-course-id').value;
    const title = document.getElementById('studio-title').value;
    const category = document.getElementById('studio-category').value;
    const level = document.getElementById('studio-level').value;
    const price = parseFloat(document.getElementById('studio-price').value) || 0;
    const instructor = document.getElementById('studio-instructor').value;
    let thumbnail = document.getElementById('studio-thumbnail').value;
    const overview = document.getElementById('studio-description').value;

    if (!thumbnail) {
      thumbnail = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop";
    }

    const coursePayload = {
      id: id || null,
      title,
      category,
      level,
      price,
      instructor,
      thumbnail,
      overview,
      modules: studioModulesList
    };

    window.AppState.saveCourse(coursePayload);
    window.closeDialogModal('modal-course-studio');
    window.showToast(id ? 'Course updated successfully!' : 'New Course Published!', 'success');
  });
});

window.renderStudioView = renderStudioView;
