import Player from './player';
import Alien from './alien';
import Bullet from './bullet';
import { calculateDifficulty } from './difficulty';
import * as Settings from './settings';
import { soundEffects } from './sounds';
import { scoreKill } from './util';

class Game {

  constructor() {
    this.player = new Player(this);
    this.gameover = true;
    this.hitboxes = false;

    this.bulletForming = false;
    this.leftDown = false;
    this.rightDown = false;

    this.background = new Image();
    this.background.src = './dist/assets/pyramid_details.png';
    this.sounds = soundEffects();
    this.musicPlaying = false;
  }

  keyDownHandler(e) {
    if (e.keyCode === 39 && !this.rightDown) this.rightDown = true;
    if (e.keyCode === 37 && !this.leftDown) this.leftDown = true;
  }

  keyUpHandler(e) {
    if (e.keyCode === 39) this.rightDown = false;
    if (e.keyCode === 37) this.leftDown = false;
  }

  mouseDownHandler(e) {
    e.preventDefault();
    const docWidth = document.documentElement.clientWidth;
    if (e.pageX > docWidth / 2 && !this.rightDown) this.rightDown = true;
    if (e.pageX <= docWidth / 2 && !this.leftDown) this.leftDown = true;
  }

  mouseUpHandler(e) {
    e.preventDefault();
    this.rightDown = false;
    this.leftDown = false;
  }

  touchDownHandler(e) {
    e.preventDefault();
    const clickLocation = e.changedTouches[0].pageX;
    const docWidth = document.documentElement.clientWidth;
    if (clickLocation > docWidth / 2 && !this.rightDown) this.rightDown = true;
    if (clickLocation <= docWidth / 2 && !this.leftDown) this.leftDown = true;
  }

  touchUpHandler(e) {
    // e.preventDefault(); // I didn't forget this, it causes it to not work!
    this.rightDown = false;
    this.leftDown = false;
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

  step(gameTime, ctx, frame) {
    this.gameTime = gameTime;
    this.allObjects().forEach(obj => obj.step(gameTime));

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
        if (this.aliens[i].collidedWithBullet(bullet)) {
          collision = true;
          alienDead = this.aliens[i].health <= 0;
        } else {
          i++;
        }
      }

      if (alienDead) {
        this.kills++;
        this.score += scoreKill(this.aliens[i], this.killsPerLevel);
        calculateDifficulty(this);
        this.aliens.splice(i, 1);
      }

      if (!collision) newBullets.push(bullet);
    });

    this.bullets = newBullets;
  }

  checkPlayerCollisions() {
    const newAliens = [];

    this.aliens.forEach(alien => {
      if (alien.collidedWithPlayer(this.player)) {
        if (Settings.PLAYER_CAN_DIE) this.gameover = true;
      } else {
        newAliens.push(alien);
      }
    });

    this.aliens = newAliens;
  }

  drawPyramid(ctx) {
    ctx.drawImage(this.background, 0, 0, 1920, 662, 0, 209, 960, 331);
    if (this.hitboxes) {
      ctx.beginPath();
      ctx.moveTo(0, Settings.PYR_BASE - 0 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 0 * Settings.PYR_DX, Settings.PYR_BASE - 0 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 1 * Settings.PYR_DX, Settings.PYR_BASE - 1 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 2 * Settings.PYR_DX, Settings.PYR_BASE - 1 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 3 * Settings.PYR_DX, Settings.PYR_BASE - 2 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 4 * Settings.PYR_DX, Settings.PYR_BASE - 2 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 5 * Settings.PYR_DX, Settings.PYR_BASE - 3 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 6 * Settings.PYR_DX, Settings.PYR_BASE - 3 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 7 * Settings.PYR_DX, Settings.PYR_BASE - 2 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 8 * Settings.PYR_DX, Settings.PYR_BASE - 2 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 9 * Settings.PYR_DX, Settings.PYR_BASE - 1 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 10 * Settings.PYR_DX, Settings.PYR_BASE - 1 * Settings.PYR_DY);
      ctx.lineTo(Settings.PYR_LEAD + 11 * Settings.PYR_DX, Settings.PYR_BASE - 0 * Settings.PYR_DY);
      ctx.lineTo(960, Settings.PYR_BASE);
      ctx.stroke();
      ctx.closePath();
    }
  }

}

export default Game;
