const container = document.querySelector("#main");
const mainContainer = document.querySelector("#main-container");
const btnBegin = document.querySelector("#begin-btn");

let questionCount = 0;
let testerScore = 0;
const testerData = [];

const options = ["a", "b", "c", "d"];

const questions = [
    {
        id: 0,
        question: "Often used data types do not include:",
        awensers: ["Boolean", "Alert", "Number", "String"],
        correct: "b",
    },
    {
        id: 1,
        question: "What is 5 + 5",
        awensers: ["7", "5", "6", "10"],
        correct: "d",
    },
    {
        id: 2,
        question: "What is 10 + 10",
        awensers: ["7", "5", "20", "10"],
        correct: "c",
    },
];

//Time
const startTimer = function (timeInterval, subTime) {
    const futureTime = new Date().getTime() + (timeInterval * questions.length);
    const timeCount = setInterval(function () {
        let now = new Date().getTime();
        let timeLeft = futureTime - now;

        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("min").innerHTML = minutes + "";
        document.getElementById("sec").innerHTML = seconds + "";

        console.log(minutes, seconds);

        if (timeLeft <= 0) {
            clearInterval(timeCount);
            document.getElementById("min").innerHTML = ""
            document.getElementById("sec").innerHTML = ""
            document.getElementById("end").innerHTML = "YOUR TIME IS UP!!";
            endQuiz();
        }
        else if (questionCount >= questions.length) {
            clearInterval(timeCount);
            endQuiz();
        }
    })
}

//Element factory function with class and id
const makeEl = function (el, classN, idName) {
    if (!classN && !idName) {
        const element = document.createElement(el);
        return element;
    } else if (!idName) {
        const element = document.createElement(el);
        element.className = classN;
        return element;
    } else {
        const element = document.createElement(el);
        element.className = classN;
        element.id = idName;
        return element;
    }
};

//On button press, build out quiz
const buildTestContainer = function () {
    mainContainer.remove();
    //create container, time, and score elements

    const containerEl = makeEl("div", "container", "main-container");
    
    const headerEl = makeEl("div", "header");
    const scoreEl = makeEl("div", "to-scores");
    scoreEl.innerHTML = `<h3>View Scores</h3>`;
    const timeEl = makeEl("div", "time");
    if (questionCount === 0) {
        timeEl.innerHTML = "<span>Time: </span><span id='min'>00:</span><span id='sec'>00</span><span id='end'></span>";
    }

    //Append elements to page
    headerEl.appendChild(scoreEl);
    headerEl.appendChild(timeEl);
    containerEl.appendChild(headerEl);
    container.appendChild(containerEl);


    const quizBodyEl = makeEl("div", "quiz-body", "quiz-body");
    const questionEl = makeEl("div", "question");
    questionEl.setAttribute("data-question", questionCount);
    questionEl.innerHTML = `<p>${questions[questionCount].question}</p>`;
    const answerEl = makeEl("div", "answers");

    //removes subsequent questions to make new ones
    if (questionCount > 0) {
        let quizBodyEl = document.querySelector("#quiz-body");
        quizBodyEl.remove();
    }

    quizBodyEl.appendChild(questionEl);
    quizBodyEl.appendChild(answerEl);
    containerEl.appendChild(quizBodyEl);

    for (let i = 0; i < options.length; i++) {
        let pEl = makeEl("p");
        pEl.setAttribute("data-answer", options[i]);
        pEl.innerHTML = `<span class='letters'>${options[
            i
        ].toUpperCase()}:</span> ${questions[questionCount].awensers[i]}`;
        answerEl.appendChild(pEl);
    }

    if (questionCount === 0) {
        startTimer(5000);
    }
};

const buildFormContainer = function () {
    const containerEl = document.querySelector("#main-container")
    const formConatiner = makeEl("form", "tester-initials", "tester-initials");
    const labelEl = makeEl("label");
    labelEl.setAttribute("for", "initials");
    labelEl.textContent = "Enter your initialsEnter your initials"
    const inputEl = makeEl("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "initials");
    const btn = makeEl("button");
    btn.textContent = "Submit"

    formConatiner.appendChild(labelEl);
    formConatiner.appendChild(inputEl);
    formConatiner.appendChild(btn);


    containerEl.appendChild(formConatiner);

}


const answerClickHandler = function (e) {
    if (e.target.getAttribute("data-answer")) {
        if (e.target.getAttribute("data-answer") === questions[questionCount].correct) {
            testerScore++
            //Check to see if final question
            if (questionCount === questions.length - 1) {
                questionCount++
                endQuiz();
            }
            else {
                alert("Correct!");
                questionCount++
                buildTestContainer();
            }
        }
        else {  //Check to see if final question
            if (questionCount >= questions.length - 1) {
                questionCount++
                endQuiz();
            }
            else {
                alert("NO NO NO NO NO NO NO");
                questionCount++
                buildTestContainer();
            }
        }
    }
};

function endQuiz() {
    const quizBody = document.querySelector("#quiz-body");
    if (quizBody) {
        quizBody.remove();
        buildFormContainer();
        console.log("Your Score is " + testerScore);
    }
}
const addTesterInitial = function () {
    const form = document.querySelector("#tester-initials");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputData = document.querySelector('input[name="initials"]');
        const userData = {
            score: testerScore,
            initials: inputData.value
        }
        testerData.pop(userData)
        console.log(userData);
    })
}

btnBegin.addEventListener("click", buildTestContainer);

container.addEventListener("click", answerClickHandler);