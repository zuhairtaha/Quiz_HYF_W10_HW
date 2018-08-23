// hide loading... when data fetched successfully
let hideLoading = () => {
    document.querySelector('.loading').style.display = 'none';
};

// --------------------------
/**
 * add active class to current question in questions menu
 * @param {number} currentQuestionNumber
 */
let activeCurrentQuestion = currentQuestionNumber => {
    document.querySelectorAll('#questionsList li').forEach(question => {
        const questionClasses = question.classList;
        if (question.id === `question-${currentQuestionNumber}`) {
            questionClasses.add('active');
        } else {
            questionClasses.remove('active');
        }
    })
};

// --------------------------
/**
 * Hide All Questions
 */
let hideAllQuestions = () => {
    document
        .querySelector('.questions')
        .querySelectorAll('.questionDiv')
        .forEach(question => question.style.display = 'none');
};

// --------------------------
let confettiStart = () => {
    if (score === totalQuestionsCount) {
        let confetti = new ConfettiGenerator({target: 'confetti'});
        confetti.render();
    }
};

// --------------------------
/**
 * Restart timer
 */
let restartTimer = () => {
    // start timer
    timer = new Timer(document.querySelector('canvas'));
    timer.timerRun();
};
// --------------------------
let readQuestion = questionIndex => {
    let text = document.querySelector(`#question-${questionIndex} > div.question-title > span`).innerHTML;
    let questionTitle = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(questionTitle);

};
// --------------------------
/**
 * hide all questions rendered except the question has id equal to question-{currentQuestionIndex}
 * @param {number} currentQuestionIndex
 */
let showQuestion = currentQuestionIndex => {

    // if this is the last question
    if (totalQuestionsCount === currentQuestionIndex) {
        document.querySelector('#start-again').style.display = 'block';
        hideAllQuestions();
        confettiStart();
        return;
    }

    document
        .querySelector('.questions')
        .querySelectorAll('.questionDiv')
        .forEach(question => {
            question.style.display = question.id === 'question-' + currentQuestionIndex ? 'block' : 'none';
        });
    activeCurrentQuestion(currentQuestionIndex);
    readQuestion(currentQuestionIndex);
    restartTimer();
};

// --------------------------
/**
 * the list of questions, current question, the balance foreach one of them
 * @param {Array} questions
 */
let renderQuestionsList = questions => {
    let content = '';
    questions.forEach((question, index) => {
        content += `<li id="question-${index}">
                        <span>${question.title}</span>
                     </li>`;
    });
    document.querySelector('#questionsList').innerHTML = content;
    // show total number of questions
    totalQuestionsCount = questions.length;
    document.querySelector('#totalQuestionsCount').innerHTML = totalQuestionsCount;

    hideAllQuestions();
};

// --------------------------
/**
 * the label user clicked on it
 * @param {number} questionNumber
 * @returns {Element}
 */
let getCorrectAnswerLabel = questionNumber => {
    const correctAnswerInputRadioId = document.querySelector(`#question-${questionNumber} input[data-correct="true"]`).id;
    return document.querySelector(`label[for="${correctAnswerInputRadioId}"]`);
};

// --------------------------
/**
 * background (green flashing) at correct answer
 * @param questionNumber
 */
let highlightCorrectAnswer = questionNumber => {
    const correctAnswerLabel = getCorrectAnswerLabel(questionNumber);
    correctAnswerLabel.classList.add('green-pulsing');
};

// --------------------------
/**
 * if the user answer if incorrect set red color as a background for selected answer
 * @param {Element} userAnswer
 */
let highlightUserAnswer = userAnswer => {
    const userAnswerLabel = document.querySelector(`label[for="${userAnswer.id}"]`);
    userAnswerLabel.style.backgroundColor = '#C13530';
};

// --------------------------
/**
 * increment and update rendered results
 * @param number
 */
let updateScore = number => {
    score += number;
    document.querySelector('#currentResult').innerHTML = score;
};

// --------------------------
/**
 * set a line through question title in the questions menu if it is false and vise versa
 * @param {number} questionNumber
 * @param {string} isUserAnswerCorrect
 */
let lineThroughQuestion = (questionNumber, isUserAnswerCorrect) => {
    const currentQuestionClasses = document.querySelector(`#question-${questionNumber}`).classList;
    if (isUserAnswerCorrect === 'false' || isUserAnswerCorrect === 'timesUp') {
        currentQuestionClasses.add('line-through');
    }
    else {
        currentQuestionClasses.remove('line-through');
    }
};

// --------------------------
/**
 * trigger bootstrap modal after modify it content
 * @param {String} isCorrect true,false,or timesUp
 */
let showAlertModal = isCorrect => {
    timer.timerRun = false;
    const alertTitle = document.querySelector('#alert-title');
    const alertBody = document.querySelector('#alert-body');

    if (isCorrect === 'false') {
        alertTitle.innerHTML = 'Incorrect!';
        playSound('wrong');
    } else if (isCorrect === 'true') {
        alertTitle.innerHTML = 'Correct';
        playSound('correct');
    } else if (isCorrect === 'timesUp') {
        alertTitle.innerHTML = 'Times up';
        playSound('wrong');
    }
    alertBody.innerHTML = `<img src='img/${isCorrect}.jpg'/>`;


    $('#alert-modal').modal('show');
};

// --------------------------
/**
 * check the selected answer
 * @param {Element} userAnswer
 */
let checkUserAnswer = userAnswer => {
    const question = userAnswer.id.match(/\d/g)[0];
    const isCorrect = userAnswer.dataset.correct;


    highlightCorrectAnswer(question);
    lineThroughQuestion(question, isCorrect);

    if (isCorrect === 'false') {
        highlightUserAnswer(userAnswer);
    }
    else {
        updateScore(1);
    }
    showAlertModal(isCorrect);
};

// --------------------------
/**
 * Render the questions with the title and the content in a li element and append these questions to the list.
 * Inside of the individual li elements add the select tag with the given options for the question.
 * @param {array} questions
 */
let renderQuiz = (questions) => {
    let list = document.querySelector('.questions');
    let questionsListContent = '';

    questions.forEach((question, index) => {

        questionsListContent += `<div class="questionDiv" id="question-${index}">
                                        <div class="question-title pt-md-4 pb-md-4">
                                            <h4>${question.title}</h4>
                                            <span>${question.content}</span>
                                        </div>
                                        <div class="row">${renderOptions(question.options, index)}</div>
                                    </div>`;

    });
    list.innerHTML = questionsListContent;
    listenToUserAnswers(list);

};

// --------------------------
/**
 * render options
 * @param {array} options
 * @param {number} questionIndex
 */
let renderOptions = (options, questionIndex) => {
    let res = '';
    options.forEach((option, optionIndex) => {

        res += `<div class="col-lg-6 mb-2">
                  <input hidden="hidden" 
                    type="radio" 
                    id="question-${questionIndex}-option-${optionIndex}" 
                    data-correct="${option.correct}" >
                  <label class="btn btn-option btn-block ripple" 
                    for="question-${questionIndex}-option-${optionIndex}"> ${option.content} </label>
                </div>`;
    });
    return res;
};