import Game from './game';
import { alienHealth, alienSpeed } from './difficulty';
import * as Settings from './settings';

class Alien {

  constructor(game) {
    this.game = game;
    this.timeCreated = game.gameTime;

    this.dir = Math.random() < 0.5;
    this.leftStart = (Settings.GAME_WIDTH - Settings.ALIEN_WIDTH) / 2 - this.dir * (Settings.GAME_WIDTH + Settings.ALIEN_WIDTH) / 2;
    this.left = this.leftStart;
    this.bottom = Settings.PYR_BASE - Settings.ALIEN_HEIGHT;

    this.originalHealth = alienHealth(game.difficulty);
    this.health = this.originalHealth;
    this.speed = alienSpeed(game.difficulty) * this.dir;
    this.imgObj = Settings.alienSpriteMap(this.health, this.dir);
  }

  collidedWithPlayer(player) {
    const buffer = Settings.PLAYER_BUFFER;

    if ((this.left < player.left + player.width - buffer) && this.dir == -1) {
      return true;
    }

    if ((this.left + Settings.ALIEN_WIDTH - buffer > player.left) && this.dir == 1) {
      return true;
    }

    return false;
  }

  collidedWithBullet(bullet) {
    const buffer = Settings.BULLET_BUFFER;

    if (bullet.pos[0] > this.left - bullet.radius + buffer &&
        bullet.pos[0] < this.left + Settings.ALIEN_WIDTH + bullet.radius - buffer &&
        bullet.pos[1] < this.bottom + Settings.ALIEN_HEIGHT + bullet.radius - buffer &&
        bullet.pos[1] > this.bottom - bullet.radius) {

      this.processDamage(bullet.strength);
      return true;
    }

    return false;
  }

  processDamage(damage) {
    this.health -= damage;
    this.leftStart -= this.dir * damage * 17;
    Settings.hurtSounds(this.health, this.game.sounds).play();
  }

  step(gameTime) {
    const dt = gameTime - this.timeCreated;
    this.left = this.leftStart + this.speed * dt;

    const toe = this.left + Settings.ALIEN_WIDTH * 0.5;
    const halfGameWidth = Settings.GAME_WIDTH / 2;
    const base = halfGameWidth - (halfGameWidth - Settings.PYR_LEAD) * this.dir;
    const numSections = Math.max((toe - base) / Settings.PYR_DX * this.dir, 0);
    const numLevelsUp = Math.ceil(Math.floor(numSections) / 2);
    const dxUpSlope = numSections % 2 > 1 ? 0 : numSections % 2;
    const baseBottom = Settings.PYR_BASE - Settings.ALIEN_HEIGHT;

    this.bottom =  baseBottom - (numLevelsUp + dxUpSlope) * Settings.PYR_DY;
  }

  draw(ctx, frame) {
    const sprite = Math.floor(frame / (60 / this.imgObj.frames));

    ctx.drawImage(this.imgObj.img,
      this.imgObj.start - this.imgObj.width * sprite * this.dir,
      this.imgObj.height * this.imgObj.row,
      this.imgObj.width,
      this.imgObj.height,
      this.left - (this.imgObj.width - Settings.ALIEN_WIDTH) / 2 + this.imgObj.sideBuffer,
      this.bottom - this.imgObj.height / 2 + this.imgObj.bottomBuffer,
      Settings.ALIEN_WIDTH * 3.5,
      Settings.ALIEN_HEIGHT * 2);

    if (this.game.hitboxes) {
      ctx.beginPath();
      ctx.rect(this.left, this.bottom, Settings.ALIEN_WIDTH, Settings.ALIEN_HEIGHT);
      ctx.stroke();
      ctx.closePath();
    }
  }

}

export default Alien;
