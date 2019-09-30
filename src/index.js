import "./styles.css";

//document.getElementById("app").innerHTML = `
//<h1>Hello Vanilla!</h1>
//<div>
//  We use Parcel to bundle this sandbox, you can find more info about Parcel
//  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
//</div>
//`;

var board;
const player = "X";
const AI = "O";
const winCombos = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20]
];

const squares = document.querySelectorAll(".square");
startGame();

function startGame() {
  document.querySelector(".endgame").getElementsByClassName.display = "none";
  board = Array.from(Array(25).keys());
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
    squares[i].style.removeProperty("background-color");
    squares[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  if (typeof board[square.target.id] === "number") {
    turn(square.target.id, player);
    if (!checkTie()) turn(freeSpot(), AI);
  }
}

function turn(id, player) {
  board[id] = player;
  document.getElementById(id).innerText = player;
  let gameWon = checkWin(board, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let play = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => play.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(
      index
    ).style.backgroundColor = gameWon.player = player ? "blue" : "red";
  }
  for (var i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player === player ? "You win!" : "You lose!");
}

function declareWinner(who) {
  //document.querySelector(".endgame").style.display = "block";
  //document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return board.filter(s => typeof s === "number");
}
function freeSpot() {
  return emptySquares()[0];
}
function checkTie() {
  if (emptySquares().lenght === 0) {
    for (var i = 0; i < squares.lenght; i++) {
      squares[i].style.backgroundColor = "green";
      squares[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}
