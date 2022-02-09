const container = document.querySelector("#main");
const mainContainer = document.querySelector("#main-container");
const btnBegin = document.querySelector("#begin-btn");

let questionCount = 0;

const options = ["a", "b", "c", "d"];

const questions = [
    {
        id: 0,
        question: "Often used data types do not include:",
        awensers: ["Boolean", "Alert", "Number", "String"],
        correct: "b"
    },
    {
        id: 1,
        question: "What is 5 + 5",
        awensers: ["7", "5", "6", "10"],
        correct: "d"
    }
]

const makeEl = function(el, classN, idName){
    if(!classN && !idName){
        const element = document.createElement(el);
        return element;
    }

    else if(!idName){
        const element = document.createElement(el);
        element.className = classN;
        return element;
    }

    else{
        const element = document.createElement(el);
        element.className = classN;
        element.id = idName
        return element;
    }
}



//On button press, build out quize
const buildContainer = function(questionCount){
    mainContainer.remove();
    //create container, time, and score elements
    const containerEl = makeEl("div", "container", "main-container");
    const headerEl = makeEl("div", "header");
    const scoreEl = makeEl("div", "to-scores");
    scoreEl.innerHTML = `<h3>View Scores</h3>`
    const timeEl = makeEl("div", "time"); 
    timeEl.innerHTML = "<span>Time:</span>"

    //Append elements to page
    headerEl.appendChild(scoreEl);
    headerEl.appendChild(timeEl);
    containerEl.appendChild(headerEl)
    container.appendChild(containerEl);

    //removes subsequent questions to make new ones
    if(questionCount > 0){
        quizeBodyEl.remove();
    }

    const quizeBodyEl = makeEl("div", "quiz-body");
    const questionEl = makeEl("div", "question");
    questionEl.setAttribute("data-question", questionCount);
    questionEl.innerHTML = "<p>Often used data types do not include:</p>";
    const answerEl = makeEl("div", "answers");

    quizeBodyEl.appendChild(questionEl);
    quizeBodyEl.appendChild(answerEl);
    containerEl.appendChild(quizeBodyEl);

    for(let i = 0; i < options.length; i++){
        let pEl = makeEl("p");
        pEl.setAttribute("data-answer", options[i]);
        pEl.innerHTML = `<span class='letters'>${options[i].toUpperCase()}:</span> ${questions[questionCount].awensers[i]}`
        answerEl.appendChild(pEl)
    }

    questionCount++

}

const startQuiz = function(){
    buildContainer(questionCount);

}

const checkAwnser = function(e){
    if(e.target.getAttribute("data-answer")){
        const choice = e.target.getAttribute("data-answer");
        if(choice == questions[questionCount].correct){
            alert("Good choice")
         }
        else{
            alert("Try again");
        }
    }
}


btnBegin.addEventListener('click', startQuiz);

container.addEventListener('click', checkAwnser);

//just added event listener for container. Make function to react to correct awenser click