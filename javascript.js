// Your JavaScript goes here!
var playerScore = 0;
var computerScore = 0;
var tiedScore = 0;
var round = 1;

const roundText = document.getElementById("roundText");
const userScore = document.getElementById("userScore");
const oppponentScore = document.getElementById("opponentScore");
const tieScore = document.getElementById("tiedScore");

setup();

function setup() {
    roundText.textContent = `Round ${round}`;
    userScore.textContent = playerScore;
    oppponentScore.textContent = computerScore;
    tieScore.textContent = tiedScore;
    timer();
}

function updateScores() {
    if (round == 5) {
        if (playerScore > computerScore) {
            console.log("You Win! Final Score is: " + playerScore + " to " + computerScore);
            userScore.textContent = playerScore;
            oppponentScore.textContent = computerScore;
            tieScore.textContent = tiedScore;
            let node = document.createElement("li");
            let textNode = document.createTextNode("You Win! Final Score is: " + playerScore + " to " + computerScore);
            node.appendChild(textNode);
            document.getElementById("resultList").appendChild(node);
            showResetButton();
        } else if (playerScore < computerScore) {
            console.log("You Lose! Final Score is: " + playerScore + " to " + computerScore);
            userScore.textContent = playerScore;
            oppponentScore.textContent = computerScore;
            tieScore.textContent = tiedScore;
            let node = document.createElement("li");
            let textNode = document.createTextNode("You Lose! Final Score is: " + playerScore + " to " + computerScore);
            node.appendChild(textNode);
            document.getElementById("resultList").appendChild(node);
            showResetButton();
        } else {
            console.log("Tie! Final Score is: " + playerScore + " to " + computerScore);
            userScore.textContent = playerScore;
            oppponentScore.textContent = computerScore;
            tieScore.textContent = tiedScore;
            let node = document.createElement("li");
            let textNode = document.createTextNode("Tie! Final Score is: " + playerScore + " to " + computerScore);
            node.appendChild(textNode);
            document.getElementById("resultList").appendChild(node);
            showResetButton();
        }
        endGame();
    } else {
        userScore.textContent = playerScore;
        oppponentScore.textContent = computerScore;
        tieScore.textContent = tiedScore;
        endGame();
        setTimeout(function () {
            resumeGame();
            clearInterval(swapInterval);
            let userImage = document.getElementById("userImage");
            userImage.style.backgroundImage = "none";
            timer();
            round++;
            roundText.textContent = `Round ${round}`;
        }, 2000);
    }
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

function resumeGame() {
    let buttons = document.getElementById("btnRock");
    buttons.classList.remove("transparent");
    buttons.disabled = false;

    buttons = document.getElementById("btnPaper");
    buttons.classList.remove("transparent");
    buttons.disabled = false;

    buttons = document.getElementById("btnScissors");
    buttons.classList.remove("transparent");
    buttons.disabled = false;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tiedScore = 0;
    round = 1;
    clearInterval(swapInterval);
    let userImage = document.getElementById("userImage");
    userImage.style.backgroundImage = "none";
    let history = document.getElementById("resultList");
    history.textContent = "";
    let results = document.getElementById("results");
    results.removeChild(results.lastChild);
    setup();
    resumeGame();
}

function showResetButton() {
    let results = document.getElementById("results");
    let resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.classList.add("reset");
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener('click', resetGame);
    results.appendChild(resetBtn);
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
    if (player == computer) {
        switch (player) {
            case "rock":
                myStopFunction(0);
                roundMessageTied(round, 0, 0);
                tiedScore++;
                break;
            case "paper":
                myStopFunction(1);
                roundMessageTied(round, 1, 1);
                tiedScore++;
                break;
            case "scissors":
                myStopFunction(2);
                roundMessageTied(round, 2, 2);
                tiedScore++;
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
                    roundMessageWin(round, 1, 0);
                    playerScore++;
                } else { //Scissors
                    myStopFunction(2);
                    console.log("You Lose! " + player + " loses to " + computer);
                    roundMessageLost(round, 1, 2);
                    computerScore++;
                }
                break;
            case "rock":
                if (computer == "scissors") {
                    myStopFunction(2);
                    console.log("You Win! " + player + " beats " + computer);
                    roundMessageWin(round, 0, 2);
                    playerScore++;
                } else { //Paper
                    myStopFunction(1);
                    console.log("You Lose! " + player + " loses to " + computer);
                    roundMessageLost(round, 0, 1);
                    computerScore++;
                }
                break;
            case "scissors":
                if (computer == "paper") {
                    myStopFunction(1);
                    console.log("You Win! " + player + " beats " + computer);
                    roundMessageWin(round, 2, 1);
                    playerScore++;
                } else { // Rock
                    myStopFunction(0);
                    console.log("You Lose! " + player + " loses to " + computer);
                    roundMessageLost(round, 2, 0);
                    computerScore++;
                }
                break;
        }
        updateScores();
    }
}

