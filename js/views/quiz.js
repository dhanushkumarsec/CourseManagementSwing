/* ==========================================================================
   EduPulse CMS - Quiz Engine Component
   ========================================================================== */

let currentQuizState = {
  courseId: null,
  quizId: null,
  quizData: null,
  userAnswers: {},
  isSubmitted: false
};

function openQuizModal(courseId, quizId) {
  const course = window.AppState.getCourseById(courseId);
  if (!course) return;

  let foundQuiz = null;
  course.modules.forEach(mod => {
    if (mod.quiz && mod.quiz.id === quizId) {
      foundQuiz = mod.quiz;
    }
  });

  if (!foundQuiz) return;

  currentQuizState = {
    courseId,
    quizId,
    quizData: foundQuiz,
    userAnswers: {},
    isSubmitted: false
  };

  renderQuizModalBody();
  window.openDialogModal('modal-quiz');
}

function renderQuizModalBody() {
  const container = document.getElementById('quiz-modal-body');
  const titleEl = document.getElementById('quiz-modal-title');
  if (!container || !currentQuizState.quizData) return;

  const quiz = currentQuizState.quizData;
  if (titleEl) {
    titleEl.innerHTML = `<i data-lucide="help-circle"></i> ${quiz.title}`;
  }

  if (currentQuizState.isSubmitted) {
    // Show Results & Explanations
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (currentQuizState.userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercentage >= (quiz.passingScore || 70);

    // Record Result in State
    window.AppState.recordQuizResult(currentQuizState.courseId, currentQuizState.quizId, scorePercentage);

    container.innerHTML = `
      <div class="text-center" style="margin-bottom: 24px;">
        <div style="font-size: 3rem; font-weight: 800; color: ${passed ? 'var(--color-success)' : 'var(--color-danger)'};">
          ${scorePercentage}%
        </div>
        <h3>${passed ? '🎉 Congratulations! Quiz Passed!' : '⚠️ Quiz Failed'}</h3>
        <p style="color: var(--text-secondary);">
          ${passed ? `You scored ${correctCount} out of ${quiz.questions.length} questions correctly.` : `You need at least ${quiz.passingScore || 70}% to pass this assessment.`}
        </p>
      </div>

      <div class="quiz-questions-review">
        ${quiz.questions.map((q, idx) => {
          const userSel = currentQuizState.userAnswers[q.id];
          const isCorrect = userSel === q.correctIndex;

          return `
            <div class="quiz-card" style="border-left: 4px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-danger)'};">
              <div class="quiz-question-text">Q${idx + 1}. ${q.question}</div>
              <div class="quiz-options-list">
                ${q.options.map((opt, oIdx) => {
                  let optClass = '';
                  if (oIdx === q.correctIndex) optClass = 'correct';
                  else if (oIdx === userSel) optClass = 'incorrect';

                  return `
                    <div class="quiz-option-btn ${optClass}">
                      <span style="font-weight: 700;">${String.fromCharCode(65 + oIdx)}.</span>
                      <span>${opt}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="quiz-explanation-box">
                <strong>Explanation:</strong> ${q.explanation || 'No additional explanation provided.'}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="dialog-footer" style="padding: 16px 0 0; background: transparent;">
        ${!passed ? `
          <button id="btn-retake-quiz" class="btn btn-secondary">
            <i data-lucide="rotate-ccw"></i> Retake Quiz
          </button>
        ` : ''}
        <button class="btn btn-primary" data-close-dialog>
          Done
        </button>
      </div>
    `;

    document.getElementById('btn-retake-quiz')?.addEventListener('click', () => {
      currentQuizState.isSubmitted = false;
      currentQuizState.userAnswers = {};
      renderQuizModalBody();
    });

  } else {
    // Show Question Stepper / Form
    container.innerHTML = `
      <form id="form-quiz-submit">
        ${quiz.questions.map((q, idx) => `
          <div class="quiz-card">
            <div class="quiz-question-text">Question ${idx + 1} of ${quiz.questions.length}: ${q.question}</div>
            <div class="quiz-options-list">
              ${q.options.map((opt, oIdx) => `
                <label class="quiz-option-btn ${currentQuizState.userAnswers[q.id] === oIdx ? 'selected' : ''}">
                  <input 
                    type="radio" 
                    name="question-${q.id}" 
                    value="${oIdx}" 
                    ${currentQuizState.userAnswers[q.id] === oIdx ? 'checked' : ''}
                    required
                    style="display: none;"
                  >
                  <span style="font-weight: 700;">${String.fromCharCode(65 + oIdx)}.</span>
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="dialog-footer" style="padding: 16px 0 0; background: transparent;">
          <button type="button" class="btn btn-secondary" data-close-dialog>Cancel</button>
          <button type="submit" class="btn btn-primary">
            <i data-lucide="check-circle"></i> Submit Quiz Answers
          </button>
        </div>
      </form>
    `;

    // Handle radio changes
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const qId = e.target.name.replace('question-', '');
        currentQuizState.userAnswers[qId] = parseInt(e.target.value, 10);
        
        // Update selected class visually
        const parentList = e.target.closest('.quiz-options-list');
        parentList.querySelectorAll('.quiz-option-btn').forEach(btn => btn.classList.remove('selected'));
        e.target.closest('.quiz-option-btn').classList.add('selected');
      });
    });

    document.getElementById('form-quiz-submit')?.addEventListener('submit', (e) => {
      e.preventDefault();
      currentQuizState.isSubmitted = true;
      renderQuizModalBody();
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

window.openQuizModal = openQuizModal;
