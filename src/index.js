import Game from './game';
import GameRender from './game_render';
import { GAME_WIDTH, GAME_HEIGHT } from './settings';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('kukulkanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  const game = new Game(ctx);
  new GameRender(game, ctx).startGame();
});
