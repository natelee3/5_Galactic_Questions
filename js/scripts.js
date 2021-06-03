'use strict';

document.addEventListener("DOMContentLoaded", function () {
//Create elements for the select items, outofQuestions message, and resultsList
const dropdown1 = document.querySelector('#dropdown1');
const button1 = document.querySelector('#button1');
const characterGuess = document.querySelector('#characterGuess');
const characterGuessButton = document.querySelector('#submitGuess');
const outofQuestions = document.querySelector('#outOfQuestions');
const resultsList = document.querySelector('#resultsList');

//Create empty character array
const characterArray = [];

//Create question list
const questionArray = [
    ["What is your gender?", "gender", "gender"],
    ["What year were you born?", "birth_year", "birth year"],
    ["What color are your eyes?", "eye_color", "eye color"],
    ["what color is your hair?", "hair_color", "hair color"],
    ["How tall are you?", "height", "height"],
    ["How big are you?", "mass", "weight"],
    ["What's your homeworld called?", "homeworld", "homeworld"],
    ["What color is your skin?", "skin_color", "skin color"],
    ["What species are you?", "species", "species"],
    ["Do you have any starships?", "starships", "starships"]
];

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
        if (characterArray.name !== "Ayla Secura")
            return true
    }
}

//Select random character (object of the game)
function chooseRandomCharacter (filteredArray) {
    let randomNumber = Math.floor(Math.random()* 22)
    var chosenCharacter = filteredArray[randomNumber]
    console.log("Random character is ", chosenCharacter.name)
    updateDropdown(filteredArray, chosenCharacter)
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

//Populate first dropdown menu
function updateQuestionDropdown (filteredArray, chosenCharacter) {
    questionArray.forEach(question => {
        const questionOption = document.createElement('option');
        questionOption.value = question[0];
        questionOption.text = question[0];
        dropdown1.appendChild(questionOption);
    })
    listenForQuestions(filteredArray, chosenCharacter);
    listenForGuesses(filteredArray, chosenCharacter);
};

//Listen for user choice on question1, find answer and add to DOM
function listenForQuestions(filteredArray, chosenCharacter) {
    const questionCountElement = document.querySelector('#questionCount');
    let questionsRemaining = 5;
    questionCountElement.innerHTML = questionsRemaining;
    
    button1.addEventListener('click', function () {
        let selectedIndex = dropdown1.selectedIndex -1
        console.log(selectedIndex)
        console.log(questionArray[selectedIndex][1])
        let answerPrompt = questionArray[selectedIndex][2]
        console.log(chosenCharacter[answerPrompt])
        const answer1 = document.createElement('li')
        if (chosenCharacter[answerPrompt] == undefined ||
            chosenCharacter[answerPrompt].length == 0) {
            answer1.innerText = `I don't have any ${answerPrompt}`
        } else {
            if (selectedIndex == 9) {
                console.log(chosenCharacter[answerPrompt])
                getStarshipName(chosenCharacter[answerPrompt][0])
            } else if (selectedIndex == 6) {
                getPlanetName(chosenCharacter[answerPrompt])
            } else {
                answer1.innerText = `My ${answerPrompt} is ${chosenCharacter[answerPrompt]}`
            }
        }
        if (answer1.innerText != "") {
            resultsList.appendChild(answer1)
        }
        questionsRemaining -= 1;
        if (questionsRemaining == 0) {
            outofQuestions.innerHTML = "You are out of questions. Please make a guess."
            question1.style.visibility = "collapse";
        }
        questionCountElement.innerHTML = questionsRemaining;
    })
}

//Listen for character guesses, evaluate, and update count
function listenForGuesses (filteredArray, chosenCharacter) {
    const guessCountElement = document.querySelector('#guessCount');
    let guessesRemaining = 5;
    guessCountElement.innerHTML = guessesRemaining;

    characterGuessButton.addEventListener('click', function() {
        let userGuess = characterGuess.value;
        console.log("User guessed: ", userGuess);
        if (userGuess === chosenCharacter.name) {
            console.log("You got it!");
            alert("You got it!!!!")
            //link to success screen
        } else {
            const rejection = document.createElement('li');
            rejection.innerText = `Nope! I am not ${userGuess}. Guess again!`;
            resultsList.appendChild(rejection)
            guessesRemaining -= 1;
            if (guessesRemaining == 0) {
                console.log("Link to failure screen")
                alert("You have failed!")
            }
            guessCountElement.innerHTML = guessesRemaining;
        }   
    })
}

function getStarshipName (url) {
    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        const answer1 = document.createElement('li')
        answer1.innerText = `I have a starship named ${data["name"]}`
        resultsList.appendChild(answer1)
    })
}

function getPlanetName (url) {
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const answer1 = document.createElement('li')
            answer1.innerText = `My homeworld is called ${data["name"]}`
            resultsList.appendChild(answer1)
        })
}

getCharacterList()

});