const container = document.querySelector("#main");
const mainContainer = document.querySelector("#main-container");
const btnBegin = document.querySelector("#begin-btn");

let questionCount = 0;
let testerScore = 0;
let testerData = [];
let userId = 0;

//console.log("Global user id" + " " + userId);
const options = ["a", "b", "c", "d"];

const questions = [
    {
        id: 0,
        question: "The value of pH for a sulfuric acid solution that contains 0.3 moles of acid per liter of solution is:",
        awensers: ["1.87", "0.22", "0.74", "2.59"],
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
        question: "A water sample contains 5 mg/liter of acetone vapor. The concentration of acetone expressed in ppm is:",
        awensers: ["50", "500", "5", "10"],
        correct: "c",
    },
    {
        id: 3,
        question: "All of the following belong to the family of aromatic compounds EXCEPT:",
        awensers: ["Benzene", "Toluene", "Pentane", "Xylene"],
        correct: "c",
    },
    {
        id: 4,
        question: "Which of the following is NOT considered to be a nobal metal:",
        awensers: ["Rhodium", "Platinum", "Gold", "Pancakes"],
        correct: "d",
    },
    {
        id: 5,
        question: "Which of the following belong to the ketone family of organic compounds:",
        awensers: ["CH3CH2OH", "CH3COH3", "CH3OH", "CH3OCH3"],
        correct: "b",
    }
];

//Time
const startTimer = function (timeInterval, subTime) {
    const futureTime = new Date().getTime() + (timeInterval * questions.length);
    const timeCount = setInterval(function () {
        let now = new Date().getTime();
        let timeLeft = futureTime - now;

        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("min").innerHTML = minutes + ":";
        document.getElementById("sec").innerHTML = seconds + "";

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

    //only create and append containerEl once in the beginning
    if (questionCount === 0) {
        const containerEl = makeEl("div", "container", "main-container");
        const headerEl = makeEl("div", "header");
        const scoreEl = makeEl("div", "to-scores", "to-scores");
        scoreEl.innerHTML = `<h3 data-score="scores">View Scores</h3>`;
        const timeEl = makeEl("div", "time");

        timeEl.innerHTML = "<span>Time: </span><span id='min'>00:</span><span id='sec'>00</span><span id='end'></span>";


        //Append elements to page
        headerEl.appendChild(scoreEl);
        headerEl.appendChild(timeEl);
        containerEl.appendChild(headerEl);
        container.appendChild(containerEl);
    }

    const containerEl = document.querySelector("#main-container");

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
        startTimer(10000);
    }
};

//Build the form container when last question was answered or when time runs out. Called in endQuiz() 
const buildFormContainer = function () {
    const containerEl = document.querySelector("#main-container")
    const formConatiner = makeEl("form", "tester-initials", "tester-initials");
    const labelEl = makeEl("label");
    labelEl.setAttribute("for", "initials");
    labelEl.textContent = "Enter your initials"
    const inputEl = makeEl("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "initials");
    const btn = makeEl("button");
    btn.textContent = "Submit"
    const home = makeEl("a");
    home.setAttribute("href", "index.html");
    home.textContent = "Home";

    formConatiner.appendChild(labelEl);
    formConatiner.appendChild(inputEl);
    formConatiner.appendChild(btn);
    formConatiner.appendChild(home);


    containerEl.appendChild(formConatiner);
}

//Answer handler
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
    else if (e.target.getAttribute("data-score")) {
        buildScores();
    }
};

//End the quiz once time is up or last question is answered. 
function endQuiz() {
    const quizBody = document.querySelector("#quiz-body");
    if (quizBody) {
        quizBody.remove();
        buildFormContainer();
        const form = document.querySelector("#tester-initials");
        const submitData = function(){
            const inputData = document.querySelector('input[name="initials"]');
            const userData = {
                score: testerScore,
                initials: inputData.value
            }
            testerData.push(userData);
            saveScore();
        }
        form.addEventListener("submit", submitData);

    }
}

//save tester scores
function saveScore() {
    localStorage.setItem("testerData", JSON.stringify(testerData));
}

//Load scores from local storage on page load
function loadTestersScore() {
    const data = localStorage.getItem("testerData");
    testerData = JSON.parse(data);
    if (testerData === null) {
        testerData = [];
        return false;
    }
}

// Build out the scores section once "View Scores" is clicked or initals are endered at quiz end
function buildScores(){
    if (testerData === null) {
        alert("No scores to present");
        testerData = [];
        return false;
    }
    else {
        mainContainer.innerHTML = "";
        const outerDiv = makeEl("div", "score-holder");
        for (let i = 0; i < testerData.length; i++) {
            const testerName = makeEl("h4");
            testerName.className = "tester-name";
            const testerScore = makeEl("p");
            const div = makeEl("div", "scores");

            testerName.textContent = testerData[i].initials;
            testerScore.textContent = `${testerData[i].score} / ${questions.length}`;

            div.appendChild(testerName);
            div.appendChild(testerScore)
            outerDiv.appendChild(div);
        }
        const home = makeEl("a");
        home.setAttribute("href", "index.html");
        home.textContent = "Home";
        home.className = "center-a";

        const topScores = makeEl("h2");
        topScores.textContent = "Top Scores"
        topScores.className = "center"

        mainContainer.appendChild(topScores);
        mainContainer.appendChild(outerDiv);
        mainContainer.appendChild(home);
    }
}

//Quiz begins once you click the "Begin Quiz" button
btnBegin.addEventListener("click", buildTestContainer);

//Event delegation on main container element
container.addEventListener("click", answerClickHandler);
loadTestersScore();