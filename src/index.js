import Game from './game.js';
import GameRender from './game_render.js';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('kukulkanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = Game.width;
  canvas.height = Game.height;

  const game = new Game(ctx);
  const gameRender = new GameRender(game, ctx);

  gameRender.startGame();
});

// ctx.arc(480, 320, 320, start_angle, end_angle, false);
// ctx.fillStyle = "#FFFFFF";
// ctx.fill();

// ctx.rect(center_x, center_y, width, height);
// ctx.arc(center_x, center_y, radius, start_angle, end_angle, reverse?)

// draw just a line
// ctx.strokeStyle = "rgba(255, 0, 255, 50)";
// ctx.stroke();

// as opposed to stroke for outlines...
// ctx.fillStyle = "#FFFFFF";
// ctx.fill();
