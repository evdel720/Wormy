const $l = require('./jquery_lite/jquery_lite');
const WormyView = require('./wormy_view');

$l( () => {
  $l('.start').on('click', (e) => {
    $l('.wormy').empty();
    $l('h1').html("Wormy : )");
    $l('.start').html('Click Here to start!');
    const wormyView = new WormyView($l('.wormy'));
  });
});
