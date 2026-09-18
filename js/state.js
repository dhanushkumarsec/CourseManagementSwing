/* ==========================================================================
   EduPulse CMS - State Management & LocalStorage Persistence
   ========================================================================== */

const STORAGE_KEYS = {
  COURSES: 'edupulse_courses_v1',
  STUDENTS: 'edupulse_students_v1',
  ROLE: 'edupulse_role_v1',
  THEME: 'edupulse_theme_v1'
};

class AppStateManager {
  constructor() {
    this.listeners = [];
    this.currentRole = localStorage.getItem(STORAGE_KEYS.ROLE) || 'student'; // 'student' | 'instructor'
    this.currentView = 'catalog'; // 'catalog' | 'details' | 'player' | 'studio' | 'analytics' | 'profile'
    this.selectedCourseId = null;
    this.selectedLessonId = null;
    this.activeStudentId = 'std-1'; // Default logged in student

    this._initStorage();
  }

  _initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS_ROSTER));
    }
  }

  // Getters
  getCourses() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES)) || [];
  }

  getCourseById(courseId) {
    return this.getCourses().find(c => c.id === courseId);
  }

  getStudents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS)) || [];
  }

  getActiveStudent() {
    const students = this.getStudents();
    return students.find(s => s.id === this.activeStudentId) || students[0];
  }

  getStudentEnrollment(courseId) {
    const student = this.getActiveStudent();
    if (!student) return null;
    return student.enrolledCourses.find(e => e.courseId === courseId);
  }

  // State Updates & Persistence
  setRole(role) {
    this.currentRole = role;
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    this.notify();
  }

  setView(viewName, params = {}) {
    this.currentView = viewName;
    if (params.courseId) this.selectedCourseId = params.courseId;
    if (params.lessonId) this.selectedLessonId = params.lessonId;
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  enrollStudentInCourse(courseId) {
    const students = this.getStudents();
    const student = students.find(s => s.id === this.activeStudentId);
    if (!student) return;

    const existing = student.enrolledCourses.find(e => e.courseId === courseId);
    if (!existing) {
      const today = new Date().toISOString().split('T')[0];
      student.enrolledCourses.push({
        courseId: courseId,
        enrolledDate: today,
        completedLessonIds: [],
        progressPercentage: 0,
        quizScores: {},
        certificateId: null
      });

      // Increment course student count
      const courses = this.getCourses();
      const course = courses.find(c => c.id === courseId);
      if (course) {
        course.studentsCount = (course.studentsCount || 0) + 1;
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      }

      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
      this.notify();
    }
  }

  markLessonCompleted(courseId, lessonId, isCompleted = true) {
    const students = this.getStudents();
    const student = students.find(s => s.id === this.activeStudentId);
    if (!student) return;

    const enrollment = student.enrolledCourses.find(e => e.courseId === courseId);
    if (!enrollment) return;

    const course = this.getCourseById(courseId);
    if (!course) return;

    // Calculate total lessons
    let totalLessonsCount = 0;
    course.modules.forEach(m => {
      totalLessonsCount += (m.lessons || []).length;
    });

    if (isCompleted) {
      if (!enrollment.completedLessonIds.includes(lessonId)) {
        enrollment.completedLessonIds.push(lessonId);
      }
    } else {
      enrollment.completedLessonIds = enrollment.completedLessonIds.filter(id => id !== lessonId);
    }

    // Recalculate percentage
    const completedCount = enrollment.completedLessonIds.length;
    enrollment.progressPercentage = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

    // Auto generate certificate ID if 100% complete
    if (enrollment.progressPercentage >= 100 && !enrollment.certificateId) {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      enrollment.certificateId = `CERT-EDUPULSE-2026-${randomNum}`;
    }

    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    this.notify();
  }

  recordQuizResult(courseId, quizId, scorePercentage) {
    const students = this.getStudents();
    const student = students.find(s => s.id === this.activeStudentId);
    if (!student) return;

    let enrollment = student.enrolledCourses.find(e => e.courseId === courseId);
    if (!enrollment) {
      this.enrollStudentInCourse(courseId);
      enrollment = student.enrolledCourses.find(e => e.courseId === courseId);
    }

    enrollment.quizScores[quizId] = scorePercentage;
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    this.notify();
  }

  saveCourse(courseData) {
    const courses = this.getCourses();
    if (courseData.id) {
      // Update existing course
      const index = courses.findIndex(c => c.id === courseData.id);
      if (index !== -1) {
        courses[index] = { ...courses[index], ...courseData };
      }
    } else {
      // Create new course
      const newCourse = {
        id: `course-${Date.now()}`,
        rating: 5.0,
        ratingCount: 1,
        studentsCount: 0,
        duration: "10 Hours",
        modules: [],
        ...courseData
      };
      courses.unshift(newCourse);
    }

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    this.notify();
  }

  deleteCourse(courseId) {
    let courses = this.getCourses();
    courses = courses.filter(c => c.id !== courseId);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    this.notify();
  }

  resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS_ROSTER));
    this.notify();
  }

  // Subscribe to changes
  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }
}

// Export global singleton instance
window.AppState = new AppStateManager();
