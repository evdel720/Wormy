
function Coord() {
  this.CARDINALS = [[0,-1],[1,0],[0,1],[-1,0]];
}

Coord.prototype.plus = function(pos, cardIdx) {
  pos[0] += this.CARDINALS[cardIdx][0];
  pos[1] += this.CARDINALS[cardIdx][1];
  return pos;
};

Coord.prototype.equals = function(pos1, pos2){
  return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
};

Coord.prototype.isOpposite = function(cardIdx, currentKey){
  // if(){
  //
  // }
  // else{
  //
  // }
};

module.exports = Coord;
