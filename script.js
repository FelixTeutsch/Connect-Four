const board = document.querySelector('#board');
let currentPlayer = 'Red';
// True if there is relevant data on the LocalDB
let gameLoaded = false;
let score = {
    red: 0,
    yellow: 0
}

let player1ScoreDisplay = document.querySelector("#redScore");
let player2ScoreDisplay = document.querySelector("#yellowScore");

board.addEventListener('click', event => {
    // Get Position of click
    const col = event.target.cellIndex;
    if (col === -1 || col === undefined) {
        return;
    }

    // Go through the board, from the bottom, and find the first emty cell and chang it's color
    for (let i = board.rows.length - 1; i >= 0; i--) {
        if (!board.rows[i].cells[col].classList.contains('Red') &&
            !board.rows[i].cells[col].classList.contains('Yellow')) {
            board.rows[i].cells[col].classList.add(currentPlayer);
            // Check if player has won
            if (checkForWin(board, col, i))
                showWinnerScreen(currentPlayer, false);
            // Else check if field is full
            else if (checkForDraw(board))
                showWinnerScreen(currentPlayer, true);
            // Else let the next player go
            else
                changePlayer();

            // Break out of loop to make code more efficient
            break;
        }
    }

});

// Swap player after every move
function changePlayer() {
    board.classList.remove("currentPlayer" + currentPlayer);
    currentPlayer = (currentPlayer === 'Red') ? 'Yellow' : 'Red';
    board.classList.add("currentPlayer" + currentPlayer);
    saveCurrentPlayer();
    saveGame();
}

// 
function checkForWin(board, col, row) {
    // see what player we are checking for
    const color = board.rows[row].cells[col].className;
    let win = false;

    // check vertical
    win = checkLine(board, col, row, 0, 1, color);
    if (win) {
        return true;
    }

    // check horizontal
    win = checkLine(board, col, row, 1, 0, color) /*||
        checkLine(board, col, row, -1, 0, color);*/
    if (win) {
        return true;
    }

    // check diagonals
    win = checkLine(board, col, row, 1, 1, color) ||
        checkLine(board, col, row, 1, -1, color);

    return win;
}
// 0            1
function checkLine(board, col, row, colIncrement, rowIncrement, color) {
    let win = 1, i = col + colIncrement, j = row + rowIncrement;

    // go direction untill: board end (max or 0) or no longer color
    while (i >= 0 && i < board.rows[0].cells.length &&
        j >= 0 && j < board.rows.length &&
        board.rows[j].cells[i].className === color) {
        win++;
        i += colIncrement;
        j += rowIncrement;
    }

    i = col - colIncrement;
    j = row - rowIncrement;

    // go mirrowed direction untill: board end (max or 0) or no longer color
    while (i >= 0 && i < board.rows[0].cells.length &&
        j >= 0 && j < board.rows.length &&
        board.rows[j].cells[i].className === color) {
        win++;
        i -= colIncrement;
        j -= rowIncrement;
    }

    return win >= 4;
}

// Checks if the board is completly filled up
function checkForDraw(board) {
    for (let i = 0; i < board.rows[0].cells.length; i++) {
        if (!board.rows[0].cells[i].classList.contains('Red') &&
            !board.rows[0].cells[i].classList.contains('Yellow')) {
            return false;
        }
    }
    return true;
}

// ---------------------------------------------------------------
// THIS AREA HANDELS A WIN / DRAW & THE RESET OF THE BOARD / SCORE
// ---------------------------------------------------------------
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

// Open a panel to show who won
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

// Reset Boar by clearing all the classes
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


// ------------------------------------------------------------------
// THIS PART SAVES, READS, AND RESETS THE LOCAL DB WITH THE GAME DATA
// ------------------------------------------------------------------
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
        if (score.red != 0 || score.yellow != 0)
            gameLoaded = true;
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
        board.classList.add("currentPlayer" + currentPlayer);
        console.log("Current Player Loaded!");
    }
}

