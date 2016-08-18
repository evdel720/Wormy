/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Board = __webpack_require__(4);
	
	$( () => {
	  const board = new Board();
	  const view = new View(board, $('.snake'));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(3);
	
	function Snake() {
	  this.directions = ["N", "E", "S", "W"];
	  this.currentDirection = this.directions[0];
	  this.head = [5,5];
	  this.coord = new Coord();
	  this.segments = [this.head];
	  this.snakeLength = 1;
	}
	
	Snake.prototype.move = function(){
	  // this.segments.forEach((segment) => {
	  //   segment.plus(this.directions.indexOf(this.currentDirection));
	  // });
	  let cardIdx = this.directions.indexOf(this.currentDirection);
	  let newPos = this.coord.plus(this.head, cardIdx);
	  this.segments.shift(newPos);
	  this.segments = this.segments.slice(0, this.snakeLength);
	  this.head = newPos;
	};
	
	Snake.prototype.turn = function(newDirection){
	  console.log(newDirection);
	  this.currentDirection = newDirection;
	};
	
	
	module.exports = Snake;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(2);
	
	function Board(){
	  this.grid = this.makeGrid();
	  this.snake = new Snake();
	}
	
	Board.prototype.makeGrid = function(){
	  let grid = [];
	  for(let i = 0; i < 20; i++){
	    let row = [];
	    for(let j = 0; j < 20; j++){
	      row.push(undefined);
	    }
	    grid.push(row);
	  }
	  return grid;
	};
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map