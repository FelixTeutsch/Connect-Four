const board = document.querySelector('#board');
let currentPlayer = 'Red';

let score = {
    red: 0,
    yellow: 0
}

let player1ScoreDisplay = document.querySelector("#player1-score");
let player2ScoreDisplay = document.querySelector("#player2-score");

window.addEventListener("load", () => {
    loadCurrentPlayer();
    loadScore();
    loadGame();
    player1ScoreDisplay.innerHTML = score.red;
    player2ScoreDisplay.innerHTML = score.yellow;
});

board.addEventListener('click', event => {
    const col = event.target.cellIndex;
    if (col === -1 || col === undefined) {
        return;
    }

    for (let i = board.rows.length - 1; i >= 0; i--) {
        if (!board.rows[i].cells[col].classList.contains('Red') &&
            !board.rows[i].cells[col].classList.contains('Yellow')) {
            board.rows[i].cells[col].classList.add(currentPlayer);
            if (checkForWin(board, col, i)) {
                showWinnerScreen(currentPlayer, false);
            } else if (checkForDraw(board)) {
                showWinnerScreen(currentPlayer, true);
            } else {
                changePlayer();
            }
            break;
        }
    }

});

function changePlayer() {
    board.classList.remove("currentPlayer" + currentPlayer);
    currentPlayer = (currentPlayer === 'Red') ? 'Yellow' : 'Red';
    board.classList.add("currentPlayer" + currentPlayer);
    saveCurrentPlayer();
    saveGame();
}

function checkForWin(board, col, row) {
    const color = board.rows[row].cells[col].className;
    let win = false;

    // check vertical
    win = checkLine(board, col, row, 0, 1, color);
    if (win) {
        return true;
    }

    // check horizontal
    win = checkLine(board, col, row, 1, 0, color) ||
        checkLine(board, col, row, -1, 0, color);
    if (win) {
        return true;
    }

    // check diagonals
    win = checkLine(board, col, row, 1, 1, color) ||
        checkLine(board, col, row, -1, -1, color) ||
        checkLine(board, col, row, 1, -1, color) ||
        checkLine(board, col, row, -1, 1, color);

    return win;
}

function checkLine(board, col, row, colIncrement, rowIncrement, color) {
    let win = 1;
    let i = col + colIncrement, j = row + rowIncrement;

    while (i >= 0 && i < board.rows[0].cells.length &&
        j >= 0 && j < board.rows.length &&
        board.rows[j].cells[i].className === color) {
        win++;
        i += colIncrement;
        j += rowIncrement;
    }

    i = col - colIncrement;
    j = row - rowIncrement;

    while (i >= 0 && i < board.rows[0].cells.length &&
        j >= 0 && j < board.rows.length &&
        board.rows[j].cells[i].className === color) {
        win++;
        i -= colIncrement;
        j -= rowIncrement;
    }

    return win >= 4;
}

function checkForDraw(board) {
    for (let i = 0; i < board.rows[0].cells.length; i++) {
        if (!board.rows[0].cells[i].classList.contains('Red') &&
            !board.rows[0].cells[i].classList.contains('Yellow')) {
            return false;
        }
    }
    return true;
}


let winnerScreen = document.getElementById("winnerScreen");
let winnerMessage = document.getElementById("winnerMessage");
let playAgainButton = document.getElementById("playAgainButton");
let resetScoreButton = document.getElementById("resetScoreButton");

playAgainButton.addEventListener("click", function () {
    winnerScreen.style.display = "none";
    resetBoard();
});

resetScoreButton.addEventListener("click", function () {
    score.red = 0;
    score.yellow = 0;
    player1ScoreDisplay.innerHTML = score.red;
    player2ScoreDisplay.innerHTML = score.yellow;
    saveScore();
});

function showWinnerScreen(player, draw) {
    changePlayer();
    deleteGame();
    winnerScreen.style.display = "flex";
    winnerMessage.innerHTML = "Draw!";
    if (draw)
        return;
    winnerMessage.innerHTML = player + " wins!";

    // Update the score
    // Since player has been swapped, the score has to be added to the other player
    if (currentPlayer === "Yellow") {
        score.red++;
    } else {
        score.yellow++;
    }
    player1ScoreDisplay.innerHTML = score.red;
    player2ScoreDisplay.innerHTML = score.yellow;
    saveScore();
}


function resetBoard() {
    // Reset all cells to be empty
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            board.rows[row].cells[col].classList.remove("Red");
            board.rows[row].cells[col].classList.remove("Yellow");
        }
    }

    // Hide the winner screen
    winnerScreen.style.display = "none";
}


function saveGame() {
    localStorage.setItem("game", JSON.stringify(board.innerHTML));
}

function loadGame() {
    const gameAsString = localStorage.getItem("game");
    if (gameAsString) {
        board.innerHTML = JSON.parse(gameAsString);
        console.log("Game Loaded!");
    }
}

function deleteGame() {
    localStorage.removeItem("game");
}

function saveScore() {
    localStorage.setItem("score", JSON.stringify(score));
}

function loadScore() {
    const scoreAsString = localStorage.getItem("score");
    if (scoreAsString) {
        score = JSON.parse(scoreAsString);
        console.log("Score Loaded!");
    }
}

function saveCurrentPlayer() {
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
}

function loadCurrentPlayer() {
    let dbCurrentPlayer = localStorage.getItem("currentPlayer");
    if (dbCurrentPlayer) {
        currentPlayer = JSON.parse(dbCurrentPlayer);
        console.log("Current Player Loaded!");
    }
}

