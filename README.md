# claustrophobe

![claustrophobe](https://i.imgur.com/ZQv94Ik.png)

## Summary
claustrophobe is a sleek, minimalist puzzle game designed to challenge the player's ability to slide the designated block (Klaus) to the exit in the least number of moves. It was created using HTML5 canvas with object oriented JavaScript.

Current features include:
* 6 by 6 board
* Vertically and horizontally sliding blocks
* Smooth click and drag block movement
* Multiple levels increasing in difficulty
* Unlimited undo
* Level reset button
* Sound effects for block movements and level completion

## Draggable canvas elements
In order to make the block elements on the canvas drag but not overlap, I used a combination of the game's core logic with canvas animation/mouse listeners. By calculating the mouse position relative to the canvas element, I determined whether or not clicking and holding resulted in a block being dragged. From there, I determined which moves were valid for that particular block and only allowed that block to slide between those valid positions.

In addition, because the game logic necessitates alignment with a 6 by 6 grid, I need to 'snap' blocks when the player releases them. By rounding the x and y positions to the nearest 100 pixels and only performing an actual move when a block reaches a new square, I prevent the move counter from incrementing when a dragged block is released in the same location in which it started:

```
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
```  

## Upcoming Features
* More levels
* Best move counts vs optimal move counts
* Back end for persisted user data 
