import Game from './game';
import { alienHealth, alienSpeed } from './difficulty';
import {
  PLAYER_BUFFER,
  BULLET_BUFFER,
  ALIEN_HEIGHT,
  ALIEN_WIDTH,
  GAME_WIDTH,
  alienColor,
  PYR_BOTTOM,
  PYR_LEFT,
  PYR_DX,
  PYR_DY,
} from './settings';

class Alien {

  constructor(difficulty) {
    this.dir = Math.sign(Math.random() - 0.5);

    this.left = (GAME_WIDTH - ALIEN_WIDTH) / 2 - this.dir * (GAME_WIDTH + ALIEN_WIDTH) / 2;
    this.bottom = PYR_BOTTOM - ALIEN_HEIGHT;

    this.health = alienHealth(difficulty);
    this.speed = alienSpeed(difficulty) * this.dir;
    this.color = alienColor(this.health);
  }

  collidedWithPlayer(player) {
    const buffer = PLAYER_BUFFER;

    if ((this.left < player.left + player.width - buffer) && this.dir == -1) {
      return true;
    }

    if ((this.left + ALIEN_WIDTH - buffer > player.left) && this.dir == 1) {
      return true;
    }

    return false;
  }

  collidedWithBullet(bullet) {
    const buffer = BULLET_BUFFER;

    if (bullet.pos[0] > this.left - bullet.radius + buffer &&
        bullet.pos[0] < this.left + ALIEN_WIDTH + bullet.radius - buffer &&
        bullet.pos[1] < this.bottom + ALIEN_HEIGHT + bullet.radius - buffer &&
        bullet.pos[1] > this.bottom - bullet.radius) {

      this.health -= bullet.strength;
      this.color = alienColor(this.health);
      return true;
    }

    return false;
  }

  step(timeStep) {
    this.left += this.speed * timeStep;
    let toe = this.left + ALIEN_WIDTH * 0.5;
    const base = GAME_WIDTH / 2 - (GAME_WIDTH / 2 - PYR_LEFT) * this.dir;
    const dx = PYR_DX * this.dir;

    if ((toe > base + 0 * dx && toe <= base + 1 * dx) ||
        (toe > base + 2 * dx && toe <= base + 3 * dx) ||
        (toe > base + 4 * dx && toe <= base + 5 * dx)) {
      this.bottom -= PYR_DY / PYR_DX * this.speed * timeStep;
    }

    if ((toe < base + 0 * dx && toe >= base + 1 * dx) ||
        (toe < base + 2 * dx && toe >= base + 3 * dx) ||
        (toe < base + 4 * dx && toe >= base + 5 * dx)) {
      this.bottom += PYR_DY / PYR_DX * this.speed * timeStep;
    }

  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.left, this.bottom, ALIEN_WIDTH, ALIEN_HEIGHT);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}

export default Alien;
