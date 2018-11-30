import Player from './player';
import Alien from './alien';
import Bullet from './bullet';
import { calculateDifficulty } from './difficulty';
import {
  START_SCORE,
  MAX_BULLETS,
  GAME_WIDTH,
  GAME_HEIGHT,
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
  }

  keyDownHandler(e) {
    if (e.keyCode === 39) this.rightDown = true;
    if (e.keyCode === 37) this.leftDown = true;
  }

  keyUpHandler(e) {
    if (e.keyCode === 39) this.rightDown = false;
    if (e.keyCode === 37) this.leftDown = false;
  }

  allObjects() {
    return [].concat(this.aliens, this.bullets, this.player);
  }

  addAliens() {
    if (this.gameTime - this.timeLastAlienAdded > this.addAlienInterval) {
      this.addAlien();
    }
  }

  addAlien() {
    this.timeLastAlienAdded = this.gameTime;
    this.aliens.push(new Alien(this.difficulty));
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

  draw(ctx) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.allObjects().forEach(obj => obj.draw(ctx));

    const startY = Game.baseY;
    const startX = Game.baseX;
    const dy = Game.pyramidDY;
    const dx = Game.pyramidDX;

    ctx.beginPath();
    ctx.moveTo(0, startY - 0 * dy);
    ctx.lineTo(startX + 0 * dx, startY - 0 * dy);
    ctx.lineTo(startX + 1 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 2 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 3 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 4 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 5 * dx, startY - 3 * dy);
    ctx.lineTo(startX + 6 * dx, startY - 3 * dy);
    ctx.lineTo(startX + 7 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 8 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 9 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 10 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 11 * dx, startY - 0 * dy);
    ctx.lineTo(960, startY);
    ctx.stroke();
    ctx.closePath();
  }

  step(timeStep, gameTime) {
    this.gameTime = gameTime;
    this.addAliens();
    this.processBullets();
    this.allObjects().forEach(obj => obj.step(timeStep));
    this.checkBulletCollisions();
    this.checkPlayerCollisions();
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
        this.gameover = true;
      } else {
        newAliens.push(alien);
      }
    });

    if (this.gameover) {
      this.aliens = [];
      this.score = 0;
      calculateDifficulty(this);
      this.gameover = false;
    } else {
      this.aliens = newAliens;
    }

  }

}

Game.baseY = 450;
Game.baseX = 84;
Game.pyramidDY = 80;
Game.pyramidDX = 72;
Game.slope = Game.pyramidDY / Game.pyramidDX;

export default Game;
