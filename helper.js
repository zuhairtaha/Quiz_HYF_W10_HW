/*
 function getScore(answers, questions) {
    const questionAnswers = questions.map(question => question.options.filter(option => option.correct)[0].content);
    const correctAnswers = answers.filter((answer, i) =>  answer === questionAnswers[i]);

    return correctAnswers.length
}
 */

/**
 * get score
 * @param {array} userInputs
 * @returns {number}
 */
let getScore = (userInputs) => {
    let counter = 0;
    userInputs.forEach(userInput => {
        if (userInput === "true") {
            counter++;
        }
    });
    return counter;
}; 