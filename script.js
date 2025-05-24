const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timePerQuestion = 15;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.textContent = "";
  feedback.textContent = "";
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";
  nextBtn.disabled = true;

  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selectedOption) {
  clearInterval(timer);
  const correct = questions[currentQuestionIndex].answer;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#4CAF50"; // green
    } else if (btn.textContent === selectedOption) {
      btn.style.backgroundColor = "#f44336"; // red
    }
  });

  if (selectedOption === correct) {
    score++;
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = `❌ Wrong. The correct answer was "${correct}".`;
  }

  nextBtn.disabled = false;
}

function showScore() {
  questionText.textContent = "Quiz Complete!";
  optionsContainer.innerHTML = "";
  feedback.textContent = "";
  timerDisplay.textContent = "";
  scoreContainer.textContent = `Your score: ${score} out of ${questions.length}`;
  nextBtn.textContent = "Restart";
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (nextBtn.textContent === "Restart") {
    nextBtn.textContent = "Next";
    startQuiz();
  } else {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
});

function startTimer() {
  let timeLeft = timePerQuestion;
  timerDisplay.textContent = `⏳ ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏳ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer(null);
    }
  }, 1000);
}

startQuiz();