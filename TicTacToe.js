const prompt = require('prompt-sync')();

const winning_moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const moves = {
  X: [],
  O: []
}

const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
board[4] = "X"
moves["X"].push(4)

const corners = [0, 2, 6, 8]

function check(input, board){
  return typeof board[input] === 'number';
}

function check_win(winning_moves, player, moves){
  const won = winning_moves.some(winMv => 
    winMv.every(el => moves[player].includes(el))
  );

  won && console.log('Player X wins, hurray!!')
  return won
}
  
  
function check_pos_win(player, moves, board, winning_moves){
  let position;
  const possible = winning_moves.some(winMv => {
    let cnt = 0;
    position = winMv.find(pos => check(pos, board))
    
    winMv.forEach(el => {
      if (moves[player].includes(el)) {
        cnt += 1;
      }
    })

    return cnt === 2 && position;
  });
  
  return [possible, position]
}

function x_plays(board, winning_moves){
  // Checks for a possible next winning move then wins it or blocks it
  const check_x = check_pos_win('X', moves, board, winning_moves);
  const check_o = check_pos_win('O', moves, board, winning_moves);

  if (check_x[0]) {
    return check_x[1]
  } else if(check_o[0]) {
    return check_o[1]
  }

  // Return default decision
  return corners.find(el => check(el, board)) || board.find(el => check(el-1, board)) - 1
}

function display(board){
  console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ${board[3]} | ${board[4]} | ${board[5]}
    ${board[6]} | ${board[7]} | ${board[8]}
  `)
}


let GAME_ON = true;
i = 1

while (GAME_ON) {
  const player = i % 2 === 0 ? 'X' : 'O';
  let valid = false;
  let input;

  display(board);

  if(player === 'X'){
    input = x_plays(board, winning_moves, corners)
    valid = true
  } else if(player === 'O') {
    input = Number(prompt("Player O: ")) - 1
    valid = check(input, board)
  }

  if(valid) {
    i += 1
    console.log(`${player} Played >>> `)
    moves[player].push(input)
    board[input] = player
  }

  if((i > 8) || check_win(winning_moves, player, moves)) {
    i > 8 && console.log("It is a draw, cool!!");
    GAME_ON = false
  }
}

display(board)
