/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/slideR.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/block.js":
/*!**********************!*\
  !*** ./lib/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Block; });
const faces = [
  document.getElementById("face-1"),
  document.getElementById("face-2"),
  document.getElementById("face-3")
];


class Block {

  constructor(position, orientation, length, target, board) {
    this.position = position || [-1, -1];
    this.orientation = orientation;
    this.length = length;
    this.target = target || false;
    this.board = board;
    this.x = this.position[1] * 100; //vertex for top left corner
    this.y = this.position[0] * 100;

    if (orientation === "horizontal") {
      this.width = length * 100; //vertex for bottom right corner
      this.height = 100;
    } else {
      this.width = 100;
      this.height = length * 100;
    }
  }

  maxVertex() {
    if (this.orientation === "horizontal") {
      return [this.x + this.length * 100, this.y + 100];
    } else {
      return [this.x + 100, this.y + this.length * 100];
    }
  }

  setX(newX) {
    const minX = this.minValidXYValues()[0];
    const maxX = this.maxValidXYValues()[0];
    if (newX <= maxX && newX >= minX) {
      this.x = newX;
    } else if (newX > maxX) {
      this.x = maxX;
    } else {
      this.x = minX;
    }
  }

  setY(newY) {
    const minY = this.minValidXYValues()[1];
    const maxY = this.maxValidXYValues()[1];
    if (newY <= maxY && newY >= minY) {
      this.y = newY;
    } else if (newY > maxY) {
      this.y = maxY;
    } else {
      this.y = minY;
    }
  }


  minValidXYValues() {
    const validMoves = this.validMoves();
    let minX;
    let minY;
    validMoves.forEach((move) => {
      if (move[1] < minX || minX === undefined) {
        minX = move[1];
      }
      if (move[0] < minY || minY === undefined) {
        minY = move[0];
      }
    });

    return [minX * 100, minY * 100];
  }

  maxValidXYValues() {
    const validMoves = this.validMoves();
    let maxX;
    let maxY;
    validMoves.forEach((move) => {
      if (move[1] > maxX || maxX === undefined) {
        maxX = move[1];
      }
      if (move[0] > maxY || maxY === undefined) {
        maxY = move[0];
      }
    });

    return [maxX * 100, maxY * 100];
  }


  finalMove(startPos) {
    const block = this.board.grid[startPos[0]][startPos[1]];
    if (block.target === true) {
      for (let c = startPos[1] + block.length; c < 6; c++) {
        if (Boolean(this.board.grid[startPos[0]][c])) {
          return false;
        }
      }
    }
    return true;
  }

  validMoves() {
    const block = this.board.grid[this.position[0]][this.position[1]];
    const moves = [this.position];

    if (block.orientation === "horizontal") {
      for (let c = this.position[1] + block.length; c < 6; c++) {
        if (!Boolean(this.board.grid[this.position[0]][c])) {
          moves.push([this.position[0], c + 1 - block.length]);
        } else {
          break;
        }
      }
      for (let c = this.position[1] - 1; c >= 0; c--) {
        if (!Boolean(this.board.grid[this.position[0]][c])) {
          moves.push([this.position[0], c]);
        } else {
          break;
        }
      }
    }

    if (block.orientation === "vertical") {
      for (let r = this.position[0] + block.length; r < 6; r++) {
        if (!Boolean(this.board.grid[r][this.position[1]])) {
          moves.push([r + 1 - block.length, this.position[1]]);
        } else {
          break;
        }
      }
      for (let r = this.position[0] - 1; r >= 0; r--) {
        if (!Boolean(this.board.grid[r][this.position[1]])) {
          moves.push([r, this.position[1]]);
        } else {
          break;
        }
      }
    }

    return moves;
  }

  move(newPos, isUndo) {
    console.log(this.board);
    if (this.position === newPos) {
      return;
    }

    this.x = newPos[1] * 100;
    this.y = newPos[0] * 100;

    const oldPos = this.position;

    for (let i = 0; i < this.length; i++) {
      if (this.orientation === "horizontal") {
        this.board.grid[this.position[0]][this.position[1] + i] = null;
      } else {
        this.board.grid[this.position[0] + i][this.position[1]] = null;
      }
    }

    for (let i = 0; i < this.length; i++) {
      if (this.orientation === "horizontal") {
        this.board.grid[newPos[0]][newPos[1] + i] = this;
      } else {
        this.board.grid[newPos[0] + i][newPos[1]] = this;
      }
    }

    this.position = newPos;
    if (isUndo) {
      this.board.moveCount -= 1;
    } else {
      this.board.moveCount += 1;
      this.board.previousMoves.push([oldPos, newPos]);
    }

  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;
    const height = this.height;
    const width = this.width;
    const radius = 10;
    let blockColor = "#a2a2f2";
    if (this.target) {
      blockColor = this.targetColor();
    }
    ctx.fillStyle = blockColor;
    ctx.beginPath();

    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);

    ctx.fill();
    ctx.closePath();

    if (this.target) {
      ctx.drawImage(
        this.pickFace(),
        this.x + 120 + Math.floor(Math.random() * 5),
        this.y + 10 + Math.floor(Math.random() * 5));
    }
  }

  //tests mouse coordinates to see if this block is being dragged
  contains(mx, my) {
    return (
      (mx >= this.x && mx <= this.maxVertex()[0]) &&
      (my >= this.y && my <= this.maxVertex()[1])
    );
  }

  //makes sure blocks only ever reposition on the 6x6 grid
  snapToGrid() {
    let roundedX = Math.round(this.x / 100) * 100;
    let roundedY = Math.round(this.y / 100) * 100;
    if (roundedX + this.width > 600) {
      roundedX -= 100;
    }
    if (roundedY + this.height > 600) {
      roundedY -= 100;
    }
    this.x = roundedX;
    this.y = roundedY;

    // only move if the new position is different from the previous position
    if (this.position[0] !== roundedY/100 || this.position[1] !== roundedX/100) {
      this.move([roundedY/100, roundedX/100]);
    }

  }

  //changes Clauds color based on closeness to right side of grid
  targetColor() {
    const bValue = 255 - ((255 * this.x) / 500);
    const gValue = 50 + (200 * this.x) / 500;
    return `rgb(${Math.floor(bValue)}, ${Math.floor(gValue)}, ${Math.floor(bValue)})`;
  }

  //picks silly faces for Claud
  pickFace() {
    if (this.x < 200) {
      return faces[0];
    } else if (this.x >= 200 && this.x <= 300) {
      return faces[1];
    } else {
      return faces[2];
    }
  }


}


/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./lib/block.js");


class Board {

  constructor(/*TODO initial state stuff */) {
    const arr = new Array(6);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(6);
    }
    this.grid = arr;
    this.blocks = [];
    this.moveCount = 0;
    this.previousMoves = [];
  }


  initializeBoard(blocks) {
    blocks.forEach((block) => {
      this.addBlock(block);
    });
  }

  addBlock(block) {
    if (block.orientation === "horizontal") {
      this.addHorizontalBlock(block);
    } else {
      this.addVerticalBlock(block);
    }
    this.blocks.push(block);
  }

  addVerticalBlock(block) {
    const r = block.position[0];
    const c = block.position[1];
    for (var i = 0; i < block.length; i++) {
      this.grid[r + i][c] = block;
    }
  }

  addHorizontalBlock(block) {
    const r = block.position[0];
    const c = block.position[1];
    for (var i = 0; i < block.length; i++) {
      this.grid[r][c + i] = block;
    }
  }

  undoMove() {
    const lastMove = this.previousMoves.pop();
    if (!lastMove) {
      return;
    }

    const oldPos = lastMove[0];
    const newPos = lastMove[1];

    const block = this.grid[newPos[0]][newPos[1]];

    block.move(oldPos, true);
  }

  resetBoard() {
    //TODO write reset method
  }
}


