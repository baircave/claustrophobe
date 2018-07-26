export default class Block {

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
