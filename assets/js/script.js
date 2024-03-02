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
const saveScoreButton = document.getElementById('save-score-btn');
const retryButton = document.getElementById('retry-btn');
const initialsInput = document.getElementById('initials');

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    startTimer();
    setNextQuestion();
}

function startTimer() {
    timerElement.textContent = timer;
    timerId = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}