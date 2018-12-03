import Player from './player';
import Alien from './alien';
import Bullet from './bullet';
import { calculateDifficulty } from './difficulty';
import * as Settings from './settings';
import { soundEffects } from './sounds';
import { sleep } from './util';

class Game {

  constructor() {
    this.player = new Player();
    this.gameTime = 0;
    this.aliens = [];

    this.score = Settings.START_SCORE;
    this.gameover = false;
    calculateDifficulty(this);
    this.timeLastAlienAdded = -this.addAlienInterval;

    this.bullets = [];
    this.bulletForming = false;

    this.leftDown = false;
    this.rightDown = false;

    this.background = new Image();
    this.background.src = './dist/assets/pyramid_details.png';
    this.sounds = soundEffects();

    this.playing = false;
  }

  keyDownHandler(e) {
    if (!this.playing) {
      this.playing = true;
      this.sounds.music.play();
    }

    if (e.keyCode === 39 && !this.rightDown) this.rightDown = true;
    if (e.keyCode === 37 && !this.leftDown) this.leftDown = true;
  }

  keyUpHandler(e) {
    if (e.keyCode === 39) this.rightDown = false;
    if (e.keyCode === 37) this.leftDown = false;
  }

  allObjects() {
    return [].concat(this.player, this.aliens, this.bullets);
  }

  addAliens() {
    if (this.gameTime - this.timeLastAlienAdded > this.addAlienInterval) {
      this.addAlien();
    }
  }

  addAlien() {
    this.timeLastAlienAdded = this.gameTime;
    this.aliens.push(new Alien(this));
  }

  processBullets() {
    if (this.bulletForming) {
      if (!this.isValidBullet()) return;
      this.formBullet(this.bullets[this.bullets.length - 1]);
    } else if (this.leftDown || this.rightDown) {
      this.createBullet();
    }
  }

  isValidBullet() {
    if (this.bullets.length === 0 ||
        this.bullets[this.bullets.length - 1].moving) {
      this.stopFormingBullet();
      return false;
    }

    return true;
  }

  createBullet() {
    this.bulletForming = true;
    const dir = this.leftDown ? -1 : 1;
    this.bullets.push(new Bullet(this, dir));
    this.player.updateDirection(dir);
    this.sounds.chargeUp.play();

    if (this.bullets.length > Settings.MAX_BULLETS) {
      this.bullets = this.bullets.slice(1);
    }
  }

  formBullet(bullet) {
    if (!bullet) return;
    if ((bullet.dir === -1 && !this.leftDown) ||
        (bullet.dir === 1 && !this.rightDown)) {

      bullet.launch(this.gameTime);
      this.stopFormingBullet();
    } else {
      bullet.updateParameters(this.gameTime);
    }
  }

  stopFormingBullet() {
    this.bulletForming = false;
    this.sounds.chargeUp.stop();
  }

  step(timeStep, gameTime, ctx, frame) {
    this.gameTime = gameTime;
    this.allObjects().forEach(obj => obj.step(timeStep, gameTime));

    this.draw(ctx, frame);

    this.checkBulletCollisions();
    this.checkPlayerCollisions();
    this.addAliens();
    this.processBullets();
  }

  draw(ctx, frame) {
    ctx.clearRect(0, 0, Settings.GAME_WIDTH, Settings.GAME_HEIGHT);
    this.drawPyramid(ctx);
    this.allObjects().forEach(obj => obj.draw(ctx, frame));
  }

  checkBulletCollisions() {
    const newBullets = [];

    this.bullets.forEach(bullet => {

      let collision = false;
      let alienDead = false;
      let i = 0;

      while (i < this.aliens.length && !collision) {
        const alien = this.aliens[i];

        if (alien.collidedWithBullet(bullet)) {
          collision = true;
          alienDead = alien.health <= 0;
        }

        i++;
      }

      if (alienDead) {
        this.score++;
        calculateDifficulty(this);
        this.aliens.splice(i - 1, 1);
      }
      if (!collision) newBullets.push(bullet);

    });

    this.bullets = newBullets;
  }

  checkPlayerCollisions() {
    const newAliens = [];

    this.aliens.forEach(alien => {
      if (alien.collidedWithPlayer(this.player)) {
        this.gameEnd();
      } else {
        newAliens.push(alien);
      }
    });

    if (this.gameover) {
      this.aliens = [];
      this.score = Settings.START_SCORE;
      calculateDifficulty(this);
      this.gameover = false;
      sleep(15000).then(() => this.sounds.music.play());
    } else {
      this.aliens = newAliens;
    }

  }

  drawPyramid(ctx) {
    ctx.drawImage(this.background, 0, 0, 960, 331, 0, 209, 960, 331);
  }

  gameEnd() {
    if (Settings.PLAYER_CAN_DIE) this.gameover = true;
    this.sounds.music.stop();
    sleep(300).then(() => this.sounds.playerDeath.play());
    sleep(1500).then(() => this.sounds.gameOver.play());
  }

}

export default Game;
