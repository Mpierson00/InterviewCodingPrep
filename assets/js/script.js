const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questions = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
let shuffledQuestion, currentQuestionIndex;
let timer = 60;
let timerId;

