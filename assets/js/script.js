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

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    questions.sort(() => Math.random() - 0.5);  //Shuffle questions
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
        button.addEventListener('click', () => selectAnswer(index,question.correct));
        answerButtonsElement.appendChild(button);
    })
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
    highScoresSection.classList.remove('hide');
    saveScoreButton.addEventListener('click', saveHighScore);
    retryButton.classList.remove('hide');
    retryButton.addEventListener('click', () => {
        highScoresSection.classList.add('hide');
        startGame();
    });
}

function saveHighScore() {
   const initials = initialsInput.value;
   const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
   highScores.push({ initials, score });
   highScores.sort((a, b) => b.score - a.score);
   localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log("Initials: " + initialsInput.value + ", Score: " + score);

    initialsInput.value = '';
}

document.getElementById('high-scores-link').addEventListener('click', function(event) {
    event.preventDefault();
    displayHighscores();
})

function displayHighscores() {
    const highScoresList = document.getElementById('high-scores-table');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.innerHTML = '';
    highScores.forEach(score => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(scoreElement);
    });
document.getElementById('back-btn').addEventListener('click', function() {
    document.getElementById('quiz-container').classList.remove('hide');
    document.getElementById('high-scores-list').classList.add('hide');
});

}