// Round Winning Message
function roundMessageWin(round, userChoice, opponentChoice) {
    let div = document.createElement("div");
    div.classList.add("resultMargin");

    let node = document.createElement("li");
    node.textContent = (`Round ${round}: Win`);

    let user = document.createElement("img");
    user.src = images[userChoice];
    user.classList.add("userImageResult");

    let text = document.createElement("span");
    text.textContent = " vs. ";

    let opponent = document.createElement("img");
    opponent.src = images[opponentChoice];
    opponent.classList.add("userImageResult");

    div.appendChild(node);
    div.appendChild(user);
    div.appendChild(text);
    div.appendChild(opponent);
    document.getElementById("resultList").appendChild(div);
}

// Round Losing Message
function roundMessageLost(round, userChoice, opponentChoice) {
    let div = document.createElement("div");
    div.classList.add("resultMargin");

    let node = document.createElement("li");
    node.textContent = (`Round ${round}: Lost`);

    let user = document.createElement("img");
    user.src = images[userChoice];
    user.classList.add("userImageResult");

    let text = document.createElement("span");
    text.textContent = " vs. ";

    let opponent = document.createElement("img");
    opponent.src = images[opponentChoice];
    opponent.classList.add("userImageResult");

    div.appendChild(node);
    div.appendChild(user);
    div.appendChild(text);
    div.appendChild(opponent);
    document.getElementById("resultList").appendChild(div);
}

// Round Tied Message
function roundMessageTied(round, userChoice, opponentChoice) {
    let div = document.createElement("div");
    div.classList.add("resultMargin");

    let node = document.createElement("li");
    node.textContent = (`Round ${round}: Tied`);

    let user = document.createElement("img");
    user.src = images[userChoice];
    user.classList.add("userImageResult");

    let text = document.createElement("span");
    text.textContent = " vs. ";

    let opponent = document.createElement("img");
    opponent.src = images[opponentChoice];
    opponent.classList.add("userImageResult");

    div.appendChild(node);
    div.appendChild(user);
    div.appendChild(text);
    div.appendChild(opponent);
    document.getElementById("resultList").appendChild(div);
}

// Array for Rock, Paper, and Scissors
const images = ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rock-paper-scissors_%28rock%29.png/1280px-Rock-paper-scissors_%28rock%29.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/1280px-Rock-paper-scissors_%28paper%29.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/1280px-Rock-paper-scissors_%28scissors%29.png"
]

// Interval for cycling through images
const opponentImage = document.getElementById("opponentImage");
var swapInterval;

function timer() {
    var i = 0;
    swapInterval = setInterval(function () {
        opponentImage.style.backgroundImage = "url(" + images[i] + ")";
        i = i + 1;
        if (i == images.length) {
            i = 0;
        }
    }, 100);
}


// Stopping image interval
function myStopFunction(rockPaperScissors) {
    clearInterval(swapInterval);
    opponentImage.style.backgroundImage = "url(" + images[rockPaperScissors] + ")";
}

// Getting clicks from User
function buttonClicked(e) {
    let userImage = document.getElementById("userImage");
    let button = document.getElementById(e.target.id);
    //button.classList.add("glowing-border");
    console.log(button.id);
    switch (button) {
        case btnRock:
            playRound("rock", computerPlay());
            userImage.style.backgroundImage = "url(" + images[0] + ")";
            break;
        case btnPaper:
            playRound("paper", computerPlay());
            userImage.style.backgroundImage = "url(" + images[1] + ")";
            break;
        case btnScissors:
            playRound("scissors", computerPlay());
            userImage.style.backgroundImage = "url(" + images[2] + ")";
            break;
    }
}

// Event listener for buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", buttonClicked));
// const reset = document.getElementById("reset");
// reset.addEventListener("click", resetGame);