/***/ }),

/***/ "./lib/slideR.js":
/*!***********************!*\
  !*** ./lib/slideR.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block */ "./lib/block.js");




class SlideR {

  constructor(canvas, board) {
    this.html= document.getElementById("html");
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");
    this.undo = document.getElementById("undo");
    this.reset = document.getElementById("reset");
    this.moveCounter = document.getElementById("move-counter");

    this.board = board;
    this.rerender = true;
    this.shapes = board.blocks || [];
    this.selection = null;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.addMouseListeners();
    this.addButtonListeners();

    setInterval(() => this.draw(), 30);

  }

  draw() {
    // if (this.rerender) {
      this.moveCounter.innerHTML = this.board.moveCount;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].draw(this.ctx);
      }

    //   this.rerender = false;
    // }
  }

  getMouse(e) {
    let element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    while (element.offsetParent) {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
      element = element.offsetParent;
    }

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    return {x: mx, y: my};
  }

  addMouseListeners() {
    this.canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

    this.canvas.addEventListener('mousedown', (e) => {
      const mouse = this.getMouse(e);
      const mx = mouse.x;
      const my = mouse.y;
      for (var i = 0; i < this.shapes.length; i++) {
        if (this.shapes[i].contains(mx, my)) {
          const shape = this.shapes[i];

          this.offsetX = mx - this.shapes[i].x;
          this.offsetY = my - this.shapes[i].y;

          this.dragging = true;
          this.selection = this.shapes[i];
          this.rerender = true;
        }
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.dragging) {
        const mouse = this.getMouse(e);
        if (this.selection.orientation === "horizontal") {
          this.selection.setX(mouse.x - this.offsetX);
        } else {
          this.selection.setY(mouse.y - this.offsetY);
        }
        this.rerender = true;
      }
    });

    this.html.addEventListener('mouseup', this.mouseUpCallback.bind(this));
  }

  mouseUpCallback(e)  {
    this.dragging = false;
    if (this.selection) {
      this.selection.snapToGrid();
    }
    this.selection = null;
    this.rerender = true;
  }

  addButtonListeners() {
    this.undo.addEventListener("click", () => {
      this.board.undoMove();
      this.rerender = true;
    });

    this.reset.addEventListener("click", () => {
      this.board.resetBoard();
      this.rerender = true;
    });


  }
}

const canvas = document.getElementById("game-canvas");

const b = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]();
const block1 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([0,0], "horizontal", 3, false, b);
const block2 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([1,2], "vertical", 3, false, b);
const block3 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([0,5], "vertical", 3, false, b);
const block4 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([2,0], "horizontal", 2, true, b);
const block5 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([3,0], "vertical", 2, false, b);
const block6 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([3,4], "horizontal", 2, false, b);
const block7 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([5,0], "horizontal", 3, false, b);
const block8 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([4,4], "vertical", 2, false, b);
b.initializeBoard([
  block1,
  block2,
  block3,
  block4,
  block5,
  block6,
  block7,
  block8
]);

const s = new SlideR(canvas, b);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map