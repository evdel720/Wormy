const Wormy = require('./wormy');

function Board(){
  this.grid = 20;
  this.wormy = new Wormy(this, this.getRandomPos());
  this.apple = this.getRandomPos();
}

Board.prototype.getRandomPos = function() {
  let x = Math.floor(Math.random() * this.grid);
  let y = Math.floor(Math.random() * this.grid);
  return [x, y];
};

Board.prototype.updateApple = function() {
  this.apple = this.getRandomPos();
};

Board.prototype.getIdxOfPos = function(pos) {
  return parseInt(pos[1]) * this.grid + parseInt(pos[0]);
};


module.exports = Board;
