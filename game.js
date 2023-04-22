window.onload = function() {
  const container = document.querySelector('.container');
  const player = document.querySelector('.player');

document.addEventListener('keydown', (e) => {
  const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  if (arrowKeys.includes(e.key)) {
    e.preventDefault();
    const containerWidth = container.offsetWidth;
    const xPos = (player.offsetLeft - containerWidth / 2) / 10;
    const yPos = (window.innerHeight / 2 - player.offsetTop) / 10;
    let xMovement = 0;
    let yMovement = 0;
    if (e.key === "ArrowLeft") {
      xMovement = -10;
    } else if (e.key === "ArrowRight") {
      xMovement = 10;
    } else if (e.key === "ArrowUp") {
      yMovement = -10;
    } else if (e.key === "ArrowDown") {
      yMovement = 10;
    }
    player.style.left = `${player.offsetLeft + xMovement}px`;
    player.style.top = `${player.offsetTop + yMovement}px`;
    container.style.backgroundPosition = `${xPos + xMovement}px ${yPos + yMovement}px`;
  }
});
}  

// Define the canvas and get the context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the Canvas dimensions
canvas.width = 900;
canvas.height = 600;

// Load the Background image
const backgroundImage = new Image();
backgroundImage.src = "images/background.png";

// Player object
const player = {
  x: 50,
  y: 50,
  width: 150,
  height: 150,
  speed: 2,
  jumping: false,
  rightPressed: false,
  leftPressed: false,
};

// Coin object
const coin = {
  x: 300,
  y: 300,
  width: 50,
  height: 50,
  image: new Image(),
}

// Platform object
const platform = {
  x: 220,
  y: 405,
  width: 200,
  height: 30,
  image: new Image(),
};

// Load the Player image
const playerImg = new Image();
playerImg.src = "images/player.png";

// Load the Coin image
const coinImg = new Image();
coinImg.src = "images/coin.png";

// Load the Platform image
const platformImg = new Image();
platformImg.src = "images/platform.png";

// Score variable
let score = 0;

// Keyboard input event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.key === "ArrowRight") {
    player.rightPressed = true;
  } else if (event.key === "ArrowLeft") {
    player.leftPressed = true;
  } else if (event.key === "ArrowUp") {
    player.jumping = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowRight") {
    player.rightPressed = false;
  } else if (event.key === "ArrowLeft") {
    player.leftPressed = false;
  }
}

let playerX = 400; // starting x position of the player

 // handle player movement with keyboard input
 document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    playerX -= 10; // move player left
  } else if (e.code === 'ArrowRight') {
    playerX += 10; // move player right
  }
});

// Function to draw the Coin
function drawCoin() {
  ctx.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height);
}

// Function to draw the Platform
function drawPlatform() {
  ctx.drawImage(platformImg, platform.x, platform.y, platform.width, platform.height);
}

// Check for collision Player and Platform
function checkCollisionPlatform(player, platform) {
  if (player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + platform.height) {
    return true;
  }
  return false;
}

// Check for collision Player and Coin
function checkCollisionCoin(player, coin) {
  if (player.x < coin.x + coin.width &&
      player.x + player.width > coin.x &&
      player.y + player.height > coin.y &&
      player.y + player.height < coin.y + coin.height) {
    return true;
  }
  return false;
}

// Game Loop
function gameLoop() {
  // Draw the background image
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Draw the Player image
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Move the player
  if (player.rightPressed) {
    player.x += player.speed;
  } else if (player.leftPressed) {
    player.x -= player.speed;
  }

  // Handle jumping
  if (player.jumping) {
    player.y -= 10;
    if (player.y < 0) {
      player.jumping = false;
    }
  } else if (player.y < canvas.height - player.height) {
    player.y += 5;
  }

  // Load the Coin image
  coin.src = "images/coin.png";
  // Draw Coin
  drawCoin();

  // Load the Platform image
  platform.src = "images/platform.png";
  // Draw Platform
  drawPlatform();

  // Increment Score for each collision with the coin
  if (player.x < coin.x + coin.width &&
  player.x + player.width > coin.x &&
  player.y + player.height > coin.y &&
  player.y + player.height < coin.y + coin.height) {
    player.jumping = false;
    player.y = coin.y - player.height;
    }

  // Check for collisions between player and platform
  if (player.x < platform.x + platform.width &&
    player.x + player.width > platform.x &&
    player.y + player.height > platform.y &&
    player.y + player.height < platform.y + platform.height) {
    player.jumping = false;
    player.y = platform.y - player.height;
  }

  // Score variable
  let score = 0;

  // Function to draw the score on the canvas
  function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 15, 35);
  }

  // Draw the score on the canvas
  drawScore();

    // Request the next animation frame
    window.requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  window.requestAnimationFrame(gameLoop);
