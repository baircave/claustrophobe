const faces = [
  document.getElementById("face-1"),
  document.getElementById("face-2"),
  document.getElementById("face-3")
];


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
