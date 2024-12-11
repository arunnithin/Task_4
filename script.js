let currentPlayer = ""; // To store the current player (X or O)
let gameActive = true; // To track if the game is active
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusView = document.getElementById("statusview");
const boxes = document.querySelectorAll(".box");

// Add click event to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(box, index));
});

function handleBoxClick(box, index) {
    if (gameState[index] !== "" || !gameActive) return; // Ignore if box is already filled or game is over

    gameState[index] = currentPlayer;
    box.textContent = currentPlayer;

    if (checkWin()) {
        statusView.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every((cell) => cell !== "")) {
        statusView.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    statusView.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    return winningConditions.some((condition) => {
        const [a, b, c] = condition;
        return (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        );
    });
}

function restartGame() {
    currentPlayer = "";
    gameActive = false;
    gameState = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => (box.textContent = ""));
    statusView.textContent = "Play Now";
    showPlayerSelection();
}

function showPlayerSelection() {
    const playerChoice = prompt("Choose your player: X or O").toUpperCase();
    if (playerChoice === "X" || playerChoice === "O") {
        currentPlayer = playerChoice;
        gameActive = true;
        statusView.textContent = `Player ${currentPlayer}'s Turn`;
    } else {
        alert("Invalid choice. Please refresh and select X or O.");
    }
}

// Initialize the game with player selection
showPlayerSelection();
