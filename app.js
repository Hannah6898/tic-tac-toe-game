const gameBoard = document.querySelector("#gameboard")
const infoText = document.querySelector("#info")
const infoBlock = document.querySelector("#info-block")

const numberOfCells = 9
const startCells = [];

const borderTwoSides =[0,1,3,4]
const borderOneSide =[2,5]
const borderRightOnly = [6,7]

let go =  "circle";
infoText.textContent = "Circle First"
infoBlock.dataset.player = go;

function createGameBoard() {
    for (let i = 0; i < numberOfCells; i++) {
        startCells.push("")
    }
    startCells.forEach((_cell, index) => {
        //Create board squares
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index

        //Create game board boarders
        if (borderTwoSides.includes(index)) {
            cellElement.classList.add("border-b-8", "border-r-8");
        } else if (borderOneSide.includes(index)) {
            cellElement.classList.add("border-b-8");
        } else if (borderRightOnly.includes(index)) {
            cellElement.classList.add("border-r-8");
        }

        //Add event listeners to game board squares
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
}

createGameBoard();

function addGo(e) {
    //Create game counter
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)

    //Add counter to game board square
    e.target.appendChild(goDisplay)
    go = go === "circle" ? "cross" : "circle";

    //Update test and styling for info block
    infoBlock.dataset.player = go;
    infoText.textContent = `${go}'s Turn`;

    e.target.removeEventListener("click", addGo)
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")

    //Check for a draw
    const allSquaresFilled = [...allSquares].every(square =>
        square.firstChild?.classList.contains("circle") || square.firstChild?.classList.contains("cross")
    );
    if(allSquaresFilled){
        infoBlock.dataset.player= 'draw'
        infoText.textContent = "It's a Draw!"
    }

    //Check for a win
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    winningCombos.forEach(combo => {
        const circleWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))
        if(circleWins){
            infoBlock.dataset.player = 'circle'
            infoText.textContent = "Circle Wins!"
            allSquares.forEach(square=>square.replaceWith(square.cloneNode(true)))
        }
    })

    winningCombos.forEach(combo => {
        const crossWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))
        if(crossWins){
            infoBlock.dataset.player= 'cross'
            infoText.textContent = "Cross Wins!"
            allSquares.forEach(square=>square.replaceWith(square.cloneNode(true)))
        }
    })

}
