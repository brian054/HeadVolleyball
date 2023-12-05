const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: '#FF0000',
  velocityX: (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5, // Random initial x velocity
  velocityY: 5,
  gravity: 0.2,
  bounceFactor: 0.7,
  friction: 0.12, // Adjust the friction factor as needed
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function update() {
  // Update ball position
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  ball.velocityY += ball.gravity;

  // Check for collision with the floor
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.velocityY = -ball.velocityY * ball.bounceFactor; // Bounce

    // Apply friction to slow down the ball on the floor
    ball.velocityX *= (1 - ball.friction);
  }

  // Check for collision with the walls
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.velocityX = -ball.velocityX; // Reverse x velocity on wall collision
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  drawBall();

  // Repeat the update function
  requestAnimationFrame(update);
}

// Start the game loop
update();
