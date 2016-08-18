function SnakeView(board, $el){
  this.board = board;
  this.$el = $el;
  
  $('body').on("keydown", (event) => {
    this.handleKeyEvent(event.keyCode);
  });
}

//left 37, up 38, right 39, down 40

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

module.exports = SnakeView;
