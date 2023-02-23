const startButton = document.getElementById("start");

const quizContainer = document.getElementById("quiz");

quizContainer.style.display = 'none';

let timerInterval; 

let timerElement = null;

startButton.addEventListener('click', startQuiz);
let timeLeft = 75;
function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";

    const timerElement = document.getElementById("timer");

    timerElement.textContent = timeLeft + " seconds";

    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft = 0;
        timerElement.textContent = "0";
      } else {
        timerElement.textContent = timeLeft + ' seconds';
      }
    }, 1000);
}

const quizData = [
    {
        question: "JavaScript File Has An Extension of?",
        a: ".Java",
        b: ".javascript",
        c: ".jscript",
        d: ".js",
        correct: "d",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a: "JavaScript",
        b: "js",
        c: "jscript",
        d: "ScriptJava",
        correct: "a",
    },
    {
        question: "Which language adds functionality to a webpage?",
        a: "HTML",
        b: "JavaScript",
        c: "English",
        d: "CSS",
        correct: "b",
    },
    {
        question: "A Function Associated With An object is Called?",
        a: "Link",
        b: "Function",
        c: "Method",
        d: "None",
        correct: "c",
    },
];

const quiz = document.getElementById("quiz")
const questionEl = document.getElementById("question")
const quizAnswers = document.querySelectorAll(".answer")
const a_text = document.getElementById("a-text")
const b_text = document.getElementById("b-text")
const c_text = document.getElementById("c-text")
const d_text = document.getElementById("d-text")
const submitBtn = document.getElementById("submit")

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    if (currentQuiz === quizData.length) {
        clearInterval(timerInterval);
        timerElement.textContent = "0 seconds";
    }
}

function deselectAnswers() {
    quizAnswers.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer = undefined;
    quizAnswers.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    })
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer) {
       if (answer === quizData[currentQuiz].correct) {
           score++
       }  else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerElement.textContent = timeLeft + ' seconds';
    }
       currentQuiz++
       if (currentQuiz < quizData.length) {
           loadQuiz();
       } else {
            clearInterval(timerInterval);
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
           <button onclick="location.reload()">Reload</button>
           `
       }
    } else {
   
    }
})