const Board = require('./board');
const $l = require('./jquery_lite/jquery_lite');

function SnakeView($el){
  this.$el = $el;
  this.board = new Board();
  this.makeBoard();
  this.interval = window.setInterval(this.step.bind(this), 500);

  $l('body').on("keydown", (event) => {
    this.handleKeyEvent(event.keyCode);
  });
}

SnakeView.prototype.renderBoard = function() {
  let cols = $l('li');
  cols.attr("style", "");
  this.board.snake.segments.forEach((segment) => {
    let idx = segment[1] * this.board.grid + segment[0];

    $l(cols.htmlElements[idx]).attr("style", "background-color: red");
  });
  // make apple too
};

SnakeView.prototype.step = function() {
  this.renderBoard();
  if (this.board.snake.alive) {
    this.board.snake.move();
  } else {
    alert("Your snake died. Refresh the page and try again if you want.");
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
