import Board from './board';
import Block from './block';

export default class GameView {

  constructor(canvas, board, game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.moveCounter = document.getElementById("move-counter");
    this.muteIcon = document.getElementById("mute-icon");

    this.board = board;
    this.game = game;
    this.selection = null;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.addMouseListeners();
    this.addButtonListeners();

    setInterval(() => this.draw(), 20);
  }

  draw() {
    this.moveCounter.innerHTML = `${this.board.moveCount}`;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "22px Merienda";
    this.ctx.fillStyle = "white";

    if (this.game.level == 0) this.drawFirstLevel();
    if (this.game.level == 1) this.drawSecondLevel();

    for (let i = 0; i < this.board.blocks.length; i++) {
      this.board.blocks[i].draw(this.ctx);
    }
  }

  drawFirstLevel() {
    this.ctx.fillText("Meet Klaus, the claustrophobic block.", 3, 120);
    this.ctx.fillText("Help Klaus escape by dragging him", 3, 150);
    this.ctx.fillText("to the exit on the right.", 3, 180);
    this.drawArrow();
  }

  drawSecondLevel() {
    this.ctx.fillText("Sometimes other blocks are in the way.", 84, 440);
    this.ctx.fillText("Drag them around to get Klaus to the exit.", 70, 470);
    this.ctx.fillText("All blocks can only drag on their longer axis.", 60, 500);
    this.drawArrow();
  }

  drawArrow() {
    const arrow = new Image();
    arrow.src = "./images/right_arrow_1.png";
    this.ctx.rotate(0.5);
    this.ctx.drawImage(arrow, 490, -160, 150, 150);
    this.ctx.rotate(-0.5);
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
      for (var i = 0; i < this.board.blocks.length; i++) {
        if (this.board.blocks[i].contains(mx, my)) {
          const shape = this.board.blocks[i];

          this.offsetX = mx - this.board.blocks[i].x;
          this.offsetY = my - this.board.blocks[i].y;

          this.dragging = true;
          this.selection = this.board.blocks[i];
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
      }
    });

    const html = document.getElementById("html");
    html.addEventListener('mouseup', this.mouseUpCallback.bind(this));
  }

  mouseUpCallback(e)  {
    this.dragging = false;
    if (this.selection) {
      this.selection.snapToGrid();
    }
    this.selection = null;
  }

  addButtonListeners() {
    const undo = document.getElementById("undo");
    undo.addEventListener("click", () => {
      this.board.undoMove();
    });

    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
      this.board.resetBoard();
    });

    const audio = document.getElementById("audio");
    const muteButton = document.getElementById("mute-button");
    muteButton.addEventListener("click", () => {
      if (audio.muted) {
        audio.muted = false;
        this.muteIcon.classList.remove("fa-volume-off");
        this.muteIcon.classList.add("fa-volume-up");
      } else {
        audio.muted = true;
        this.muteIcon.classList.remove("fa-volume-up");
        this.muteIcon.classList.add("fa-volume-off");
      }
    });

  }

}
