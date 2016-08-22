const Board = require('./board');
const $l = require('./jquery_lite/jquery_lite');
const coord = require('./coord');

function SnakeView($el){
  this.$el = $el;
  this.board = new Board();
  this.makeBoard();
  this.interval = window.setInterval(this.step.bind(this), 100);

  $l('body').on("keydown", (event) => {
    this.handleKeyEvent(event.keyCode);
  });
}

SnakeView.prototype.renderBoard = function() {
  let cols = $l('li');
  cols.attr("style", "");
  let appleIdx = this.board.getIdxOfPos(this.board.apple);
  $l(cols.htmlElements[appleIdx]).attr("style", "background-color: red; border-radius: 10px");

  this.board.snake.segments.forEach((segment) => {
    let snakeIdx = this.board.getIdxOfPos(segment.split(" "));

    $l(cols.htmlElements[snakeIdx]).attr("style", "background-color: green;  border-radius: 10px");
  });
};

SnakeView.prototype.step = function() {
  this.renderBoard();
  if (this.board.snake.alive) {
    this.board.snake.move();
  } else {
    $l('h1').html("Your wormy died : (");
    $l('.start').html('Click Here to retry!');
    $l('.board').attr("style", "background-color: #ccc");
    window.clearInterval(this.interval);
  }
};

SnakeView.prototype.handleKeyEvent = function(keyCode) {
  switch(keyCode) {
    case 37:
      this.board.snake.turn("W");
      break;
    case 38:
      this.board.snake.turn("N");
      break;
    case 39:
      this.board.snake.turn("E");
      break;
    case 40:
      this.board.snake.turn("S");
      break;
  }
};

SnakeView.prototype.makeBoard = function() {
  let $newBoard = $l('<ul></ul>');
  for (let i=0; i< this.board.grid; i++) {
    let $newRow = $l('<ul></ul>');
    $newRow.addClass("row");
    for (let j=0; j <this.board.grid; j++) {
      $newRow.append('<li></li>');
    }
    $newBoard.append($newRow);
  }
  $newBoard.addClass("board");
  this.$el.append($newBoard);
};

module.exports = SnakeView;
