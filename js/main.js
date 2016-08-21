const $l = require('./jquery_lite/jquery_lite');
const SnakeView = require('./snake_view');

$l( () => {
  const snakeView = new SnakeView($l('.snake'));
});
