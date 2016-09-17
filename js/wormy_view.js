const Board = require('./board');
const $l = require('./jquery_lite/jquery_lite');
const coord = require('./coord');

function WormyView($el){
  this.$el = $el;
  this.board = new Board();
  this.makeBoard();
  this.interval = window.setInterval(this.step.bind(this), 100);

  $l('body').on("keydown", (event) => {
    this.handleKeyEvent(event.keyCode);
  });
}

WormyView.prototype.renderBoard = function() {
  let cols = $l('li');
  cols.attr("style", "");
  let appleIdx = this.board.getIdxOfPos(this.board.apple);
  $l(cols.htmlElements[appleIdx]).attr("style", "background-color: red; border-radius: 10px");

  this.board.wormy.segments.forEach((segment) => {
    let wormyIdx = this.board.getIdxOfPos(segment.split(" "));

    $l(cols.htmlElements[wormyIdx]).attr("style", "background-color: green;  border-radius: 10px");
  });
};

WormyView.prototype.step = function() {
  this.renderBoard();
  if (this.board.wormy.alive) {
    this.board.wormy.move();
  } else {
    $l('h1').html("Your wormy died : (");
    $l('.start').html('Click Here to retry!');
    $l('.board').attr("style", "background-color: #ccc");
    window.clearInterval(this.interval);
  }
};

WormyView.prototype.handleKeyEvent = function(keyCode) {
  switch(keyCode) {
    case 37:
      this.board.wormy.turn("W");
      break;
    case 38:
      this.board.wormy.turn("N");
      break;
    case 39:
      this.board.wormy.turn("E");
      break;
    case 40:
      this.board.wormy.turn("S");
      break;
  }
};

WormyView.prototype.makeBoard = function() {
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

module.exports = WormyView;
