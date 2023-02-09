const buttonArea = document.getElementById("buttonArea");
const gameArea = document.getElementById("gameArea");
const newGame = document.getElementById("newGame");
const continueGame = document.getElementById("continueGame");

newGame.addEventListener("click", function () {
    startGame(true);
});
continueGame.addEventListener("click", function () {
    startGame(false);
});

// Start game and if resetScore start a new game
function startGame(resetScore) {
    gameArea.style.display = "flex";
    if(resetScore) {
        score.red = 0;
        score.yellow = 0;
        player1ScoreDisplay.innerHTML = score.red;
        player2ScoreDisplay.innerHTML = score.yellow;
        resetBoard();
    }
    buttonArea.style.display = "none";
}

// LOAD THE GAME WHEN THE WINDOW IS LOADED
window.addEventListener("load", () => {
    loadCurrentPlayer();
    loadScore();
    loadGame();
    player1ScoreDisplay.innerHTML = score.red;
    player2ScoreDisplay.innerHTML = score.yellow;
    if (gameLoaded) {
        console.log("Game is loaded!");
        continueGame.style.display = "flex";
    }
});