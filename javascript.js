// Your JavaScript goes here!
var playerScore = 0;
var computerScore = 0;
var round = 1;

const roundText = document.getElementById("roundText");
const userScore = document.getElementById("userScore");
const oppponentScore = document.getElementById("opponentScore");

setup();

function setup() {
    roundText.textContent = `Round ${round}`;
    userScore.textContent = playerScore;
    oppponentScore.textContent = computerScore;
}

function updateScores() {
    if (round == 5) {
        round--;
        if (playerScore > computerScore) {
            console.log("You Win! Final Score is: " + playerScore + " to " + computerScore);
        } else {
            console.log("You Lose! Final Score is: " + playerScore + " to " + computerScore);
        }
        endGame();
    }
    round++;
    roundText.textContent = `Round ${round}`;
    userScore.textContent = playerScore;
    oppponentScore.textContent = computerScore;
}

function endGame() {
    let buttons = document.getElementById("btnRock");
    buttons.classList.add("transparent");
    buttons.disabled = true;

    buttons = document.getElementById("btnPaper");
    buttons.classList.add("transparent");
    buttons.disabled = true;

    buttons = document.getElementById("btnScissors");
    buttons.classList.add("transparent");
    buttons.disabled = true;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    setup();
}

function computerPlay() {
    let result;
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            result = "rock";
            break;
        case 1:
            result = "paper";
            break;
        case 2:
            result = "scissors";
            break;
    }
    return result;
}

function playRound(playerSelection, computerSelection) {
    let player = playerSelection.toLowerCase();
    let computer = computerSelection.toLowerCase();
    let result;
    const opponentImage = document.getElementById("opponentImage");
    if (player == computer) {
        switch (player) {
            case "rock":
                myStopFunction(0);
                break;
            case "paper":
                myStopFunction(1);
                break;
            case "scissors":
                myStopFunction(2);
                break;
        }
        updateScores();
        console.log("It's a Tie!");
    } else {
        switch (player) {
            case "paper":
                if (computer == "rock") {
                    myStopFunction(0);
                    console.log("You Win! " + player + " beats " + computer);
                    playerScore++;
                    break;
                } else { //Scissors
                    myStopFunction(2);
                    console.log("You Lose! " + player + " loses to " + computer);
                    computerScore++;
                    break;
                }
            case "rock":
                if (computer == "scissors") {
                    myStopFunction(2);
                    console.log("You Win! " + player + " beats " + computer);
                    playerScore++;
                    break;
                } else { //Paper
                    myStopFunction(1);
                    console.log("You Lose! " + player + " loses to " + computer);
                    computerScore++;
                    break;
                }
            case "scissors":
                if (computer == "paper") {
                    myStopFunction(1);
                    console.log("You Win! " + player + " beats " + computer);
                    playerScore++;
                    break;
                } else { // Rock
                    myStopFunction(0);
                    console.log("You Lose! " + player + " loses to " + computer);
                    computerScore++;
                    break;
                }
        }
        updateScores();
    }
}

// Images for Opponent
const images = ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rock-paper-scissors_%28rock%29.png/1280px-Rock-paper-scissors_%28rock%29.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/1280px-Rock-paper-scissors_%28paper%29.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/1280px-Rock-paper-scissors_%28scissors%29.png"]

// Interval for cycling through images
const opponentImage = document.getElementById("opponentImage");
var i = 0;
var swapInterval = setInterval(function () {
    opponentImage.style.backgroundImage = "url(" + images[i] + ")";
    i = i + 1;
    if (i == images.length) {
        i = 0;
    }
}, 100);

// Stopping image interval
function myStopFunction(rockPaperScissors) {
    clearInterval(swapInterval);
    opponentImage.style.backgroundImage = "url(" + images[rockPaperScissors] + ")";
}

// Getting clicks from User
function buttonClicked(e) {
    const button = document.getElementById(e.target.id);
    //button.classList.add("glowing-border");
    console.log(button.id);
    switch (button) {
        case btnRock:
            playRound("rock", computerPlay());
            break;
        case btnPaper:
            playRound("paper", computerPlay());
            break;
        case btnScissors:
            playRound("scissors", computerPlay());
            break;
    }
}

// Event listener for buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", buttonClicked));
const reset = document.getElementById("reset");
reset.addEventListener("click", resetGame);
