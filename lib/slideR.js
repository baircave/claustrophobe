import Board from './board';
import Block from './block';


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

const b = new Board();
const block1 = new Block([0,0], "horizontal", 3, false, b);
const block2 = new Block([1,2], "vertical", 3, false, b);
b.initializeBoard([block1, block2]);

const s = new SlideR(canvas, b);
