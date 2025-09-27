document.addEventListener('DOMContentLoaded', () => {
const cells = document.querySelectorAll('.square');
let currentPlayer = 'X';
let s = 0;
let gameOver = false;
let p1=0;
let p2=0;
let tie=0;
const ai = document.querySelector('.actions i'); 
const ap = document.querySelector('.actions p');
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameOver && cell.textContent === '') {
      cell.textContent = currentPlayer;
      s++;
    }
      check();
      if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        ai.textContent = currentPlayer;
         if (currentPlayer === 'X') {
          ap.textContent = "Player 1";
        } else {
          ap.textContent = "Player 2";
        }
      }
  });
});
const winnerTxt = document.querySelector('.winner');
const winning = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
function endGame() {
const win=document.querySelector('.winner-text hidden');
const txt=document.querySelector('#pop-uptxt hidden');
txt.textContent="Player "+ currentPlayer +" Wins!!!";
win.classList.remove('hidden');
setTimeout(() => {
    win.classList.add('hidden');
}, 3000);
}
function endGameTie() {
    console.log("tie");
  const win = document.querySelector('.winner-text hidden');
  const txt = document.querySelector('#pop-uptxt hidden');
  txt.textContent = "It's a tie!";
  win.classList.remove('hidden');
  setTimeout(() => {
    win.classList.add('hidden');
  }, 3000); 
}


function check() {
  for (const x of winning) {
    let a = 0;
    for (let i = 0; i < 3; i++) {
      if (cells[x[i]].textContent === currentPlayer) {
        a++;
      }
    }
    if (a === 3) { confetti({
        particleCount: 400,
        spread: 150,
        origin: { y: 0.6 }
      });
      if (currentPlayer === 'O') {
        p2++;
        UpdateScore();
      } else {
        p1++;
        UpdateScore();
      }
      endGame();
       gameOver = true;
      setTimeout(clearBoard, 30000); 
      return;
    }
  }
  if ([...cells].every(cell => cell.textContent !== '')) {
    tie++;
    UpdateScore();
    endGameTie();
    gameOver = true;
    setTimeout(clearBoard, 30000); 
    
  }
}

const act = document.querySelector('.btn');
const menu = document.querySelector('.item');
act.addEventListener('click', () => {
    menu.classList.toggle('item-hidden');
});
const p1Score = document.querySelector('.s1');
const p2Score = document.querySelector('.s3');
const score = document.querySelector('.s2');

function UpdateScore() {
    p1Score.textContent = 'Player X: ' + p1 + ' Wins';
    p2Score.textContent = 'Player O: ' + p2 + ' Wins';
    score.textContent = 'Ties: ' + tie;
}

function clearBoard() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameOver = false;
}
const r= document.querySelector('.r1');
const n= document.querySelector('.n1');
r.addEventListener('click', () => {
    setTimeout(clearBoard, 30); 
    s=0;
    currentPlayer = 'X';
    ai.textContent = currentPlayer;
    ap.textContent = "Player 1";
    gameOver = false;
});
n.addEventListener('click', () => {
    p1=0;
    p2=0;
    tie=0;
    UpdateScore();
    setTimeout(clearBoard, 300); 
    s=0;
    currentPlayer = 'X';
    ai.textContent = currentPlayer;
    ap.textContent = "Player 1";
    gameOver = false;
});
addEventListener('click',(event) => {
    const clickedInsideButton = act.contains(event.target);
    const clickedInsideMenu = menu.contains(event.target);
    if (!clickedInsideButton && !clickedInsideMenu) {
        menu.classList.add('item-hidden');
    }
});
});