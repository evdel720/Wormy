const coord = require('./coord');

function Wormy(board, pos) {
  this.direction = 'N';
  this.head = pos;
  this.segments = [this.head.join(" ")];
  this.wormyLength = 1;
  this.board = board;
  this.alive = true;
}

Wormy.prototype.updateLength = function() {
  this.wormyLength += 1;
};

Wormy.prototype.move = function() {
  let newPos = coord.plus(this.head, this.direction);

  if (this.inGrid(newPos)) {
    if (coord.equals(newPos, this.board.apple)) {
      this.updateLength();
      this.board.updateApple();
    } else if (this.segments.includes(newPos.join(" "))) {
      this.alive = false;
      return;
    }
    this.segments.unshift(newPos.join(" "));
    this.segments = this.segments.slice(0, this.wormyLength);
    this.head = newPos;
  } else {
    this.alive = false;
  }
};

Wormy.prototype.inGrid = function(pos) {
  let xValid = (pos[0] >= 0 && pos[0] < this.board.grid);
  let yValid = (pos[1] >= 0 && pos[1] < this.board.grid);
  return (xValid && yValid);
};

Wormy.prototype.turn = function(newDirection){
  if (!coord.isOpposite(this.direction, newDirection)) {
    this.direction = newDirection;
  }
};

module.exports = Wormy;
