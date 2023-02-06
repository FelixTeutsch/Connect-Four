const board = document.querySelector('#board');
let currentPlayer = 'red';

board.addEventListener('click', event => {
    const col = event.target.cellIndex;
    if (col === -1) {
        return;
    }

    for (let i = board.rows.length - 1; i >= 0; i--) {
        if (!board.rows[i].cells[col].classList.contains('red') &&
            !board.rows[i].cells[col].classList.contains('yellow')) {
            board.rows[i].cells[col].classList.add(currentPlayer);
            break;
        }
    }

    if (checkForWin(board, col, i)) {
        alert(currentPlayer + ' wins!');
    } else if (checkForDraw(board)) {
        alert('Draw!');
    } else {
        currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
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
