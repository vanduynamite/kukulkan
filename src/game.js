import Player from './player.js';
import Alien from './alien.js';
import Bullet from './bullet.js';

class Game {

  constructor() {
    this.timeElapsed = 0;

    this.aliensAdded = 0;
    this.aliens = [];

    this.bulletsAdded = 0;
    this.bullets = [];
    this.maxBullets = 10;

    this.player = new Player(Game.width, Game.height);

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.leftDown = false;
    this.rightDown = false;
    this.bulletForming = false;
  }

  keyDownHandler(e) {
    if (e.keyCode === 39) {
      this.rightDown = true;
    } else if (e.keyCode === 37) {
      this.leftDown = true;
    }
  }

  keyUpHandler(e) {
    if (e.keyCode === 39) {
      this.rightDown = false;
    } else if (e.keyCode === 37) {
      this.leftDown = false;
    }
  }

  allObjects() {
    return [].concat(this.aliens, this.bullets, this.player);
  }

  addAliens() {
    if (this.timeElapsed > this.aliensAdded * 2350) {
      this.addAlien();
    }
  }

  addAlien() {
    this.aliensAdded++;
    this.aliens.push(new Alien(this));
    if (this.aliens.length > 10) this.aliens = this.aliens.slice(1);
  }

  processBullets() {
    if (this.bulletForming) {
      this.formBullet(this.bullets[this.bullets.length - 1]);
    } else {
      if (this.leftDown || this.rightDown) {
        this.bulletForming = true;
        this.addBullet();
      }
    }
  }

  addBullet() {
    this.bulletsAdded++;
    const direction = this.leftDown ? -1 : 1;
    this.bullets.push(new Bullet(direction, this.timeElapsed));

    if (this.bullets.length > this.maxBullets) {
      this.bullets = this.bullets.slice(1);
    }
  }

  formBullet(bullet) {
    if ((bullet.direction === -1 && !this.leftDown) ||
        (bullet.direction === 1 && !this.rightDown)) {
      bullet.moving = true;
      this.bulletForming = false;
      console.log(bullet.radius);
    } else {
      bullet.updateParameters(this.timeElapsed);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.width, Game.height);
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

  step(timeStep, timeElapsed) {
    this.timeElapsed = timeElapsed;
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

      if (alienDead) this.aliens.splice(i - 1, 1);
      if (!collision) newBullets.push(bullet);

    });

    this.bullets = newBullets;
  }

  checkPlayerCollisions() {
    const newAliens = [];

    this.aliens.forEach(alien => {
      if (!alien.collidedWithPlayer(this.player)) {
        newAliens.push(alien);
      }
    });

    this.aliens = newAliens;
  }

}

Game.width = 960;
Game.height = 540;
Game.baseY = 450;
Game.baseX = 84;
Game.pyramidDY = 80;
Game.pyramidDX = 72;
Game.slope = Game.pyramidDY / Game.pyramidDX;

export default Game;
