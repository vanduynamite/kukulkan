import Player from './player';
import Alien from './alien';
import Bullet from './bullet';
import { calculateDifficulty } from './difficulty';
import {
  START_SCORE,
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

    this.snakes = {
      snake1: { img: new Image() },
      snake2: { img: new Image() },
      snake3: { img: new Image() },
    };

    this.setupImages();
  }

  setupImages() {
    this.snakes.snake1.img.src = './dist/assets/snake1.png';
    this.snakes.snake1.frames = 6;
    this.snakes.snake1.width = 150;
    this.snakes.snake1.height = 120;
    this.snakes.snake1.row = 2;
    this.snakes.snake1.sideBuffer = 12;
    this.snakes.snake1.bottomBuffer = 11;

    this.snakes.snake2.img.src = './dist/assets/snake2.png';
    this.snakes.snake2.frames = 4;
    this.snakes.snake2.width = 165;
    this.snakes.snake2.height = 150;
    this.snakes.snake2.row = 2;
    this.snakes.snake2.sideBuffer = 20;
    this.snakes.snake2.bottomBuffer = 50;

    this.snakes.snake3.img.src = './dist/assets/snake3.png';
    this.snakes.snake3.frames = 8;
    this.snakes.snake3.width = 200;
    this.snakes.snake3.height = 175;
    this.snakes.snake3.row = 2;
    this.snakes.snake3.sideBuffer = 80;
    this.snakes.snake3.bottomBuffer = 28;
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
    this.aliens.push(new Alien(this.difficulty, this.snakes));
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

  step(timeStep, gameTime, ctx, frame) {
    this.gameTime = gameTime;
    this.addAliens();
    this.processBullets();
    this.allObjects().forEach(obj => obj.step(timeStep));

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
        this.gameover = true;
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
    // const sx = this.imgObj.width * sprite;
    // const sy = this.imgObj.height * this.imgObj.row;
    // const sw = this.imgObj.width;
    // const sh = this.imgObj.height;
    // const dx = this.left - this.imgObj.width / 2 + this.imgObj.sideBuffer;
    // const dy = this.bottom - this.imgObj.height / 2 + this.imgObj.bottomBuffer;
    // const dw = ALIEN_WIDTH * 3.5;
    // const dh = ALIEN_HEIGHT * 2;
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
