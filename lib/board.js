import Block from './block';

export default class Board {

  constructor(/*TODO initial state stuff */) {
    // this.roundOver
    this.originalPositions = [];
    this.grid = this.makeGrid();
    this.blocks = [];
    this.moveCount = 0;
    this.previousMoves = [];
  }

  makeGrid() {
    const arr = new Array(6);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(6);
    }
    return arr;
  }

  initializeBoard(blocks) {
    this.blocks = [];
    blocks.forEach((block) => {
      this.originalPositions.push(block.position.slice());
      this.addBlock(block);
      this.blocks.push(block);
    });
  }

  resetPositions() {
    this.grid = this.makeGrid();
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].setPosition(this.originalPositions[i]);
      this.addBlock(this.blocks[i]);
    }
  }

  addBlock(block) {
    if (block.orientation === "horizontal") {
      this.addHorizontalBlock(block);
    } else {
      this.addVerticalBlock(block);
    }
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
    this.previousMoves = [];
    this.moveCount = 0;
    this.resetPositions();
  }
}
