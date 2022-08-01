"use strict";
const cellElements = document.getElementsByClassName("board__cell");
const cellElementsClass = document.getElementsByClassName("board__cell");

this.restart = document.restart;
const gameBoard = document.getElementById("winMesage");
const winningMessageELement = document.getElementById("victory-window");
const restartButton = document.getElementById("restart-button");
const winningMessageTextELement = document.getElementById(
    "data-winning-message"
);

const playerOneClassName = "player-one";
const playerTwoClassName = "player-two";
const playerTwoName = "Player Two";
const playerOneName = "Player One";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let playerTwoTurn = false;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    isPlayerTwoTurn = false;
    resetBoardCells([...cellElements]);
    setBoardHoverClass();
    winningMessageELement.classList.remove("show");
}

function resetBoardCells(cellsArray) {
    cellsArray.forEach((cell) => {
        cell.classList.remove(playerOneClassName);
        cell.classList.remove(playerTwoClassName);
        cell.addEventListener("click", handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isPlayerTwoTurn // ?
        ? playerTwoClassName
        : playerOneClassName;

    placeMark(cell, currentClass);

    makeTurn(currentClass);
}

function makeTurn(currentClass) {
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function checkWin(currentClass) {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function checkWinCombination()

function swapTurns() {
    isPlayerTwoTurn = !isPlayerTwoTurn;
}

function setBoardHoverClass() {
    cleanBoard();
    if (isPlayerTwoTurn) {
        gameBoard.classList.add(playerTwoClassName);
    } else {
        gameBoard.classList.add(playerOneClassName);
    }
}

function cleanBoard() {
    gameBoard.classList.remove(playerOneClassName);
    gameBoard.classList.remove(playerTwoClassName);
}

function endGame(draw) {
    if (draw) {
        winningMessageTextELement.innerText = "Draw!";
    } else {
        winningMessageTextELement.innerText = `${
            isPlayerTwoTurn ? playerTwoName : playerOneName
        }\n Wins!`;
    }
    winningMessageELement.classList.add("show");
}

function isDraw() {
    return [...cellElements].every((cell) => {
        return (
            cell.classList.contains(playerOneClassName) ||
            cell.classList.contains(playerTwoClassName)
        );
    });
}


// ---------------------------------------------------> OOP

class Player {
    countOfSelectedCells = 0;
    // ^ ++ on cell click
    constructor(args) {
        this.name = args.name;
        this.cssClassName = args.cssClassName;
    }

    getCountOfSelectedCells() {
        return this.countOfSelectedCells;
    }
}

class GameBoard {
    winMessage = document.getElementById("victory-window");
    // constructor(document) {
    //     // this.document = document;
    // }

    startGame() {
        //
    }

}

