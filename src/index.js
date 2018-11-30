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
