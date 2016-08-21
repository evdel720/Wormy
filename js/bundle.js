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

	const $l = __webpack_require__(1);
	const SnakeView = __webpack_require__(2);
	
	$l( () => {
	  const snakeView = new SnakeView($l('.snake'));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(6);
	
	function $l (selector) {
	  if (typeof selector === "function") {
	    document.addEventListener("DOMContentLoaded", selector);
	    return;
	  }
	
	  let object = [selector];
	
	  if (typeof selector === "string") {
	    if (selector.indexOf("<") === -1 ) {
	      selector = document.querySelectorAll(selector);
	      object = Array.from(selector);
	    } else {
	      let tag = selector.match(/<(.+)><\//)[1];
	      object = [document.createElement(tag)];
	    }
	  }
	
	  return new DOMNodeCollection(object);
	}
	
	$l.prototype.extend = function (first, ...objects) {
	  objects.forEach((ob) => {
	    Object.keys(ob).forEach((key) => {
	      first.key = ob.key;
	    });
	  });
	
	  return first;
	};
	
	$l.prototype.ajax = function (options) {
	  const xhr = new XMLHttpRequest();
	  let defaults = {type: "GET",
	                  dataType: "json",
	                  error: () => console.log("error!"),
	                  data: {}
	  };
	  options = this.extend(defaults, options);
	  xhr.open(options.type, options.url);
	
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      options.success(xhr.response);
	    } else {
	      options.error();
	    }
	  };
	
	  xhr.send(options.data);
	};
	
	
	module.exports = $l;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);
	const $l = __webpack_require__(1);
	const coord = __webpack_require__(5);
	
	function SnakeView($el){
	  this.$el = $el;
	  this.board = new Board();
	  this.makeBoard();
	  this.interval = window.setInterval(this.step.bind(this), 100);
	
	  $l('body').on("keydown", (event) => {
	    this.handleKeyEvent(event.keyCode);
	  });
	}
	
	SnakeView.prototype.renderBoard = function() {
	  let cols = $l('li');
	  cols.attr("style", "");
	  let appleIdx = this.board.getIdxOfPos(this.board.apple);
	  $l(cols.htmlElements[appleIdx]).attr("style", "background-color: red");
	
	  this.board.snake.segments.forEach((segment) => {
	    let snakeIdx = this.board.getIdxOfPos(segment.split(" "));
	
	    $l(cols.htmlElements[snakeIdx]).attr("style", "background-color: green");
	  });
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(4);
	
	function Board(){
	  this.grid = 20;
	  this.snake = new Snake(this, this.getRandomPos());
	  this.apple = this.getRandomPos();
	}
	
	Board.prototype.getRandomPos = function() {
	  let x = Math.floor(Math.random() * this.grid);
	  let y = Math.floor(Math.random() * this.grid);
	  return [x, y];
	};
	
	Board.prototype.updateApple = function() {
	  this.apple = this.getRandomPos();
	};
	
	Board.prototype.getIdxOfPos = function(pos) {
	  return parseInt(pos[1]) * this.grid + parseInt(pos[0]);
	};
	
	
	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const coord = __webpack_require__(5);
	
	function Snake(board, pos) {
	  this.direction = 'N';
	  this.head = pos;
	  this.segments = [this.head.join(" ")];
	  this.snakeLength = 1;
	  this.board = board;
	  this.alive = true;
	}
	
	Snake.prototype.updateLength = function() {
	  this.snakeLength += 1;
	};
	
	Snake.prototype.move = function() {
	  let newPos = coord.plus(this.head, this.direction);
	
	  if (this.inGrid(newPos)) {
	    if (coord.equals(newPos, this.board.apple)) {
	      this.updateLength();
	      this.board.updateApple();
	    } else if (this.segments.includes(newPos.join(" "))) {
	      this.alive = false;
	      return;
	    }
	    this.segments.unshift(newPos.join(" "));
	    this.segments = this.segments.slice(0, this.snakeLength);
	    this.head = newPos;
	  } else {
	    this.alive = false;
	  }
	};
	
	Snake.prototype.inGrid = function(pos) {
	  let xValid = (pos[0] >= 0 && pos[0] < this.board.grid);
	  let yValid = (pos[1] >= 0 && pos[1] < this.board.grid);
	  return (xValid && yValid);
	};
	
	Snake.prototype.turn = function(newDirection){
	  if (!coord.isOpposite(this.direction, newDirection)) {
	    this.direction = newDirection;
	  }
	};
	//
	// let b = {};
	// b.grid = 20;
	// let s = new Snake(b);
	// s.move();
	// s.move();
	// s.move();
	// s.move();
	// s.move();
	// s.move();
	// console.log(s);
	// console.log(s.checkOver());
	
	
	module.exports = Snake;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlElements) {
	    this.htmlElements = htmlElements;
	  }
	
	  html(str) {
	    if (str === undefined) {
	      return [this.htmlElements[0].innerHTML];
	    } else {
	      this.htmlElements.forEach((el) => {
	        el.innerHTML = str;
	      });
	      return this.htmlElements;
	    }
	  }
	
	  empty() {
	    this.htmlElements.forEach((el) => {
	      el.innerHTML = "";
	    });
	    return this.htmlElements;
	  }
	
	  append(input) {
	    if (typeof input === "string") {
	      this.htmlElements.forEach((htmlEl) => {
	        htmlEl.innerHTML += input;
	      });
	    } else {
	      input.htmlElements.forEach((el) => {
	        this.htmlElements.forEach((htmlEl) => {
	          htmlEl.innerHTML += el.outerHTML;
	        });
	      });
	    }
	    return this.htmlElements;
	  }
	
	  attr(key, value) {
	    if (value === undefined) {
	      return this.htmlElements[0].getAttribute(key);
	    } else {
	      this.htmlElements.forEach((el) => {
	        el.setAttribute(key, value);
	      });
	    }
	  }
	
	  addClass(str) {
	    this.htmlElements.forEach((el) => {
	      el.className += " " + str;
	    });
	  }
	
	  removeClass(str) {
	    this.htmlElements.forEach((el) => {
	      let classNames = el.className.split(" ");
	      if (classNames.includes(str)) {
	        classNames.splice(classNames.indexOf(str), 1);
	      }
	
	      el.className = classNames.join(" ");
	    });
	  }
	
	  children() {
	    let kids = [];
	    this.htmlElements.forEach((el) => {
	      kids = kids.concat(el.children);
	    });
	
	    return kids;
	  }
	
	  parent() {
	    let parents = [];
	    this.htmlElements.forEach((el) => {
	      parents = parents.concat(el.parentNode);
	    });
	
	    return parents;
	  }
	
	  find(selector) {
	    let result = [];
	    this.htmlElements.forEach((el) => {
	      result = result.concat(el.querySelectorAll(selector));
	    });
	
	    return result;
	  }
	
	  remove() {
	    this.htmlElements.forEach((el) => {
	      el.outerHTML = "";
	    });
	  }
	
	  on(trigger, callback) {
	    this.htmlElements.forEach((el) => {
	      el.addEventListener(trigger, callback);
	    });
	  }
	
	  off(trigger, callback) {
	    this.htmlElements.forEach((el) => {
	      el.removeEventListener(trigger, callback);
	    });
	  }
	
	}
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map