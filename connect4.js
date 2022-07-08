/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2 , is a variable which stores who has won
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 let htmlBoard = document.getElementById('board');

 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   //loop over & create empty matrix array (array of rows, each row is an array of cells)
   for (let y = 0; y < HEIGHT; y++) {
     board.push(Array.from({length: WIDTH}));
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
 
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
 
   // TODO: add comment for this code
   //Creating a table row (row of cells in a table) at the top that can be clicked. 
   //This will be where players click to place their pieces. Top is an empty list. 
   // Call function handleClick 
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
 //Looping starting at 0 and going up to the last index (width-1). Creates a new td (id of 'x') 
 // each time, goes up by 1 each time through the loop. Creates a table with a td for each row.
 // Td id's correspond their their row numbers. Appends these on to top.
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code
 
 //Looping starting at 0 and going up to the last index (height-1). 
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     //Looping starting at 0 and going up to the last index (width-1).
     //Creates a table data cell for  each row. Appends these on the rows of the board.
     //So this has created rows on top of themselves.
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   //Finds a spot on the board where a number can be placed
   for (let y = HEIGHT - 1; y >= 0; y--) {
     if (!board[y][x]) {
       return y;
     }
   }
   return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
  const boardPiece = document.createElement('div');
  boardPiece.classList.add('piece');
  boardPiece.classList.add(`p${currPlayer}`);
 
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(boardPiece);
 }
 
function clearBoard() {
  htmlBoard.innerHTML = "";
}
 /** endGame: announce game end */
 function endGame(msg) {
   // TODO: pop up alert message
 // added setTimeout so that the final circle will show up before the alert
   setTimeout(function() { confirm(msg); }, 500);
   if (confirm) {
    setTimeout(function() { clearBoard(); }, 1000);
    setTimeout(function() { makeHtmlBoard(); }, 1000);
   }
 }
 
 

 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
   
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   board[y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
 }
   
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.every(row => row.every(cell => cell))) {
     return endGame('Tie');
 }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2 : 1; 
 }
   //Assigns value of 2 to currPlayer if the player is player 1, and 1 to currPlayer if player is 2
 
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
     // declares _win as an anonymous function inside of checkForWin, takes one argument: cells
     // cells represents all cells on the board that have been checked so far
 
     return cells.every(
       // using every() method on the cells to check each cell against the condition that it is
       //>= 0 and <= height & width. And that board[y][x] = currPlayer
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (let y = 0; y < HEIGHT; y++) {
     //for loop that iterates over the height of the screen
     for (let x = 0; x < WIDTH; x++) {
        //for loop that iterates over the width of the screen
       //declaring arrays which store coordinates in order to draw a grid on the screen
       //creates the rows and columns, creates vars for diagonals as well
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
         //wins can happen horizontally, vertically, or diagonally
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();

 
