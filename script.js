// create the snake
class Snake {
  constructor(size = 1, x = 4, y = 4) {
    this.size = size;
    this.x = x;
    this.y = y;
  }

  moveLeft() {
    this.x--;
  }
  moveRight() {
    this.x++;
  }
  moveUp() {
    this.y--;
  }
  moveDown() {
    this.y++;
  }

  show() {}
}

class Grid {
  constructor(size) {
    this.size = size;
    this.grid = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push("");
      }
      this.grid.push(row);
    }
    DOMStuff.constructGrid(this.size);
  }

  addSnake(x, y) {
    this.grid[x][y] = "s";
  }
}

const DOMStuff = (function() {
  const container = document.querySelector(".container");
  function constructGrid(size) {
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        container.appendChild(div);
      }
    }
  }

  function drawSnake(x, y) {
    for (let i = 0; i < gameGrid.size; i++) {
      for (let j = 0; j < gameGrid.size; j++) {
        if (gameGrid.grid[i][j] === "s") console.log("snake");
      }
    }
  }
  return {
    container,
    constructGrid,
    drawSnake
  };
})();

gameGrid = new Grid(10);
snake = new Snake();
gameGrid.addSnake(snake.x, snake.y);
DOMStuff.drawSnake();
