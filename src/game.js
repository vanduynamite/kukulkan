import Player from './player';
import Alien from './alien';
import Bullet from './bullet';
import { calculateDifficulty } from './difficulty';
import {
  START_SCORE,
  PLAYER_CAN_DIE,
  MAX_BULLETS,
  GAME_WIDTH,
  GAME_HEIGHT,
  PYR_BOTTOM,
  PYR_LEFT,
  PYR_DX,
  PYR_DY,
} from './settings';

class Game {

  constructor() {
    this.player = new Player();
    this.gameTime = 0;
    this.aliens = [];

    this.score = START_SCORE;
    this.gameover = false;
    calculateDifficulty(this);
    this.timeLastAlienAdded = -this.addAlienInterval;

    this.bullets = [];
    this.bulletForming = false;

    this.leftDown = false;
    this.rightDown = false;

    this.background = new Image();
    this.background.src = './dist/assets/pyramid_details.png';
  }


  keyDownHandler(e) {
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
    this.aliens.push(new Alien(this.difficulty, this.gameTime));
  }

  processBullets() {
    if (this.bulletForming) {
      this.formBullet(this.bullets[this.bullets.length - 1]);
    } else {
      if (this.leftDown || this.rightDown) {
        this.bulletForming = true;
        this.createBullet();
      }
    }
  }

  createBullet() {
    const dir = this.leftDown ? -1 : 1;
    this.bullets.push(new Bullet(dir, this.gameTime));
    this.player.updateDirection(dir);

    if (this.bullets.length > MAX_BULLETS) {
      this.bullets = this.bullets.slice(1);
    }
  }

  formBullet(bullet) {
    if ((bullet.dir === -1 && !this.leftDown) ||
        (bullet.dir === 1 && !this.rightDown)) {
      bullet.moving = true;
      this.bulletForming = false;
    } else {
      bullet.updateParameters(this.gameTime);
    }
  }

  step(timeStep, gameTime, ctx, frame) {
    this.gameTime = gameTime;
    this.addAliens();
    this.processBullets();
    this.allObjects().forEach(obj => obj.step(timeStep, gameTime));

    this.draw(ctx, frame);

    this.checkBulletCollisions();
    this.checkPlayerCollisions();
  }

  draw(ctx, frame) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
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
        if (PLAYER_CAN_DIE) this.gameover = true;
      } else {
        newAliens.push(alien);
      }
    });

    if (this.gameover) {
      this.aliens = [];
      this.score = START_SCORE;
      calculateDifficulty(this);
      this.gameover = false;
    } else {
      this.aliens = newAliens;
    }

  }

  drawPyramid(ctx) {
    ctx.drawImage(this.background, 0, 0, 960, 331, 0, 209, 960, 331)

    // ctx.beginPath();
    // ctx.moveTo(0, PYR_BOTTOM - 0 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 0 * PYR_DX, PYR_BOTTOM - 0 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 1 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 2 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 3 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 4 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 5 * PYR_DX, PYR_BOTTOM - 3 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 6 * PYR_DX, PYR_BOTTOM - 3 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 7 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 8 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 9 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 10 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
    // ctx.lineTo(PYR_LEFT + 11 * PYR_DX, PYR_BOTTOM - 0 * PYR_DY);
    // ctx.lineTo(960, PYR_BOTTOM);
    // ctx.stroke();
    // ctx.closePath();
  }

}

export default Game;
