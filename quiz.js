// select all elements
var x = document.getElementById("myAudio");
var y = document.getElementById("myAudio1");
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [{
    question: "Which animal is known as the ‘Ship of the Desert'?",
    imgSrc: "img/Desert-Animals-Pictures.jpg",
    choiceA: "Coyote",
    choiceB: "Camel",
    choiceC: "Rattle Snakes",
    choiceD: "Kangaroo",
    correct: "B"
}, {
    question: "What do you call a type of shape that has five sides?",
    imgSrc: "img/shapes-basic-color.png",
    choiceA: "Hexagon",
    choiceB: "Rectangle",
    choiceC: "Triangle",
    choiceD: "Pentagon",
    correct: "D"
}, {
    question: "Which month of the year has the least number of days?",
    imgSrc: "img/download.jpeg",
    choiceA: "November",
    choiceB: "October",
    choiceC: "February",
    choiceD: "January",
    correct: "C"
}, {
    question: "How many consonants are there in the English alphabet?",
    imgSrc: "img/vowels_and_consonants.png",
    choiceA: "21",
    choiceB: "26",
    choiceC: "5",
    choiceD: "16",
    correct: "A"
}, {
    question: "Which animal is called King of Jungle?",
    imgSrc: "img/maxresdefault.jpg",
    choiceA: "Tiger",
    choiceB: "Lion",
    choiceC: "Elephant",
    choiceD: "Leopard",
    correct: "B"
}, {
    question: "How many days are there in the month of February in a leap year?",
    imgSrc: "img/leap.jpg",
    choiceA: "29",
    choiceB: "28",
    choiceC: "30",
    choiceD: "31",
    correct: "A"
}, {
    question: "What type of bird lays the largest eggs?",
    imgSrc: "img/birds.jpg",
    choiceA: "Ostrich",
    choiceB: "Crane",
    choiceC: "Columbidae",
    choiceD: "Kingfisher",
    correct: "A"
}, {
    question: "How many months of the year have 31 days?",
    imgSrc: "img/images.jpeg",
    choiceA: "5",
    choiceB: "8",
    choiceC: "6",
    choiceD: "7",
    correct: "D"
}, {
    question: "Who was the first man to walk on the moon?",
    imgSrc: "img/800.jpeg",
    choiceA: "Gene Cernan",
    choiceB: "Kalpana Chawla",
    choiceC: "Neil Armstrong",
    choiceD: "David Scott",
    correct: "C"
}, {
    question: "Which is the tallest mountain in the world?",
    imgSrc: "img/mountains.jpeg",
    choiceA: "K2",
    choiceB: "Makalu",
    choiceC: "Nanga Parbat",
    choiceD: "Mount Everest",
    correct: "D"
}];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 15;
const questionTime = 15;
const gaugeWidth = 225;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// onload event handler
function myFunction() {
    alert("Get Ready for your Quiz!!!");
}

// counter render

function renderCounter() {
    if (count >= 0) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--
    } else {
        count = 15;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
            renderCounter();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();

        function playAudio() {
            x.play();
        }
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();

        function playAudio() {
            y.play();
        }
    }
    count < 0;
    if (runningQuestion < lastQuestion) {
        count = 15;
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}