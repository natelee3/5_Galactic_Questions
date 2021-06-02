'use strict';

document.addEventListener("DOMContentLoaded", function () {
//Create elements for the select items
const dropdown1 = document.querySelector('#dropdown1');
const button1 = document.querySelector('#button1');
const dropdown2 = document.querySelector('#dropdown2');
const button2 = document.querySelector('#button2');
const dropdown3 = document.querySelector('#dropdown3');
const button3 = document.querySelector('#button3');
const dropdown4 = document.querySelector('#dropdown4');
const button4 = document.querySelector('#button4');
const dropdown5 = document.querySelector('#dropdown5');
const button5 = document.querySelector('#button5');
const characterGuess = document.querySelector('#characterGuess')
const characterGuessButton = document.querySelector('#submitGuess')

const resultsList = document.querySelector('#resultsList')

//Create empty character array
const characterArray = []

//Create question list
const questionArray = [
    ["What is your gender?", "gender"],
    ["What year were you born?", "birth_year"],
    ["What color are your eyes?", "eye_color"],
    ["what color is your hair?", "hair_color"],
    ["How tall are you?", "height"],
    ["How big are you?", "mass"],
    ["What's your homeworld called?", "homeworld"],
    ["What color is your skin?", "skin_color"],
    ["What species are you?", "species"],
    ["Do you have any starships?", "starships"]
]

//Populate first dropdown menu
function updateQuestionDropdown (filteredArray, chosenCharacter) {
    questionArray.forEach(question => {
        const questionOption = document.createElement('option');
        questionOption.value = question[0];
        questionOption.text = question[0];
        dropdown1.appendChild(questionOption);
    })
    listenForQuestions(filteredArray, chosenCharacter)
}

//Listen for user choice on question1, find answer and add to DOM
function listenForQuestions(filteredArray, chosenCharacter) {
    button1.addEventListener('click', function () {
        let selectedIndex = dropdown1.selectedIndex -1
        console.log(selectedIndex)
        console.log(questionArray[selectedIndex][1])
        let answerPrompt = questionArray[selectedIndex][1]
        console.log(chosenCharacter[answerPrompt])
        const answer1 = document.createElement('li')
        answer1.innerText = `My ${answerPrompt} is ${chosenCharacter[answerPrompt]}`
        resultsList.appendChild(answer1)
    })
}


//Populate final dropdown menu
function updateDropdown (filteredArray, chosenCharacter) {
    filteredArray.forEach(item => {
        const characterGuessOption = document.createElement('option')
        characterGuessOption.value = item.name;
        characterGuessOption.text = item.name;
        characterGuess.appendChild(characterGuessOption);
    })
    updateQuestionDropdown(filteredArray, chosenCharacter)
}

//Listen for character guesses, evaluate, and update count
const guessCountElement = document.querySelector('#guessCount');
let guessesRemaining = 5;
guessCountElement.innerHTML = guessesRemaining;
characterGuessButton.addEventListener('click', function() {
    let userGuess = characterGuess.value
    let chosenCharacter = 'Luke Skywalker'
    if (userGuess === chosenCharacter) {
        console.log("You got it!");
    } else {
        console.log("Not quite");
        guessesRemaining -= 1;
        if (guessesRemaining == 0) {
            console.log("Link to failure screen")
        }
        guessCountElement.innerHTML = guessesRemaining;
    }   
})

//Fetch from API and call createCharacterArray function
function getCharacterList () {
    let url = `http://swapi.dev/api/people/`
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            createCharacterArray(data)
        })
        .catch(error => {
            console.error("ERROR", error);
        });
};

//Fetch remaining pages from API and filter array, call chooseRandomCharacter
function createCharacterArray (data) {
    const characters = data.results;
    characters.forEach(function (character) {
        characterArray.push(character)
    })
    if (data.next !== null) {
        fetch(data.next)
        .then(response => {
            return response.json();
        })
        .then(data => {
            createCharacterArray(data)
        })
    } else {
        let filteredArray = characterArray.filter(filterArray)
        chooseRandomCharacter(filteredArray)
    }
}

//Filter the character possibilities to only those who have appeared in more than 2 films
function filterArray (characterArray) {
    if (characterArray.films.length > 2) {
        return true
    }
}

//Select random character (object of the game)
function chooseRandomCharacter (filteredArray) {
    let randomNumber = Math.floor(Math.random()* 23)
    var chosenCharacter = filteredArray[randomNumber]
    console.log(chosenCharacter.name)
    updateDropdown(filteredArray, chosenCharacter)
}

getCharacterList()



});