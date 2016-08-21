const Coord = require('./coord');
const coord = new Coord();

function Snake(board) {
  this.direction = 'N';
  this.head = [6, 6];
  this.segments = [this.head];
  this.snakeLength = 1;
  this.board = board;
  this.alive = true;
}

Snake.prototype.move = function() {
  let newPos = coord.plus(this.head, this.direction);
  if (this.inGrid(newPos)) {
    this.segments.unshift(newPos);
    this.segments = this.segments.slice(0, this.snakeLength);
    this.head = newPos;
  } else {
    this.alive = false;
  }
};

Snake.prototype.inGrid = function(pos) {
  let xValid = (pos[0] >= 0 && pos[0] < this.board.grid);
  let yValid = (pos[1] >= 0 && pos[1] < this.board.grid);
  return (xValid && yValid);
};

Snake.prototype.turn = function(newDirection){
  if (!coord.isOpposite(this.direction, newDirection)) {
    this.direction = newDirection;
  }
};
//
// let b = {};
// b.grid = 20;
// let s = new Snake(b);
// s.move();
// s.move();
// s.move();
// s.move();
// s.move();
// s.move();
// console.log(s);
// console.log(s.checkOver());


module.exports = Snake;
