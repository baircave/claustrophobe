import Board from './board';
import Block from './block';

export default class Levels {

  constructor() {
    this.board = b;
    this.levelsBlocks = {
      1: level1Blocks,
      2: level2Blocks,
      3: level3Blocks
    };
    this.levelsPositions = {
      1: level1Positions,
      2: level2Positions,
      3: level3Positions
    };
  }
}

const b = new Board();

const klaus = new Block([2,0], "horizontal", 2, true, b);

const horizontal3Block1 = new Block([0,0], "horizontal", 3, false, b);
const horizontal3Block2 = new Block([5,0], "horizontal", 3, false, b);
const horizontal3Block3 = new Block([0,0], "horizontal", 3, false, b);
const horizontal3Block4 = new Block([0,0], "horizontal", 3, false, b);
const horizontal3Block5 = new Block([0,0], "horizontal", 3, false, b);

const vertical3Block1 = new Block([1,2], "vertical", 3, false, b);
const vertical3Block2 = new Block([0,5], "vertical", 3, false, b);
const vertical3Block3 = new Block([0,0], "vertical", 3, false, b);
const vertical3Block4 = new Block([0,0], "vertical", 3, false, b);
const vertical3Block5 = new Block([0,0], "vertical", 3, false, b);

const vertical2Block1 = new Block([3,0], "vertical", 2, false, b);
const vertical2Block2 = new Block([4,4], "vertical", 2, false, b);
const vertical2Block3 = new Block([1,2], "vertical", 2, false, b);
const vertical2Block4 = new Block([1,2], "vertical", 2, false, b);
const vertical2Block5 = new Block([1,2], "vertical", 2, false, b);

const horizontal2Block1 = new Block([3,4], "horizontal", 2, false, b);
const horizontal2Block2 = new Block([1,2], "horizontal", 2, false, b);
const horizontal2Block3 = new Block([1,2], "horizontal", 2, false, b);
const horizontal2Block4 = new Block([1,2], "horizontal", 2, false, b);
const horizontal2Block5 = new Block([1,2], "horizontal", 2, false, b);

const level1Blocks = [
  horizontal3Block1,
  horizontal3Block2,
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  horizontal2Block1,
  klaus
];

const level1Positions = [
  [0,0], [5,0], [1,2], [0,5], [3,0], [4,4], [3,4], [2,0],
];

const level2Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  horizontal2Block1,
  horizontal2Block2,
  klaus
];

const level2Positions = [
  [1,3], [1,4], [1,2], [3,2], [4,1], [3,0], [5,2], [2,0]
];

const level3Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  horizontal3Block1,
  horizontal2Block1,
  horizontal2Block2,
  klaus
];

const level3Positions = [
  [2,3], [2,4], [0,0], [1,2], [4,0], [0,1], [0,3], [2,0]
];
