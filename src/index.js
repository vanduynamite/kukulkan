import Game from './game.js';
import GameRender from './game_render.js';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('kukulkanvas');
  const context = canvas.getContext('2d');
  canvas.width = 960;
  canvas.height = 640;

  const game = new Game(context);
  const gameRender = new GameRender(game, context);

  gameRender.startGame();
});

// context.arc(480, 320, 320, start_angle, end_angle, false);
// context.fillStyle = "#FFFFFF";
// context.fill();

// context.rect(center_x, center_y, width, height);
// context.arc(center_x, center_y, radius, start_angle, end_angle, reverse?)

// draw just a line
// context.strokeStyle = "rgba(255, 0, 255, 50)";
// context.stroke();

// as opposed to stroke for outlines...
// context.fillStyle = "#FFFFFF";
// context.fill();
