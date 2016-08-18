const View = require('./snake_view');
const Board = require('./board');

$( () => {
  const board = new Board();
  const view = new View(board, $('.snake'));
});
