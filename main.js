console.log('Script loaded');

//const quizUrl = 'https://gist.githubusercontent.com/benna100/c9c38faebea1526fb4e6b6b896a1dc94/raw/8bcaf89d7ed704ff1c0e3f2efa229369ed4dd0a2/quiz-testing.json';
const quizUrl = 'https://gist.githubusercontent.com/benna100/13f5850bf78f59d9baea915cbbe9f258/raw/f2007724dcc126772ec2154af49ef04cd145cb79/JS-3%2520quiz';
let confetti;

fetch(quizUrl)
    .then((data) => {
            document.querySelector('.loading').style.display = 'none';
            return data.json();
        }
    ).then(quizDataFromApi => {
    renderQuiz(quizDataFromApi.quiz.questions);
});


/**
 * Render the questions with the title and the content in a li element and append these questions to the ul.
 * Inside of the individual li elements add the select tag with the given options for the question.
 * @param {array} questions
 */
let renderQuiz = (questions) => {
    let ul = document.querySelector('.questions');
    let ulContent = '';

    questions.forEach(question => {

        ulContent += `<li>
                        <h3>${question.title}</h3>
                        <p>${question.content}</p>
                        <p>${renderOptions(question.options)}</p>
                        </li>`;


    });
    ul.innerHTML = ulContent;

};

/**
 * render options
 * @param {array} options
 */
let renderOptions = options => {
    let res = '<select>';
    options.forEach((options) => {
        res += `<option data-correct="${options.correct}">${options.content}</option>`;
    });
    res += '</select><p class="correction"></p>';
    return res;
};

function stylizeInputs(questionSelect, userInput) {
    let _this = questionSelect;
    let p = document.createElement('p');
    p.innerText='test';
    _this.appendChild(p);

    if (userInput === 'false') {
        _this.style.border = 'solid red';
    }
    else {
        _this.style.border = 'solid green';
    }
}

/**
 * get data-correct value of all selected answers
 * @returns {Array}
 */
function getUserInput() {
    let userInputs = [];
    let userInput = '';
    document.querySelectorAll('select').forEach(function (questionSelect) {
        userInput = questionSelect.options[questionSelect.selectedIndex].dataset.correct;
        stylizeInputs(questionSelect, userInput);

        userInputs.push(userInput);
    });
    return userInputs;
}

/**
 * render results
 * @param {number} score number of correct answers
 * @param {number} count number of all answers
 */
function renderResults(score, count) {
    document.querySelector('.result').innerHTML = `you got ${score}/${count} correct`;
    // show confetti
    if (score === count) {
        confetti = new ConfettiGenerator({target: 'confetti'});
        confetti.render();
    }
    else {
        confetti.clear();

    }
}

document.querySelector('#sendAnswers').addEventListener('click', (e) => {
    e.preventDefault();
    let userInputs = getUserInput();
    let score = getScore(userInputs);
    renderResults(score, userInputs.length);


});