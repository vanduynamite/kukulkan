import * as Settings from './settings';
import { calculateDifficulty } from './difficulty';
import { sleep } from './util';

class GameLoop {

  constructor(game, canvas, modalEl) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.frame = 0;
    this.modalEl = modalEl;
    this.soundOn = true;
    this.musicOn = true;
    this.difficulty = 3;

    this.scoreEl = document.getElementById('score');
    this.killsEl = document.getElementById('kills');
    this.soundEl = document.getElementById('sound');
    this.musicEl = document.getElementById('music');
    this.hitboxEl = document.getElementById('hitboxes');
    this.diffEl = document.getElementById('difficulty');

    this.setupControls();
  }

  setupControls() {
    this.soundEl.onclick = this.toggleSound.bind(this);
    this.musicEl.onclick = this.toggleMusic.bind(this);
    this.hitboxEl.onclick = this.toggleHitboxes.bind(this);
    this.diffEl.onclick = this.toggleDifficulty.bind(this);
    document.addEventListener('keydown', this.game.keyDownHandler.bind(this.game), false);
    document.addEventListener('keyup', this.game.keyUpHandler.bind(this.game), false);
    this.canvas.onmousedown = this.game.mouseDownHandler.bind(this.game);
    document.onmouseup = this.game.mouseUpHandler.bind(this.game);
    this.canvas.ontouchstart = this.game.touchDownHandler.bind(this.game);
    document.ontouchend = this.game.touchUpHandler.bind(this.game);
  }

  startGame() {
    this.game.sounds.gameOver.stop();
    this.game.kills = Settings.START_KILLS;
    this.game.score = 0;
    this.game.killsPerLevel = this.difficulty;
    this.game.gameover = false;
    this.game.gameTime = 0;
    calculateDifficulty(this.game);
    this.game.aliens = [];
    this.game.timeLastAlienAdded = -this.game.addAlienInterval;
    this.game.bullets = [];
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
    sleep(1500).then(() => {
      this.ctx.clearRect(0, 0, Settings.GAME_WIDTH, Settings.GAME_HEIGHT);
      this.game.sounds.gameOver.play();
    });
  }

  updateScore() {
    if (this.scoreEl.innerHTML !== `Score: ${this.game.score}`) {
      this.scoreEl.innerHTML = `Score: ${this.game.score}`;
    }
    if (this.killsEl.innerHTML !== `Kills: ${this.game.kills}`) {
      this.killsEl.innerHTML = `Kills: ${this.game.kills}`;
    }
  }

  toggleSound(e) {
    e.preventDefault();
    this.soundOn = !this.soundOn;
    this.soundEl.innerHTML = this.soundOn ? 'Sound On' : 'Sound Off';
    Object.values(this.game.sounds).forEach(sound => sound.toggleSound(this.soundOn));
  }

  toggleMusic(e) {
    e.preventDefault();
    this.musicOn = !this.musicOn;
    this.musicEl.innerHTML = this.musicOn ? 'Music On' : 'Music Off';
    Object.values(this.game.sounds).forEach(sound => {
      sound.toggleMusic(this.musicOn, this.game.gameover);
    });
  }

  toggleHitboxes(e) {
    e.preventDefault();
    this.game.hitboxes = !this.game.hitboxes;
    this.hitboxEl.innerHTML = this.game.hitboxes ? 'Hitboxes On' : 'Hitboxes Off';
  }

  toggleDifficulty(e) {
    e.preventDefault();
    switch (this.difficulty) {
      case 1:
        this.difficulty = 3;
        this.diffEl.innerHTML = 'Difficulty: Normal';
        break;

      case 3:
        this.difficulty = 4;
        this.diffEl.innerHTML = 'Difficulty: Easy';
        break;

      case 4:
        this.difficulty = 1;
        this.diffEl.innerHTML = 'Difficulty: Hard';
        break;

      default:
        this.difficulty = 3;
        this.diffEl.innerHTML = 'Difficulty: Normal';
    }
    // haha! this would allow the difficulty to change mid-game
    // this.game.killsPerLevel = this.difficulty;
  }

}

export default GameLoop;
