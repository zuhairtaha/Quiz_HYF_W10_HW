"use strict";
// const QUIZ_URL =
// 'https://gist.githubusercontent.com/benna100/c9c38faebea1526fb4e6b6b896a1dc94/raw/8bcaf89d7ed704ff1c0e3f2efa229369ed4dd0a2/quiz-testing.json';
const QUIZ_URL = 'https://gist.githubusercontent.com/benna100/13f5850bf78f59d9baea915cbbe9f258/raw/f2007724dcc126772ec2154af49ef04cd145cb79/JS-3%2520quiz';
let confetti;
/**@link https://github.com/Agezao/confetti-js/ **/
let currentQuestionIndex = 0; // current question index
let totalQuestionsCount = 0; // count of all questions
let score = 0; // user score
let timer; // timers deceleration

// --------------------------
/**
 * play audio file
 * @param {string} trackName
 */
function playSound(trackName) {
    document.querySelector('.audio').innerHTML =
        `<audio controls autoplay id="audio-example"> <source src="mp3/${trackName}.mp3"> </audio>`;
}

// --------------------------
/**
 * click on start button
 */
document.querySelector('#start').addEventListener('click', function (e) {
    e.preventDefault();
    e.target.style.display = 'none';
    showQuestion(0);
});

// --------------------------
// fetch json data
fetch(QUIZ_URL)
    .then(data => {
        hideLoading();
        return data.json();
    })
    .then(quizDataFromApi => {
        const questions = quizDataFromApi.quiz.questions;
        renderQuiz(questions);
        renderQuestionsList(questions);
    });

// --------------------------
/**
 * next question button (appears at alerts footer)
 */
document.querySelector('#next-question').addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
});

// --------------------------
/**
 * when the user select an answer
 * @param {Element} list
 */
function listenToUserAnswers(list) {
    list.querySelectorAll('.questionDiv input[type=radio]').forEach(function (question) {
        question.addEventListener('click', function () {
            checkUserAnswer(this);
        })
    })
}