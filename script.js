let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

async function loadQuestions() {
  try {
    const res = await fetch('questions.json');
    questions = await res.json();
    showQuestion();
  } catch (error) {
    document.getElementById('question-container').textContent = 'Failed to load questions.';
  }
}

function showQuestion() {
  resetState();
  const q = questions[currentIndex];
  document.getElementById('question-container').textContent = q.question;
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option, q.answer);
    document.getElementById('options-container').appendChild(btn);
  });
  startTimer();
}

function selectAnswer(selected, correct) {
  stopTimer();
  const feedback = document.getElementById('feedback');
  if (selected === correct) {
    score++;
    feedback.textContent = 'Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = `Wrong! Correct answer: ${correct}`;
    feedback.style.color = 'red';
  }
  document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.querySelector('.quiz-container').innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
    <button onclick="location.reload()">Play Again</button>
  `;
}
