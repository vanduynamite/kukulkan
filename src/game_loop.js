import * as Settings from './settings';
import { calculateDifficulty } from './difficulty';
import { sleep } from './util';

class GameLoop {

  constructor(game, ctx, modalEl) {
    this.game = game;
    this.ctx = ctx;
    this.frame = 0;
    this.modalEl = modalEl;

    this.scoreEl = document.getElementById('score');
    this.killsEl = document.getElementById('kills');

    document.addEventListener('keydown', this.game.keyDownHandler.bind(this.game), false);
    document.addEventListener('keyup', this.game.keyUpHandler.bind(this.game), false);
  }

  startGame() {
    this.game.kills = Settings.START_KILLS;
    this.game.score = 0;
    this.game.gameover = false;
    this.game.gameTime = 0;
    calculateDifficulty(this.game);
    this.game.aliens = [];
    this.game.timeLastAlienAdded = -this.game.addAlienInterval;
    this.game.bullets = [];
    this.game.sounds.gameOver.stop();
    this.game.sounds.music.play();

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeStep = time - this.prevTime || 0;
    this.frame = (this.frame + 1) % 60;
    this.game.step(timeStep, time, this.ctx, this.frame);
    this.prevTime = time;
    this.updateScore();

    if (this.game.gameover) {
      this.endGame();
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

  }

  endGame() {
    this.game.sounds.music.stop();
    this.game.sounds.chargeUp.stop();
    this.modalEl.innerHTML = `YOU KILLED ${this.game.kills} ALIENS
      <br>AND SCORED ${this.game.score} POINTS
      <br><br>CLICK TO PLAY AGAIN!`;
    this.modalEl.classList.remove('modal-off');
    this.modalEl.classList.add('modal-on');
    sleep(300).then(() => this.game.sounds.playerDeath.play());
    sleep(1500).then(() => this.game.sounds.gameOver.play());
  }

  updateScore() {
    if (this.scoreEl.innerHTML !== `Score: ${this.game.score}`) {
      this.scoreEl.innerHTML = `Score: ${this.game.score}`;
    }
    if (this.killsEl.innerHTML !== `Kills: ${this.game.kills}`) {
      this.killsEl.innerHTML = `Kills: ${this.game.kills}`;
    }
  }

}

export default GameLoop;
