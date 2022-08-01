"use strict";
const cellElements = document.getElementsByClassName("board__cell");
const cellElementsClass = document.getElementsByClassName("board__cell");

const gameBoard = document.getElementById("board");
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

let isPlayerTwoTurn = false;

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
        cell.addEventListener("mouseover", hoverCell);
        cell.addEventListener("mouseleave", unhoverCell);
        cell.addEventListener("click", handleClick, { once: true });
    });
}

function hoverCell(event) {
    const cell = event.target;
    if (
        cell.classList.contains("player-one") ||
        cell.classList.contains("player-two")
    ) {
        return;
    }

    if (gameBoard.classList.contains("player-one")) {
        cell.classList.add("board-hovered", "board-hovered_player-one");
    } else {
        cell.classList.add("board-hovered", "board-hovered_player-two");
    }
}

function unhoverCell(event) {
    event.classList.remove("board-hovered", "board-hovered_player-one");
}

function handleClick(e) {
    console.log("hello");
    const cell = e.target;
    const currentClass = isPlayerTwoTurn
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
    return winningCombinations.some((winCombination) =>
        checkWinCombination(winCombination, currentClass)
    );
}

function checkWinCombination(combination, currentClass) {
    return combination.every((cellIndex) => {
        return cellElements[cellIndex].classList.contains(currentClass);
    });
}

function swapTurns() {
    isPlayerTwoTurn = !isPlayerTwoTurn;
}

function setBoardHoverClass() {
    cleanBoard();
    // isPlayerTwoTurn(playerTwoTurn);
    if (isPlayerTwoTurn) {
        gameBoard.classList.add(playerTwoClassName);
    } else {
        gameBoard.classList.add(playerOneClassName);
    }
}

function isPlayerTwoTurn(playerTwoTurn) {}

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
