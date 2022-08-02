"use strict";
class Player {
    selectedCells = [];
    // isPlayerTwoTurn = false;

    constructor(args) {
        this.className = args.className;
        this.displayName = args.displayName;
        this.hoverClassName = args.hoverClassName;
    }

    cellClickedAtPosition(position) {
        this.selectedCells.push(position);
    }

    getCountOfSelectedCells = () => this.selectedCells.length;

    refreshSelectedCells = () => {
        this.selectedCells = [];
    };
}

class GameBoard {
    restartButton = document.getElementById("restart-button");
    gameBoard = document.getElementById("board");

    winningMessageELement = document.getElementById("victory-window");
    winningMessageTextELement = document.getElementById("data-winning-message");
    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    isPlayerTwoTurn = false;

    playerOne = new Player({
        displayName: "Player One",
        className: "player-one",
        hoverClassName: "board-hovered_player-one",
    });
    playerTwo = new Player({
        displayName: "Player Two",
        className: "player-two",
        hoverClassName: "board-hovered_player-two",
    });
    currentPlayer = undefined;
    boardCells = [];

    cells = [...document.getElementsByClassName("board__cell")];
    cellsCount = this.cells.length;

    startGame() {
        this.initializeBoard();
    }

    cleanBoard() {
        if (this.winningMessageELement.classList.contains("show")) {
            this.winningMessageELement.classList.remove("show");
        }
        this.playerOne.refreshSelectedCells();
        this.playerTwo.refreshSelectedCells();
        this.cells.forEach((cell) => {
            cell.classList.remove(this.playerOne.className, this.playerTwo.className);
        });
    }

    initializeBoard() {
        this.cells.forEach((cell) => {
            this.boardCells = [...this.cells];
            this.initializeCurrentPlayer();

            cell.classList.remove(this.playerOne.className, this.playerTwo.className);
            cell.addEventListener("mouseover", (event) => this.hoverCell(event));
            cell.addEventListener("mouseleave", (event) => this.unhoverCell(event));
            cell.addEventListener("click", (event) => this.clickOnCell(event, { once: true }));
        });
    }

    initializeCurrentPlayer() {
        this.currentPlayer = this.isPlayerTwoTurn ? this.playerTwo : this.playerOne;
    }

    hoverCell(event) {
        const cell = event.target;
        if (cell.classList.contains(this.playerOne.className) || cell.classList.contains([this.playerTwo.className])) {
            return;
        }
        this.initializeCurrentPlayer();
        cell.classList.add("board-hovered", this.currentPlayer.hoverClassName);
    }

    unhoverCell(event) {
        const cell = event.target;
        if (cell.classList.contains(this.playerOne.hoverClassName)) {
            cell.classList.remove("board-hovered", this.playerOne.hoverClassName);
        }
        if (cell.classList.contains(this.playerTwo.hoverClassName)) {
            cell.classList.remove("board-hovered", this.playerTwo.hoverClassName);
        }
    }

    clickOnCell(event) {
        let cell = event.target;
        let position = [...cell.classList].indexOf(cell);

        this.isPlayerTwoTurn = this.playerOne.getCountOfSelectedCells() > this.playerTwo.getCountOfSelectedCells();
        this.currentPlayer.cellClickedAtPosition(position);
        console.log(this.currentPlayer);
        this.placeMark(cell, this.currentPlayer);
        let isPlayerWon = this.checkWin();

        let isDraw = this.checkDraw();
        if (isPlayerWon) {
            isDraw = false;
            this.endGame(isDraw);
        } else if (isDraw) {
            this.endGame(isDraw);
        } else {
            console.log("swappin` turns");
            this.swapTurns();
            this.initializeCurrentPlayer();
        }
    }

    endGame(isDraw) {
        if (isDraw) {
            this.winningMessageTextELement.innerText = "Draw!";
        } else {
            this.winningMessageTextELement.innerText = `${this.currentPlayer.displayName} \nWins!`;
        }
        this.winningMessageELement.classList.add("show");
    }

    checkDraw() {
        return this.cells.every((cell) => {
            return (
                cell.classList.contains(this.playerOne.className) || cell.classList.contains(this.playerTwo.className)
            );
        });
    }

    swapTurns() {
        this.isPlayerTwoTurn = !this.isPlayerTwoTurn;
    }

    placeMark(cell, currentPlayer) {
        cell.classList.add(currentPlayer.className);
    }

    checkWin() {
        return this.winningCombinations.some((winCombination) => this.checkWinCombination(winCombination));
    }

    checkWinCombination(combination) {
        return combination.every((cellIndex) => {
            return this.boardCells[cellIndex].classList.contains(this.currentPlayer.className);
        });
    }

    displayGameFinish(winner) {}
}

function initializeRestart() {
    gameBoard.cleanBoard();
    document.location.reload();
}

let gameBoard = new GameBoard();
gameBoard.restartButton.addEventListener("click", () => initializeRestart());
gameBoard.initializeCurrentPlayer();
gameBoard.startGame();
