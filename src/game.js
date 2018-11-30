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
    this.player = new Player(Game.width, Game.height);

  }

  allObjects() {
    return [].concat(this.aliens, this.bullets, this.player);
  }

  addAlien() {
    this.aliensAdded++;
    this.aliens.push(new Alien(this));
    if (this.aliens.length > 10) this.aliens = this.aliens.slice(1);
  }

  addBullet() {
    this.bulletsAdded++;
    // const radius = Math.random() * 15 + 5;
    const radius = this.bulletsAdded % 4 * 5 + 5;
    const direction = Math.sign(Math.random() - 0.5);

    this.bullets.push(new Bullet(this, radius, direction));

    if (this.bullets.length > 20) this.bullets = this.bullets.slice(1);
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

  step(timeStep) {
    this.timeElapsed += timeStep;
    if (this.timeElapsed > this.aliensAdded * 3000) {
      this.addAlien();
    }
    if (this.timeElapsed > this.bulletsAdded * 500) {
      this.addBullet();
    }


    this.allObjects().forEach(obj => obj.step(timeStep));
    this.checkBulletCollisions();
    this.checkPlayerCollisions();
  }

  checkBulletCollisions() {
    const newBullets = [];

    this.bullets.forEach(bullet => {

      let collision = false;

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
