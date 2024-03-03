const questions = [
    { question: "Question 1", choices: ["A1", "B1", "C1", "D1"], correct: 0 },
    { question: "Question 2", choices: ["A2", "B2", "C2", "D2"], correct: 1 },
    { question: "Question 3", choices: ["A3", "B3", "C3", "D3"], correct: 2 },
    { question: "Question 4", choices: ["A4", "B4", "C4", "D4"], correct: 3 },
    { question: "Question 5", choices: ["A5", "B5", "C5", "D5"], correct: 0 }
];
let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let timerId;

const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const highScoresSection = document.getElementById('high-scores');
const resultsSection = document.getElementById('results');
const scoreParagraph = document.getElementById('score');
const saveScoreButton = document.getElementById('save-score-btn');
const retryButton = document.getElementById('retry-btn');
const initialsInput = document.getElementById('initials');

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', restartQuiz);
saveScoreButton.addEventListener('click', saveHighScore);


function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    questions.sort(() => Math.random() - 0.5); // Shuffle questions
    startTimer();
    setNextQuestion();
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        timer--;
        updateTimerDisplay();
        if (timer <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index, question.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(index, correct) {
    if (index === correct) {
        score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerId);
    questionContainerElement.classList.add('hide');
    const scorePercentage = (score / questions.length) * 100;
    scoreParagraph.textContent = `Your score: ${scorePercentage}%`;
    resultsSection.classList.remove('hide');
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timer = 60;
    updateTimerDisplay();
    resultsSection.classList.add('hide');
    questionContainerElement.classList.add('hide');
    startButton.classList.remove('hide');
    document.getElementById('question').innerHTML = '';
    document.getElementById('answer-buttons').innerHTML = '';
}

function updateTimerDisplay() {
    timerElement.textContent = timer;
}

function saveHighScore() {
    const initials = initialsInput.value;
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    initialsInput.value = '';
}