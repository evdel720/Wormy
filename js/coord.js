const directions = ["N", "E", "S", "W"];
const cardinal = [[0,-1],[1,0],[0,1],[-1,0]];
const oppositeSets = ["NS", "SN", "EW", "WE"];

function Coord() {
}

Coord.prototype.plus = function(pos, direction) {
  let cardIdx = directions.indexOf(direction);
  let newPos = [pos[0] + cardinal[cardIdx][0], pos[1] + cardinal[cardIdx][1]];
  return newPos;
};

Coord.prototype.equals = function(pos1, pos2){
  return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
};

Coord.prototype.isOpposite = function(snakeDirection, keyDirection){
  return oppositeSets.includes([snakeDirection, keyDirection].join(""));
};


const coord = new Coord();

module.exports = coord;
