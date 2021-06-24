# 5 Question Galactic Trivia
A front-end web application in the form of the popular party game "20 Questions," incorporating the Star Wars API (SWAPI).

## Overview
When the site loads, a random Star Wars character is selected. The user can attempt to guess their identity by asking up to five questions and making five guesses.

## What We Used
### Languages:
- HTML5
- CSS
- JavaScript

### APIs
-Star Wars API
 
## Screenshots
![5 Question Galatic Trivia Screenshot](https://github.com/natelee3/5_Galactic_Questions/blob/js/images/screenshot.png)

## Features
- "Ask me Questions" populates 10 question choices from the http://swapi.dev/api/people/ endpoint
- "Guess my Character" populates a filtered array of only characters who have appeared in more than two Star Wars films (also taken from the above endpoint).
- Questions and guesses remaining increment down with each push of the respective submit button.
- The main title uses a CSS glow animation that we're very proud of.

## Future Improvements
- Right now, the success/failure messages are just alerts. We'd like to create full success/failure pages and display a card of information on the mystery character.
- There are a few characters with too many undefined characteristics for the user to pick up on who they are. Given more time, we could sort them out or possibly help SWAPI fill in some of the missing information

## How to Use
To clone this application, you will need Git installed on your computer. To play the game, run the following in the command line:

```bash

    # Clone this repository
    $ git clone https://github.com/natelee3/5_galactic_questions.git

    # Go into the directory
    $ cd 5_galactic_questions

    # Open in browser
    $ open index.html

```

## Group

- <a href="https://github.com/Dannyagg">Daniel Agbenu</a>

- <a href="https://github.com/brittany-fisher21">Brittany Fisher</a>

- <a href="https://github.com/natelee3">Nate Lee</a>

- <a href="https://github.com/naldridge">Nick Aldridge</a>