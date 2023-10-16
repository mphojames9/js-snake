const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext('2d');
const currentScoreDisplay = document.querySelector(".currentScore");
const hightScoreDisplay = document.querySelector(".highScore");
const entityDimension = 10;
const finalScore = document.querySelector(".finalRecord");
const startButton = document.querySelector("#start");
const gameOverSec = document.querySelector(".gameOverSec");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
let xvelocity = entityDimension;
let yvelocity = 0;
let running = false;
let snake = [
    {x:entityDimension * 4, y:0},
    {x:entityDimension * 3, y:0},
    {x:entityDimension * 2, y:0},
    {x:entityDimension , y:0},
    {x:0, y:0}
]

let score = 0;
let targetX;
let targetY;

startButton.addEventListener("click",()=>{
        startTheGame()
})

function startTheGame(){
    running = true;
    startButton.style.display = "none";
    intervals();
    generateFood();
    displayFood();

}

function intervals(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            generateSnake();
            displayFood();
            moveSnake();
            checkGameOver()
            intervals();
        },70)
    }
}


function generateFood(){
    function gererateRandomNumber(min,max){
        const randomNumber = Math.round(Math.random() * ((max - min) + min)/entityDimension) * entityDimension;
        return randomNumber;
    }

        targetX = gererateRandomNumber(0, gameWidth - entityDimension);
        targetY = gererateRandomNumber(0, gameWidth - entityDimension);
    }


function displayFood(){
        ctx.fillStyle = "black";
        ctx.strokeStyle = "rgb(130, 79, 197)";
        ctx.fillRect(targetX, targetY, entityDimension, entityDimension);
        ctx.strokeRect(targetX, targetY, entityDimension, entityDimension)   ;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}

function clearBoard(){
    ctx.fillStyle = "rgb(162, 192, 194)";
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}

function generateSnake(){
    snake.forEach(snakePart => {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "rgb(130, 79, 197)";
        ctx.fillRect(snakePart.x, snakePart.y, entityDimension, entityDimension);
        ctx.strokeRect(snakePart.x, snakePart.y, entityDimension, entityDimension);
    });
}

function moveSnake(){
    const snakeHead = {x:snake[0].x + xvelocity,y:snake[0].y + yvelocity};
    snake.unshift(snakeHead);
    if(snake[0].x == targetX && snake[0].y == targetY){
        score +=1;
        currentScoreDisplay.innerHTML = `Score ${score}`;
        generateFood();
        displayFood();
    }else{
        snake.pop();
    }
}

document.addEventListener("keydown",(e)=>{
    const goingUp = (yvelocity == -entityDimension);
    const goingDown = (yvelocity == entityDimension);
    const goingRight = (xvelocity == entityDimension);
    const goingLeft = (xvelocity == -entityDimension);
    
    const keyCode = e.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch(true){
        case (keyCode == LEFT && !goingRight):
            xvelocity = -entityDimension;
            yvelocity = 0;
            break;

        case (keyCode == UP && !goingDown):
            xvelocity = 0;
            yvelocity = -entityDimension;
            break;

        case (keyCode == RIGHT && !goingLeft):
            xvelocity = entityDimension;
            yvelocity = 0;
            break;

        case (keyCode == DOWN && !goingUp):
            xvelocity = 0;
            yvelocity = entityDimension;
            break;
    }
})

function checkGameOver(){
    if(snake[0].x >= gameWidth){
        running = false;
        displayGameOver();
    }
    if(snake[0].y >=gameWidth){
        running = false;
        displayGameOver();
    }
    if(snake[0].y < 0){
        running = false;
        displayGameOver();
    }
    if(snake[0].x < 0){
        running = false;
        displayGameOver();
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
}

function displayGameOver(){
    gameOverSec.style.display = "flex";
    finalScore.innerHTML = `Your Score is: ${score}`;
    localStorage();
}

function reset(){
    location.reload();
}



