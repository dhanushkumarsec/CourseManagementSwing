/* ==========================================================================
   EduPulse CMS - Analytics Dashboard & Student Roster View
   ========================================================================== */

function renderAnalyticsView() {
  const mainEl = document.getElementById('app-main');
  if (!mainEl) return;

  const courses = window.AppState.getCourses();
  const students = window.AppState.getStudents();

  // Compute Metrics
  let totalRevenue = 0;
  let totalStudentsEnrolledCount = 0;
  let totalCompletedCertificates = 0;

  courses.forEach(c => {
    totalRevenue += (c.price * (c.studentsCount || 0));
    totalStudentsEnrolledCount += (c.studentsCount || 0);
  });

  students.forEach(s => {
    s.enrolledCourses.forEach(e => {
      if (e.certificateId) totalCompletedCertificates++;
    });
  });

  mainEl.innerHTML = `
    <div class="container analytics-container" style="padding-top: 24px;">
      <div class="section-header">
        <div>
          <h1>Instructor Analytics & Gradebook</h1>
          <p>Real-time analytics on earnings, student progress, quiz metrics, and certificate issuance.</p>
        </div>
      </div>

      <!-- Stat Cards Grid -->
      <div class="analytics-grid">
        <div class="stat-card">
          <div class="stat-icon-wrapper revenue">
            <i data-lucide="dollar-sign"></i>
          </div>
          <div>
            <div class="stat-val">$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div class="stat-lbl">Est. Platform Revenue</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper students">
            <i data-lucide="users"></i>
          </div>
          <div>
            <div class="stat-val">${totalStudentsEnrolledCount}</div>
            <div class="stat-lbl">Active Enrolled Learners</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper rating">
            <i data-lucide="award"></i>
          </div>
          <div>
            <div class="stat-val">${totalCompletedCertificates}</div>
            <div class="stat-lbl">Certificates Awarded</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper courses">
            <i data-lucide="book-open"></i>
          </div>
          <div>
            <div class="stat-val">${courses.length}</div>
            <div class="stat-lbl">Published Courses</div>
          </div>
        </div>
      </div>

      <!-- Student Gradebook Roster -->
      <div class="glass-card">
        <div class="section-header">
          <div class="section-title">
            <i data-lucide="graduation-cap"></i>
            <h3>Student Roster & Progress Tracking</h3>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course Name</th>
                <th>Enrolled Date</th>
                <th>Course Progress</th>
                <th>Quiz Score</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              ${students.flatMap(std => 
                std.enrolledCourses.map(enr => {
                  const course = window.AppState.getCourseById(enr.courseId);
                  const quizScoreVals = Object.values(enr.quizScores || {});
                  const avgQuizScore = quizScoreVals.length > 0 ? Math.round(quizScoreVals.reduce((a,b)=>a+b,0)/quizScoreVals.length) : 'N/A';

                  return `
                    <tr>
                      <td>
                        <strong>${std.name}</strong>
                        <br><small style="color: var(--text-muted);">${std.email}</small>
                      </td>
                      <td>${course ? course.title : enr.courseId}</td>
                      <td>${enr.enrolledDate}</td>
                      <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <div class="progress-bar-bg" style="width: 100px;">
                            <div class="progress-bar-fill" style="width: ${enr.progressPercentage}%;"></div>
                          </div>
                          <strong>${enr.progressPercentage}%</strong>
                        </div>
                      </td>
                      <td>
                        ${avgQuizScore !== 'N/A' ? `
                          <span class="badge ${avgQuizScore >= 70 ? 'badge-success' : 'badge-danger'}">${avgQuizScore}%</span>
                        ` : '<span style="color: var(--text-muted);">Not taken</span>'}
                      </td>
                      <td>
                        ${enr.certificateId ? `
                          <span class="badge badge-success" style="display: inline-flex; align-items: center; gap: 4px;">
                            <i data-lucide="check" style="width: 12px;"></i> Issued
                          </span>
                        ` : `
                          <span class="badge badge-warning">In Progress</span>
                        `}
                      </td>
                    </tr>
                  `;
                })
              ).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

window.renderAnalyticsView = renderAnalyticsView;
