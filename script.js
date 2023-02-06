const board = document.querySelector('#board');
let currentPlayer = 'red';

let player1Score = 0;
let player2Score = 0;

let player1ScoreDisplay = document.querySelector("#player1-score");
let player2ScoreDisplay = document.querySelector("#player2-score");



board.addEventListener('click', event => {
    const col = event.target.cellIndex;
    if (col === -1 || col === undefined) {
        return;
    }

    for (let i = board.rows.length - 1; i >= 0; i--) {
        if (!board.rows[i].cells[col].classList.contains('red') &&
            !board.rows[i].cells[col].classList.contains('yellow')) {
            board.rows[i].cells[col].classList.add(currentPlayer);
            if (checkForWin(board, col, i)) {
                showWinnerScreen(currentPlayer);
            } else if (checkForDraw(board)) {
                alert('Draw!');
            } else {
                currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
            }
            break;
        }
    }

});

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
        if (!board.rows[0].cells[i].classList.contains('red') &&
            !board.rows[0].cells[i].classList.contains('yellow')) {
            return false;
        }
    }
    return true;
}


let winnerScreen = document.getElementById("winnerScreen");
let winnerMessage = document.getElementById("winnerMessage");
let playAgainButton = document.getElementById("playAgainButton");

playAgainButton.addEventListener("click", function () {
    winnerScreen.style.display = "none";
    resetBoard();
});

function showWinnerScreen(player) {
    winnerMessage.innerHTML = "Player " + player + " wins!";
    winnerScreen.style.display = "flex";

    // Update the score
    if (currentPlayer === "red") {
        player1Score++;
    } else {
        player2Score++;
    }
    player1ScoreDisplay.innerHTML = player1Score;
    player2ScoreDisplay.innerHTML = player2Score;
}


function resetBoard() {
    // Reset all cells to be empty
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            board.rows[row].cells[col].classList.remove("red");
            board.rows[row].cells[col].classList.remove("yellow");
        }
    }

    // Reset current player
    currentPlayer = 'red';

    // Hide the winner screen
    winnerScreen.style.display = "none";
}
