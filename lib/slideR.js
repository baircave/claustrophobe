import Board from './board';
import Block from './block';


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
      this.moveCounter.innerHTML = `${this.board.moveCount}`;
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

const b = new Board();
const block4 = new Block([2,0], "horizontal", 2, true, b);
const block1 = new Block([0,0], "horizontal", 3, false, b);
const block2 = new Block([1,2], "vertical", 3, false, b);
const block3 = new Block([0,5], "vertical", 3, false, b);
const block5 = new Block([3,0], "vertical", 2, false, b);
const block6 = new Block([3,4], "horizontal", 2, false, b);
const block7 = new Block([5,0], "horizontal", 3, false, b);
const block8 = new Block([4,4], "vertical", 2, false, b);
b.initializeBoard([
  block4,
  block1,
  block2,
  block3,
  block5,
  block6,
  block7,
  block8
]);

const s = new SlideR(canvas, b);
