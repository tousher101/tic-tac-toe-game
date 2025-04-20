let finalScoor = JSON.parse(localStorage.getItem('score')) ||  {
    xwins: 0,
    owins: 0,
    Draw: 0

}
const cells = document.querySelectorAll('.cell');
const text = document.querySelector('.js-game-result-txt');
const resetBtn = document.querySelector('.js-restart-btn');



const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let option = ['','','','','','','','',''];

let currentPlayer = 'X';
let rurring = false ;

initilizeGame();

displayScore();

function initilizeGame(){
  cells.forEach((cell)=>{
    cell.addEventListener('click', cellClicked);
  });
        resetBtn.addEventListener('click', restartGame);
        text.innerHTML = `${currentPlayer} 's Turn`;
        rurring = true;

}


function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if(option[cellIndex] !='' || !rurring){return;}
    updateCell(this, cellIndex);
    checkWinner ();
  
   
}



function updateCell(cell, index){
    option[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
    
}
function changePlayer (){
   currentPlayer = (currentPlayer === 'X') ? 'O' :'X';
    text.innerHTML = `${currentPlayer}'s Turn`
  
}

function checkWinner(){
   let roundWon = false;
    let winner = null;
    for(let i = 0; i < winCondition.length; i++){
        const condition = winCondition[i];
        const cellA = option[condition[0]];
        const cellB = option[condition[1]];
        const cellC = option[condition[2]];

        if(cellA === ''|| cellB === ''|| cellC ===''){
            continue;
        }
       
        if(cellA === cellB && cellB === cellC){  roundWon = true; winner = cellA;
            break;
        }
    }
    if(roundWon){text.innerHTML = `${currentPlayer} Wins!`; roundWon = false; }
    else if (!(option.includes(''))){text.innerHTML = `Draw`; rurring = false;}
    else{changePlayer();}
    if(winner){text.innerHTML = `${currentPlayer} Wins!`; rurring = false; updateScoreBoard(winner);}
    else if (!(option.includes(''))){text.innerHTML = `Draw`; rurring = false; updateScoreBoard('Draw')}
    updateScoreBoard (result);
  
}



function updateScoreBoard (result){
    if(result === 'X'){finalScoor.xwins++}
    else if (result === 'O'){finalScoor.owins++}
    else if (result === 'Draw'){finalScoor.Draw++}
    displayScore();
    localStorage.setItem('score',JSON.stringify(finalScoor));
}





function displayScore(){
document.querySelector('.js-update-scoor').innerHTML = ` X Wins ${finalScoor.xwins},
 O Wins ${finalScoor.owins}, Total Draw ${finalScoor.Draw}`

}



function restartGame(){
    currentPlayer = 'X';
    option = ['','','','','','','','',''];
    text.innerHTML = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.innerHTML = '');
    rurring = true;

    
}

document.querySelector('.js-reset-board-btn').addEventListener(('click'),()=>{
  finalScoor = {
    xwins: 0,
    owins: 0,
    Draw: 0 }
   localStorage.removeItem('score');
   displayScore();

});




























/*.forEach((singleBox) => {
singleBox.addEventListener('click',()=>{
    const row = parseInt(singleBox.getAttribute('data-row'));
    const col = parseInt(singleBox.getAttribute('data-col'));
    handleClick(row,col,singleBox);

 

   function handleClick(row,col,singleBox){
        if(board[row][col])return;
        board[row][col]= currentPlayer;
        singleBox.innerText = currentPlayer;
       
       if(board[row][col]=== 'X'){
            board[row][col]= currentPlayer;
            if(checkWinner()){alert(currentPlayer+`Wins!`);
            }  else{switchPlayer();
                
                    
            }
        }
        
    }

    function checkWinner(){
        for(let i = 0; i <= 3; i++){
            if (board[i][0] && board[i][0] === board[i][1]  && board[i][1] === board[i][2]) return true;}
        for(let i = 0; i <= 3; i++){
                if (board[0][i] && board[0][i] === board[1][i] && board[i][1]=== board[2][i]) return true;}
                if(board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
                if (board[0][2] && board[0][2] === board[1][1] && board[1][1] ===  board[2][0]) return true;

                return false
    }

    function isDraw(){
        return board.flat().every(cell => cell !== '');
    }
    
    

});
});*/









