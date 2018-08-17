import Board from './board';
import Block from './block';
import GameView from './game_view';
import Levels from './levels';

class Game {

  constructor() {
    this.level = 0;
    this.board = levels.board;
    for (let i = 0; i <= 10; i++) {
      const levelButton = document.getElementById(`lvl${i}`);
      levelButton.addEventListener("click", () => this.switchLevel(i));
    }
    this.runGame();
  }

  runGame() {
    this.switchLevel(this.level);
    new GameView(
      document.getElementById("game-canvas"),
      this.board,
      this
    );
  }

  switchLevel(levelNum) {
    this.setCurrentLevel(levelNum);
    const blocks = levels.levelsBlocks[levelNum];
    const positions = levels.levelsPositions[levelNum];
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].setPosition(positions[i]);
    }

    this.board.initializeBoard(blocks);
  }

  setCurrentLevel(levelNum) {
    const prevLevelButton = document.getElementById(`lvl${this.level}`);
    const currLevelButton = document.getElementById(`lvl${levelNum}`);
    this.level = levelNum;

    prevLevelButton.classList.remove("current-level");
    currLevelButton.classList.add("current-level");
  }

}

const levels = new Levels();
const game = new Game();
levels.board.game = game;
