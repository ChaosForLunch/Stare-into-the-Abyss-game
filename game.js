// Define the canvas and get the context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  speed: 5,
  jumping: false,
  rightPressed: false,
  leftPressed: false,
};

// Platform object
const platform = {
  x: 200,
  y: 400,
  width: 200,
  height: 20,
};

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

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillStyle = "#FFA500";
  ctx.fillRect(player.x, player.y, player.width, player.height);

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

  // Draw the platform
  ctx.fillStyle = "#9932CC";
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

  // Check for collisions between player and platform
  if (player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + platform.height) {
    player.jumping = false;
    player.y = platform.y - player.height;
  }

  // Request the next animation frame
  window.requestAnimationFrame(gameLoop);
}

// Start the game loop
window.requestAnimationFrame(gameLoop);
