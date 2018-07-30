import Board from './board';
import Block from './block';

export default class Levels {

  constructor() {
    this.board = b;
    this.levelsBlocks = {
      1: level1Blocks,
      2: level2Blocks,
      3: level3Blocks,
      4: level4Blocks,
      5: level5Blocks,
      6: level6Blocks,
      7: level7Blocks,
      8: level8Blocks,
      9: level9Blocks,
    };
    this.levelsPositions = {
      1: level1Positions,
      2: level2Positions,
      3: level3Positions,
      4: level4Positions,
      5: level5Positions,
      6: level6Positions,
      7: level7Positions,
      8: level8Positions,
      9: level9Positions,
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
const vertical2Block6 = new Block([1,2], "vertical", 2, false, b);

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

const level4Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  horizontal3Block1,
  horizontal2Block1,
  horizontal2Block2,
  horizontal2Block3,
  horizontal2Block4,
  klaus
];

const level4Positions = [
  [0,2], [3,5], [0,1], [0,3], [3,0], [3,1], [0,4], [1,4], [5,0], [5,2], [2,0]
];

const level5Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical3Block3,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  horizontal3Block1,
  horizontal3Block2,
  horizontal2Block1,
  horizontal2Block2,
  klaus
];

const level5Positions = [
  [0,5], [2,2], [3,3], [0,1], [2,4], [4,0], [0,2], [1,2], [3,0], [5,1], [2,0]
];

const level6Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  vertical2Block4,
  horizontal3Block1,
  horizontal3Block2,
  horizontal3Block3,
  horizontal2Block1,
  horizontal2Block2,
  klaus
];

const level6Positions = [
  [0,3], [0,4], [0,5], [2,5], [2,0], [4,2], [4,3], [5,3], [0,0], [1,0], [3,2], [2,1]
];

const level7Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  vertical2Block4,
  horizontal3Block1,
  horizontal2Block1,
  horizontal2Block2,
  horizontal2Block3,
  klaus
];

const level7Positions = [
  [3,0], [2,3], [0,1], [0,4], [2,2], [4,2], [5,3], [0,2], [1,2], [4,4], [2,0]
];

const level8Blocks = [
  vertical3Block1,
  vertical3Block2,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  horizontal3Block1,
  horizontal3Block2,
  horizontal2Block1,
  horizontal2Block2,
  horizontal2Block3,
  klaus
];

const level8Positions = [
  [0,1], [1,4], [1,0], [0,5], [3,2], [0,2], [4,3], [3,0], [5,1], [5,3], [2,2]
];

const level9Blocks = [
  vertical3Block1,
  vertical2Block1,
  vertical2Block2,
  vertical2Block3,
  vertical2Block4,
  vertical2Block5,
  vertical2Block6,
  horizontal2Block1,
  horizontal2Block2,
  horizontal2Block3,
  horizontal2Block4,
  klaus
];

const level9Positions = [
  [0,4], [0,1], [0,5], [2,5], [1,2], [1,3], [3,3], [0,2], [5,1], [5,3], [3,1], [2,0]
];
