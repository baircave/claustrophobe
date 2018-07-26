import Board from 'board';

class Game {

  constructor(level = 0) {
    this.level = level;
    this.board = new Board();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }


}

Game.BG_COLOR = "#000000";
Game.DIM_X = 700;
Game.DIM_Y = 700;
