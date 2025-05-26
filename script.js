let gameboard = (function () {
    let board = Array(9).fill("");

    function getBoard () {
        return [...board]
    }

    function putMark(index,mark) {
        if (0 <= index && index < 9) {
            board[index] = mark;
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
