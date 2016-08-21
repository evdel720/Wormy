const Snake = require('./snake');

function Board(){
  this.grid = 20;
  this.snake = new Snake(this);
  this.apple = [10, 10];
}


module.exports = Board;
