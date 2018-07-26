import Block from './block';

export default class Board {

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
