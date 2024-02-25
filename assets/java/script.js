var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerElement = document.getElementById('time');
var highScoresElement = document.getElementById('high-scores');
var saveScoreButton = document.getElementById('save-score-btn');
var initialsElement = document.getElementById('initials');

var shuffledQuestion, currentQuestionIndex;
var timer = 60;
var timerId;

var questions = [
    {}
]