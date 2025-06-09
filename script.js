const gameboardFields = document.querySelectorAll(".gameboard>div");
const startButton = document.querySelector(".start button");
const firstPlayerInput = document.querySelector("#firstPlayer");
const secondPlayerInput = document.querySelector("#secondPlayer");
const gameSection = document.querySelector(".game");
const startSection = document.querySelector(".start");
const gameMessage = document.querySelector(".game_message");
const gameMessages = document.querySelector(".game_messages");
const userSpan = document.querySelector(".game_message .user");
const pFirstPart = document.querySelector(".game_message .pFirstPart");
const pSecondPart = document.querySelector(".game_message .pSecondPart");

let gameboard = (function () {
    let board = Array(9).fill("");

    function getBoard () {
        return [...board]
    }

    function putMark(index) {
        if (0 <= index && index < 9 && board[index] == "" && isWon() == false && isDraw() == false) {
            let mark = game.showTurn().mark;
            board[index] = mark;
            game.switchTurn();
            displayController.displayTurnInfo();
            gamePlayers = players.showPlayers();
            if (isWon() !== false) {
                if (isWon() == "x") {
                    gamePlayers[0].addWin();
                } else if (isWon() == "o") {
                    gamePlayers[1].addWin();
                }
                displayController.displayWinnerInfo();
                displayController.addRestartButton();
            } else if (isDraw() !== false) {
                displayController.displayDrawInfo();
                displayController.addRestartButton();
            }
            displayController.displayFields();
        }
    }

    function resetBoard () {
        board = Array(9).fill("");
        game.startTurn();
    }

    function isWon() {
        let boardStatus = board
    
        for (let i = 0; i<3; i++) {
            if (boardStatus[i] !== "" && boardStatus[i] == boardStatus[i+3] && boardStatus[i+3] == boardStatus[i+6]) {
                return boardStatus[i];
            }
        }
        for (let i = 0; i<9; i+=3) {
            if (boardStatus[i] !== "" && boardStatus[i] == boardStatus[i+1] && boardStatus[i+1] == boardStatus[i+2]) {
                return boardStatus[i];
            }
        }
    
        if (boardStatus[0] !== "" && boardStatus[0] == boardStatus[4] && boardStatus[4] == boardStatus[8]) {
            return boardStatus[0];
        }
    
        if (boardStatus[2] !== "" && boardStatus[2] == boardStatus[4] && boardStatus[4] == boardStatus[6]) {
            return boardStatus[2];
        }
        return false;
    }

    function isDraw() {
        if (isWon() == false && board.every((current) => current !== "")) {
            return true
        }
        return false
    }

    return {getBoard, putMark, resetBoard, isWon, isDraw};
})();



let players = (function () {
    function newPlayer (name, mark) {
        let wins = 0;
        function addWin() {
            wins++;
        }
        function showWins() {
            return wins;
        }
        if (mark.toLowerCase() === "x" || mark.toLowerCase() === "o") {
            mark = mark.toLowerCase();
            return {name,mark,showWins,addWin}
        }
    }
    
    let playerOne, playerTwo;
    function addPlayers(firstName, secondName){
        playerOne = newPlayer(firstName,"x");
        playerTwo = newPlayer(secondName, "o");
    }

    function showPlayers () {
        return [playerOne, playerTwo]
    }
    return {addPlayers, showPlayers}
})();

let game = (function () {
    let gamePlayers;
    let currentPlayer;
    
    function startTurn() {
        gamePlayers = players.showPlayers();
        currentPlayer = gamePlayers[0];
    }

    function switchTurn() {
        if (currentPlayer == gamePlayers[0]) {
            currentPlayer = gamePlayers[1];
        } else {
            currentPlayer = gamePlayers[0]
        }
    }

    function showTurn() {
        return currentPlayer;
    }

    return {switchTurn, showTurn, startTurn}
})();

let displayController = (function() {
    function displayFields() {
        let gameboardList = gameboard.getBoard();
        for(let i=0;i<9;i++) {
            gameboardFields[i].className = "";
            if (gameboardList[i] == "x") {
                gameboardFields[i].classList.add("x");
            } else if (gameboardList[i] == "o") {
                gameboardFields[i].classList.add("o");
            }
        }
    }

    function startTheGame() {
        startButton.addEventListener("click", () => {
            if (firstPlayerInput.value != "" && secondPlayerInput.value != "") {
                players.addPlayers(firstPlayerInput.value, secondPlayerInput.value);
                game.startTurn()
                startSection.style.display = "none";
                gameSection.style.display = "block";
                displayController.displayTurnInfo();
            }
        });
    }

    function putMarkDOM() {
        gameboardFields.forEach((div, index) => {
            div.addEventListener("click", () => {
                gameboard.putMark(index);
            });
        });
    }

    function displayTurnInfo() {
        current = game.showTurn();
        pFirstPart.textContent = "// It's ";
        pSecondPart.textContent = "'s turn!";
        userSpan.textContent = current.name;
        if (current.mark == "x") {
            userSpan.style.color = "#a363d6";
        } else {
            userSpan.style.color = "#ffd710";
        }
    }

    function displayWinnerInfo() {
        pFirstPart.textContent = "// ";
        pSecondPart.textContent = " won!";
        let results = document.createElement("p");
        results.className = "results";
        let resultsFirst = document.createElement("span");
        let resultsMiddle = document.createElement("span");
        let resultsSecond = document.createElement("span");
        results.textContent = "// It's ";
        resultsFirst.textContent = players.showPlayers()[0].showWins();
        resultsFirst.style.color = "#a363d6";
        resultsSecond.textContent = players.showPlayers()[1].showWins();
        resultsSecond.style.color = "#ffd710";
        resultsMiddle = ":";
        results.append(resultsFirst,resultsMiddle,resultsSecond);
        gameMessages.appendChild(results);

        if (gameboard.isWon() == "x") {
            userSpan.textContent = players.showPlayers()[0].name;
            userSpan.style.color = "#a363d6";
        } else if (gameboard.isWon() == "o") {
            userSpan.textContent = players.showPlayers()[1].name;
            userSpan.style.color = "#ffd710";
        }
    }

    function displayDrawInfo() {
        userSpan.textContent = "";
        pFirstPart.textContent = "";
        pSecondPart.textContent = "// It's a draw!";
    }

    function addRestartButton() {
        let restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.classList.add("restart");
        gameMessages.appendChild(restartButton);
        restartButton.addEventListener("click", (e) => {
            gameboard.resetBoard();
            e.target.remove();
            displayFields();
            displayController.displayTurnInfo();
            result = document.querySelector(".results");
            if (result) {
                result.remove();
            }
        });
    }

    return {displayFields, startTheGame, putMarkDOM, displayTurnInfo, displayWinnerInfo, displayDrawInfo, addRestartButton}
})();

displayController.startTheGame();
displayController.putMarkDOM();