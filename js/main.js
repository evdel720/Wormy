const $l = require('./jquery_lite/jquery_lite');
const SnakeView = require('./snake_view');

$l( () => {
  $l('.start').on('click', (e) => {
    $l('.snake').empty();
    $l('h1').html("Wormy : )");
    $l('.start').html('Click Here to start!');
    const snakeView = new SnakeView($l('.snake'));
  });
});
