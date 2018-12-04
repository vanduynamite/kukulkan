import Game from './game';
import GameLoop from './game_loop';
import { GAME_WIDTH, GAME_HEIGHT } from './settings';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('kukulkanvas');
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  const modalEl = document.getElementById('modal');
  const game = new Game(canvas.getContext('2d'));
  const gameLoop = new GameLoop(game, canvas, modalEl);

  modalEl.onclick = e => {
    modalEl.classList.remove('modal-on');
    modalEl.classList.add('modal-off');
    gameLoop.startGame();
  };

});
