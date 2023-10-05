const resultDiv = document.querySelector('div.result');
const buttonsDiv = document.querySelector('div.buttons');
const playButton = document.querySelector('#play');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
let playerWins = 0;
let computerWins = 0;

function getComputerChoice() {
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    let random_num = Math.floor(Math.random() * 3);
    return choices[random_num];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    if (playerSelection === computerSelection) {
        resultDiv.textContent = "It's a tie!";
        return;
    }
    if (playerSelection === "ROCK") {
        if (computerSelection === "SCISSORS") {
            resultDiv.textContent = "You Win! Rock beats Scissors.";
            playerScoreElement.textContent = ++playerWins;
            return;
        } else {
            resultDiv.textContent = "You Lose! Paper beats Rock.";
            computerScoreElement.textContent = ++computerWins;
            return;
        }
    }
    if (playerSelection === "PAPER") {
        if (computerSelection === "ROCK") {
            resultDiv.textContent = "You Win! Paper beats Rock.";
            playerScoreElement.textContent = ++playerWins;
            return;
        } else {
            resultDiv.textContent = "You Lose! Scissors beats Paper.";
            computerScoreElement.textContent = ++computerWins;
            return;
        }
    } else {
        if (computerSelection === "PAPER") {
            resultDiv.textContent = "You Win! Scissors beats Paper.";
            playerScoreElement.textContent = ++playerWins;
            return;
        } else {
            resultDiv.textContent = "You Lose! Rock beats Scissors.";
            computerScoreElement.textContent = ++computerWins;
            return;
        }
    }
}

function createButtons() {
    const rockButton = document.createElement("button");
    const paperButton = document.createElement("button");
    const scissorsButton = document.createElement("button");
    rockButton.id = "rock";
    rockButton.textContent = "Rock";
    paperButton.id = "paper";
    paperButton.textContent = "Paper";
    scissorsButton.id = "scissors";
    scissorsButton.textContent = "Scissors";
    buttonsDiv.appendChild(rockButton);
    buttonsDiv.appendChild(paperButton);
    buttonsDiv.appendChild(scissorsButton);
}

function isGameOver() {
    return playerWins === 5 || computerWins === 5;
}

function endGame(buttons) {
    const endMessage = document.createElement('p');
    const scoreDiv = document.querySelector('.score');
    if (playerWins === 5) {
        endMessage.textContent = "Congrats, you beat the Computer!";
        endMessage.setAttribute('style', 'font-weight: bold; font-size: 20px;');
        scoreDiv.appendChild(endMessage);
    } else if (computerWins === 5) {
        endMessage.textContent = "Sorry, but the Computer won.";
        endMessage.setAttribute('style', 'font-weight: bold; font-size: 20px');
        scoreDiv.appendChild(endMessage);
    }
    buttons.forEach((button) => {
        button.remove();
    });
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again?";
    buttonsDiv.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', () => location.reload());
}

function playGame() {
    playButton.remove();
    createButtons();
    const buttons = document.querySelectorAll('div.buttons button');
    buttons.forEach((button) => {
        button.addEventListener('click', function() {
            playRound(button.id, getComputerChoice());
            if (isGameOver()) {
                endGame(buttons);
            }
        });
    });
}

playButton.addEventListener('click', playGame);