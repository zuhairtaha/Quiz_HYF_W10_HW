# The fantastical, funny, weird, superduper and awesome HYF quiz

Today we are going to be creating an interactive quiz tool! So what is an interactive quiz tool? Well its an interactive webapp where users can answer questions and see how well they did. 

You will in pairs you will create the quiz tool using all the cool skills you have learned in all of the javascript classes. Now is your time to shine :D

## The task

### The html file
You will use the html file i have already written. It has some styles, a js file that has a helper function a confetti library and a main.js where you will be writing your javascript. 
The html contains a some different tags. The ones you will be working with are the following:
* The p tag will the class loading
* The ul tag with the class questions
* The button inside the form
* The canvas tag with the class confetti

### The main.js file
The quiz data you will get from this url: https://gist.githubusercontent.com/benna100/c9c38faebea1526fb4e6b6b896a1dc94/raw/8bcaf89d7ed704ff1c0e3f2efa229369ed4dd0a2/quiz-testing.json

#### Remove the loading p tag
When we have fetched the data remove the loading p tag.

#### Render the questions
A quiz will have question objects. The question object contains the following properties: Title, content, options and difficulty. The title, content and options properties should be displayed inside a li and the li element should be appended to the ul with the class questions. 

Okay, so far so good. Now for the user to actually answer the individual questions we use the options array inside the question object. For the user to actually choose an option for a question use a select tag. See how the select tag works here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select

So now we have the questions rendered in a list and the user can select an option for each question that he thinks is the right answer, AWESOME!

#### Show the score
The last thing a user needs to be able to do is get his score. So when a user clicks the button inside of the form we should show how many question he got right out of the total number of questions like this: "Congratulations you got 5/7 question right, well done". 
To help with calculating the score you can use a function i created called getScore. 
getScore takes two parameters: An array called answers and an array called questions. The questions array is just the array you get from the json files questions property.
With the given answers and the given questions array the function will return how many question were correct.
Here is an example of how to use it:
```js
const answers = ['Ham (incorrect)', 'here (correct)'];
const score = getScore(answers, quizDataFromApi.quiz.questions);
console.log(score); // logs 1
```

Off course you are more than welcome to write this yourself aswell.

To really show the user how well he did lets add in some confetti.
To see how the confetti library (i already loaded) works look here: https://github.com/Agezao/confetti-js

### Requirements
* When data fetched remove the loading p tag
* Render the questions in a list with the options rendered in a select tag
* When the user clicks the button, calculate the score. Render this score to the user and show some confetti 🎉

## Recomended order of implementation
You can off course write the code in the order you want to, but here is a suggestion:
1. Render the questions with the title and the content in a li element and append these questions to the ul.
2. Inside of the individual li elements add the select tag with the given options for the question.
3. Add a click listener to the button. When a user clicks it just log out 'user clicked button'.
4. When a user clicks the button get the answers he has chosen in an array. To get the text off a selected select tag google or ask the mentors :)
5. Get the score using the function i have created.
6. Render the score to the user



If you have any questions please ask and if you have more time try adding extra features like. 
* Let the user choose what difficulty the rendered questions should be. 
* Dependent on the score a user gets, show specific text to that user. 
* And be creative!!!11!!

That should be it :)

