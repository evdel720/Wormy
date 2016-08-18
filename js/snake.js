const Coord = require('./coord');

function Snake() {
  this.directions = ["N", "E", "S", "W"];
  this.currentDirection = this.directions[0];
  this.head = [5,5];
  this.coord = new Coord();
  this.segments = [this.head];
  this.snakeLength = 1;
}

Snake.prototype.move = function(){
  // this.segments.forEach((segment) => {
  //   segment.plus(this.directions.indexOf(this.currentDirection));
  // });
  let cardIdx = this.directions.indexOf(this.currentDirection);
  let newPos = this.coord.plus(this.head, cardIdx);
  this.segments.shift(newPos);
  this.segments = this.segments.slice(0, this.snakeLength);
  this.head = newPos;
};

Snake.prototype.turn = function(newDirection){
  console.log(newDirection);
  this.currentDirection = newDirection;
};


module.exports = Snake;
