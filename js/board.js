const Snake = require('./snake.js');

function Board(){
  this.grid = this.makeGrid();
  this.snake = new Snake();
}

Board.prototype.makeGrid = function(){
  let grid = [];
  for(let i = 0; i < 20; i++){
    let row = [];
    for(let j = 0; j < 20; j++){
      row.push(undefined);
    }
    grid.push(row);
  }
  return grid;
};

module.exports = Board;
