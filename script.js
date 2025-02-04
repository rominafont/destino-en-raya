document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelectorAll(".btn-square");
    const resetButton = document.querySelector(".btn-reset");
    let gameActive = true;
    let moves = 0;
    let currentPlayer = "🌙"; // Siempre inicia el jugador humano
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    function resetGame() {
        gameBoard.fill("");
        board.forEach(button => {
            button.textContent = ""; 
            button.classList.remove("win");
            button.disabled = false;
        });
        gameActive = true;
        moves = 0;
        currentPlayer = "🌙";
    }

    function checkWinner() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                board[a].classList.add("win");
                board[b].classList.add("win");
                board[c].classList.add("win");
                showPrediction(gameBoard[a] === "🌙" ? "win" : "lose");
                return true;
            }
        }

        if (moves === 9) {
            gameActive = false;
            showPrediction("draw");
            return true;
        }

        return false;
    }

    function showPrediction(result) {
        let tarotCard = "";
        let message = "";

        if (result === "win") {
            tarotCard = moves <= 5 ? "⭐ La Estrella" : "🌞 El Sol";
            message = moves <= 5
                ? "Hoy la energía fluye a tu favor. Confía y avanza."
                : "Hay luz en el camino, pero también desafíos. Sigue adelante.";
        } else if (result === "lose") {
            tarotCard = moves <= 5 ? "⚡ La Torre" : "☠️ La Muerte";
            message = moves <= 5
                ? "El caos se acerca. Prepárate para lo inesperado."
                : "Es momento de dejar ir lo viejo para abrir paso a lo nuevo.";
        } else {
            tarotCard = "🌙 La Luna";
            message = "Las señales son confusas. Observa con atención.";
        }

        setTimeout(() => {
            alert(`El Universo ha hablado:\nTu carta es: ${tarotCard}\n"${message}"`);
            resetGame();
        }, 800);
    }

    function universeTurn() {
        if (!gameActive) return;

        let availableSpots = gameBoard.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        if (availableSpots.length > 0) {
            let move = availableSpots[Math.floor(Math.random() * availableSpots.length)]; // Movimiento aleatorio
            gameBoard[move] = "🔮";
            board[move].textContent = "🔮";
            board[move].disabled = true;
            moves++;

            if (!checkWinner()) {
                currentPlayer = "🌙"; // Devuelve el turno al jugador
            }
        }
    }

    board.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (gameActive && button.textContent === "") {
                gameBoard[index] = "🌙";
                button.textContent = "🌙";
                button.disabled = true;
                moves++;

                if (!checkWinner()) {
                    currentPlayer = "🔮"; // Cambia el turno al Universo
                    setTimeout(universeTurn, 500); // Simula que el Universo "piensa" antes de jugar
                }
            }
        });
    });

    resetButton.addEventListener("click", resetGame);
    resetGame(); // Asegura que el juego empieza correctamente
});