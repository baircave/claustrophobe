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
    this.setMaxVertex();
  }

  setMaxVertex() {
    if (this.orientation === "horizontal") {
      this.maxX = this.x + this.length * 100; //vertex for bottom right corner
      this.maxY = this.y + 100;
    } else {
      this.maxX = this.x + 100; //vertex for bottom right corner
      this.maxY = this.y + this.length * 100;
    }
  }

  setX(newX) {
    if ((newX + this.width) >= 600) {
      this.x = 600 - this.width;
    } else if (newX < 0) {
      this.x = 0;
    } else {
      this.x = newX;
    }
  }

  setY(newY) {
    if ((newY + this.height) >= 600) {
      this.y = 600 - this.height;
    } else if (newY < 0) {
      this.y = 0;
    } else {
      this.y = newY;
    }
  }

  // legalXYValues() {
  //   const validMoves = this.validMoves();
  //
  // }

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
    const moves = [];

    if (block.orientation === "horizontal") {
      for (let c = this.position[1] + block.length; c < 6; c++) {
        if (!Boolean(this.board.grid[this.position[0]][c])) {
          moves.push([this.position[0], c + 1 - block.length]);
        }
      }
      for (let c = this.position[1] - 1; c >= 0; c--) {
        if (!Boolean(this.board.grid[this.position[0]][c])) {
          moves.push([this.position[0], c]);
        }
      }
    }

    if (block.orientation === "vertical") {
      for (let r = this.position[0] + block.length; r < 6; r++) {
        if (!Boolean(this.board.grid[r][this.position[1]])) {
          moves.push([r + 1 - block.length, this.position[1]]);
        }
      }
      for (let r = this.position[0] - 1; r >= 0; r--) {
        if (!Boolean(this.board.grid[r][this.position[1]])) {
          moves.push([r, this.position[1]]);
        }
      }
    }

    return moves;
  }

  move(newPos) {
    for (let i = 0; i < this.length; i++) {
      if (this.orientation === "horizontal") {
        this.board.grid[position[0]][position[1] + i] = null;
      } else {
        this.board.grid[position[0] + i][position[1]] = null;
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
  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;
    const height = this.height;
    const width = this.width;
    const radius = 10;
    ctx.fillStyle = "#a2a2f2";
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
  }

  contains(mx, my) {
    return (
      (mx >= this.x && mx <= this.maxX) &&
      (my >= this.y && my <= this.maxY)
    );
  }

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

    this.rerender = true;
    this.shapes = board.blocks || [];
    this.selection = null;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.addMouseListeners();

    setInterval(() => this.draw(), 30);

  }

  draw() {
    if (this.rerender) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "BLACK";
      this.ctx.fillRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].draw(this.ctx);
      }

      this.rerender = false;
    }
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
          // Keep track of where in the object we clicked
          // so we can move it smoothly (see mousemove)
          this.offsetX = mx - this.shapes[i].x;
          this.offsetY = my - this.shapes[i].y;

          // if (shape.orientation === "horizontal") {
          //   this.offsetY = 0;
          // } else {
          //   this.offsetX = 0;
          // }

          this.dragging = true;
          this.selection = this.shapes[i];
          this.rerender = true;
        }
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.dragging) {
        const mouse = this.getMouse(e);
        // We don't want to drag the object by its top-left corner, we want to drag it
        // from where we clicked. Thats why we saved the offset and use it here
        if (this.selection.orientation === "horizontal") {
          this.selection.setX(mouse.x - this.offsetX);
        } else {
          this.selection.setY(mouse.y - this.offsetY);
        }
        this.selection.setMaxVertex();
        this.rerender = true; // Something's dragging so we must redraw
      }
    });

    // this.canvas.addEventListener('mouseup', this.mouseUpCallback.bind(this));

    this.html.addEventListener('mouseup', this.mouseUpCallback.bind(this));
  }

  mouseUpCallback(e)  {
    this.dragging = false;
    this.shapes.forEach(block => block.snapToGrid());
    this.rerender = true;
  }
}

const canvas = document.getElementById("game-canvas");

const b = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]();
const block1 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([0,0], "horizontal", 3, false, b);
const block2 = new _block__WEBPACK_IMPORTED_MODULE_1__["default"]([1,2], "vertical", 3, false, b);
b.initializeBoard([block1, block2]);

const s = new SlideR(canvas, b);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map