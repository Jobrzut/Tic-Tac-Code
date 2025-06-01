const gameboardFields = document.querySelectorAll(".gameboard>div");
const startButton = document.querySelector(".start button");
const firstPlayerInput = document.querySelector("#firstPlayer");
const secondPlayerInput = document.querySelector("#secondPlayer");
const gameSection = document.querySelector(".game");
const startSection = document.querySelector(".start");

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
            if (isWon() !== false) {
                console.log(`Winner: ${isWon()}`)
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
    return {displayFields, startTheGame, putMarkDOM}
})();

displayController.startTheGame();
displayController.putMarkDOM();