// create the snake
class Snake {
  constructor(size = 1, x = 4, y = 4) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.xs = 1; 
    this.ys = 1; 
  }

  move() {

    this.x += this.xs; 
    this.y += this.ys; 
    if (this.x >= 20 || this.x < 0)
      this.x -= this.xs; 
    if (this.y >= 20 || this.y < 0)
      this.y -= this.ys; 
    
    
  } 

  show() {
    gameGrid.grid[this.x][this.y] = 's'; 
  }

  update() {
    snake.move(); 
    snake.show(); 
  }
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
    this.divGrid = DOMStuff.constructGrid(this.size);
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

    let divGrid = []; 
    for (let i = 0; i < size; i++) {
      let row = []; 
      for (let j = 0; j < size; j++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        container.appendChild(div);
        row.push(div); 
      }
      divGrid.push(row)
    }
    return divGrid; 
  }

  function addSnakeClass (div) {
    div.classList.add('snake');
  }

  function removeClasses (div) {
    div.classList.remove('snake');
  }

  return {
    container,
    constructGrid,
    addSnakeClass,
    removeClasses
  };
})();


const gameFlow = (function () {
  function clear () {
    for (let i = 0; i < gameGrid.size; i++){
      for (let j = 0; j < gameGrid.size; j++){
        
        if (gameGrid.grid[i][j] === 's') {
          DOMStuff.removeClasses(gameGrid.divGrid[i][j])
        } 
        gameGrid.grid[i][j] = '';
      }
    }
  }
  
  function draw () {
    for (let i = 0; i < gameGrid.size; i++){
      for (let j = 0; j < gameGrid.size; j++){
        // console.log(gameGrid.grid[i][j])
        // console.log(gameGrid.divGrid[i][j])
        if (gameGrid.grid[i][j] === 's') {
          DOMStuff.addSnakeClass(gameGrid.divGrid[i][j])
        } 
      }
    }
  }

  function update () {
    clear();
    draw(); 
  }
  return {
    clear,
    draw,
    update, 
  }
})(); 




gameGrid = new Grid(20);
snake = new Snake();

function flow () {
  gameFlow.clear(); 
  gameGrid.addSnake(snake.x, snake.y); 
  gameFlow.draw(); 
  snake.update();
}
gameGrid.addSnake(snake.x, snake.y);

setInterval(flow, 1000)

