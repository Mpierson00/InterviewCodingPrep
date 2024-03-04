// Question and answer array
const questions = [
    { question: "What is the correct syntax for creating a new object in JavaScript?", choices: ["var obj = new Object();", "var obj = create Object();", "var obj = Object();", "var obj = new createObject();"], correct: 0 },
    { question: "How can you access the value of the property 'name' in the object 'person'?", choices: ["person[name];", "person.name;", "person->name;", "person::name;"], correct: 1 },
    { question: "Which method can be used to add a property to an existing object?", choices: ["Object.addProperty(obj, 'newProp', 'value');", "obj.newProp = 'value';", "obj.addProperty('newProp', 'value');", "addProperty(obj, 'newProp', 'value');"], correct: 1 },
    { question: "How do you create an array in JavaScript?", choices: ["var arr = new Array('item1', 'item2');", "var arr = ['item1', 'item2'];", "var arr = (1:'item1', 2:'item2');", "var arr = array('item1', 'item2');"], correct: 1 },
    { question: "How can you check if a property 'age' exists in an object 'person'?", choices: ["person.contains('age')", "person.exists('age')", "'age' in person", "person.hasProperty('age')"], correct: 2 }
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
const resultsSection = document.getElementById('results');
const scoreParagraph = document.getElementById('score');
const saveScoreButton = document.getElementById('save-score-btn');
const retryButton = document.getElementById('retry-btn');
const initialsInput = document.getElementById('initials');
const backButton = document.getElementById('back-btn')

// Button and links event listeners
startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', restartQuiz);
saveScoreButton.addEventListener('click', saveHighScore);

document.getElementById('high-scores-link').addEventListener('click', function (event) {
    event.preventDefault();
    displayHighscores();
});

backButton.addEventListener('click', function () {
    // Hides high scores and shows quiz
    document.getElementById('high-scores-list').classList.add('hide');
    document.getElementById('quiz-container').classList.remove('hide');
    score = 0;
    currentQuestionIndex = 0;
    timer = 60;
    updateTimerDisplay();

    document.getElementById('question').innerHTML = '';
    document.getElementById('answer-buttons').innerHTML = '';

    resultsSection.classList.add('hide');
    startButton.classList.remove('hide');
});


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
    clearInterval(timerId);  //Clear existing timer
    timerId = setInterval(() => {
        timer--; //Decrease timer
        updateTimerDisplay();
        if (timer <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

// Display next question
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]); //Shows current question
}
// Shows questions and answer choices
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.choices.forEach((choice, index) => { 
        const button = document.createElement('button'); //Create a button for each choice
        button.innerText = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index, question.correct));
        answerButtonsElement.appendChild(button); //Add button to DOM
    });
}

//Resets the state before showing new question
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle answer choices
function selectAnswer(index, correct) {
    if (index === correct) {
        score++; //Increase score if answer is right
    } else {
        timer -= 5; //Decrease timer by 5 is incorrect
        updateTimerDisplay();
        if (timer <= 0) {
            timer = 0;
            endGame();
        }
    }
    // Loads next question or end the game
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
    scoreParagraph.textContent = `Your score: ${scorePercentage}%`; //Displays the score
    resultsSection.classList.remove('hide');
}
// Resets the quiz
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
    const initials = initialsInput.value.trim();
    if (!initials) {
        alert('Please enter your initials.');
        return;
    }
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = { score: (score / questions.length) * 100, initials };
    highScores.push(newScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Hide the current view and show the high scores
    resultsSection.classList.add('hide');
    displayHighscores();
}

// Display the high scores
function displayHighscores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.getElementById('high-scores-table');

    // Sort high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Display each high score as a list item
    highScoresList.innerHTML = highScores.map(score => `<li>${score.initials} - ${score.score}%</li>`).join('');

    document.getElementById('quiz-container').classList.add('hide');
    document.getElementById('high-scores-list').classList.remove('hide');
}