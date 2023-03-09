const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// lets create a function to initialise a game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // boxes[index].innerText = gameGrid;
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // boxes.classList.add("btn");
        box.classList = `box box${index + 1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer ==="X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    // newGameBtn.classList.add("active");
    let answer = "";

    winningPosition.forEach((position) => {
        // if(gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2] !== ""]
        //     && (gameGrid[position[0]]=gameGrid[position[1]]) && (gameGrid[position[1]]=gameGrid[position[2]])){
        //         // check if X ix winner
        //         if (gameGrid[position[0]] === "X")
        //             answer = "X";
        //         else {
        //             answer = "O";
        //         }

        //         // Now we know X/O is a winner

        //         boxes[position[0]].classList.add("win");
        //         boxes[position[1]].classList.add("win");
        //         boxes[position[2]].classList.add("win");
        //     }
            if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
                && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                    //check if winner is X
                    if(gameGrid[position[0]] === "X") 
                        answer = "X";
                    else {
                        answer = "O";
                    } 
                        

                    //disable pointer events
                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                    })

                    //now we know X/O is a winner
                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");
            }
    });

    // It means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner is ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }

    // When there is Tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box!=="")
            fillCount++;
    });

    // board is filled, game is tie
    if (fillCount === 9){
        gameInfo.innerText = "Game is Tie";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap karo turn ko
        swapTurn();
        // Check if anyone Won
        checkGameOver();
        // cursor not pointer
        // boxes[index].style
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);