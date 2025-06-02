const gameboardFields = document.querySelectorAll(".gameboard>div");
const startButton = document.querySelector(".start button");
const firstPlayerInput = document.querySelector("#firstPlayer");
const secondPlayerInput = document.querySelector("#secondPlayer");
const gameSection = document.querySelector(".game");
const startSection = document.querySelector(".start");
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
            if (isWon() !== false) {
                displayController.displayWinnerInfo();
            } else if (isDraw() !== false) {
                console.log(`It's a draw!`)
            }
            displayController.displayFields();
        }
    }

    function resetBoard () {
        board = Array(9).fill("");
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
        if (mark.toLowerCase() === "x" || mark.toLowerCase() === "o") {
            mark = mark.toLowerCase();
            return {name,mark}
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
        gameboardList = gameboard.getBoard();
        for(let i=0;i<9;i++) {
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
        if (gameboard.isWon() == "x") {
            userSpan.textContent = players.showPlayers()[0].name;
            userSpan.style.color = "#a363d6";
        } else if (gameboard.isWon() == "o") {
            userSpan.textContent = players.showPlayers()[1].name;
            userSpan.style.color = "#ffd710";
        }
    }

    return {displayFields, startTheGame, putMarkDOM, displayTurnInfo, displayWinnerInfo}
})();

displayController.startTheGame();
displayController.putMarkDOM();