document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X"; // Player X starts
    let gameField = Array(15).fill().map(() => Array(15).fill(" ")); // 15x15 grid initialized with spaces

    function updateMessage() {
        const messageElement = document.getElementById("message");
        messageElement.textContent = ` ${currentPlayer} je na tahu`;
        if (currentPlayer === "X") {
            messageElement.style.backgroundColor = "#034f84";
            messageElement.style.cursor = 'auto';
        } else if (currentPlayer === "O") {
            messageElement.style.backgroundColor = "#c94c4c";
            messageElement.style.cursor = 'auto';
        }
    }

    // Function to check if someone has won
    function checkForWin() {
        // Check for 5 consecutive marks horizontally, vertically, or diagonally
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                if (gameField[row][col] !== " ") {
                    const mark = gameField[row][col];

                    // Horizontal check
                    if (col <= 10 && [...Array(5)].every((_, i) => gameField[row][col + i] === mark)) {
                        return mark;
                    }

                    // Vertical check
                    if (row <= 10 && [...Array(5)].every((_, i) => gameField[row + i][col] === mark)) {
                        return mark;
                    }

                    // Diagonal (top-left to bottom-right) check
                    if (row <= 10 && col <= 10 && [...Array(5)].every((_, i) => gameField[row + i][col + i] === mark)) {
                        return mark;
                    }

                    // Diagonal (bottom-left to top-right) check
                    if (row >= 4 && col <= 10 && [...Array(5)].every((_, i) => gameField[row - i][col + i] === mark)) {
                        return mark;
                    }
                }
            }
        }
        return null;
    }

    // Handle cell click
    function handleCellClick(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        // Ignore the click if the cell is already taken
        if (gameField[row][col] !== " ") {
            return;
        }

        // Mark the cell with the current player's symbol
        gameField[row][col] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken"); // Add a "taken" class for styling
        cell.classList.add(currentPlayer === "X" ? "x-mark" : "o-mark");

        // Check if the current player wins
        const winner = checkForWin();
        if (winner) {
            document.getElementById("message").textContent = `Player ${winner} Wins!`;
            // Remove event listeners after the game is over
            const cells = document.querySelectorAll(".cell");
            cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
            return;
        }

        // Check if the game is a draw (no spaces left)
        if (gameField.flat().every(cell => cell !== " ")) {
            document.getElementById("message").textContent = "It's a draw!";
            const cells = document.querySelectorAll(".cell");
            cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateMessage();
    }

    // Create the grid in the DOM
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    resetButton.addEventListener('click', function () {
        document.getElementById("message").textContent = `X začíná`;
        document.getElementById("message").style.backgroundColor = "rgb(37, 37, 37)";
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
            cell.classList.remove("x-mark");
            cell.classList.remove("o-mark");
            cell.addEventListener("click", handleCellClick); // Reattach event listener
        });

        gameField = Array(15).fill().map(() => Array(15).fill(" "));
        updateMessage();
    });
});