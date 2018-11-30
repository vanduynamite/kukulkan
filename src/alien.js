import Game from './game';
import {
  alienHealth,
  alienSpeed,
  alienColor,
} from './difficulty';

class Alien {

  constructor(difficulty) {
    this.width = 40;
    this.height = 50;
    this.direction = Math.sign(Math.random() - 0.5);

    this.left = (Game.width - this.width) / 2 - this.direction * (Game.width + this.width) / 2;
    this.bottom = Game.baseY - this.height;



    this.health = alienHealth(difficulty);
    this.speed = alienSpeed(difficulty) * this.direction;
    this.color = alienColor(this.health);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.left, this.bottom, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  step(timeStep) {
    this.left += this.speed * timeStep;
    let toe = this.left + this.width * 0.5;
    const base = Game.width / 2 - (Game.width / 2 - Game.baseX) * this.direction;
    const dx = Game.pyramidDX * this.direction;


    if ((toe > base + 0 * dx && toe <= base + 1 * dx) ||
        (toe > base + 2 * dx && toe <= base + 3 * dx) ||
        (toe > base + 4 * dx && toe <= base + 5 * dx)) {
      this.bottom -= Game.pyramidDY / Game.pyramidDX * this.speed * timeStep;
    }


    if ((toe < base + 0 * dx && toe >= base + 1 * dx) ||
        (toe < base + 2 * dx && toe >= base + 3 * dx) ||
        (toe < base + 4 * dx && toe >= base + 5 * dx)) {
      this.bottom += Game.pyramidDY / Game.pyramidDX * this.speed * timeStep;
    }


    // TODO: implement a formulaic approach
    // const slope = Game.slope;
    //
    // const foot = Math.max(toe - 84 * this.direction, 0);
    // const onSlope = (Math.floor(foot / Game.pyramidDX) + 1) % 2;
    // const stepNum = Math.floor((Math.floor(foot / Game.pyramidDX) + 1) / 2);
    // const test = foot % Game.pyramidDX * slope * onSlope;
    // // console.log(test + stepNum * Game.pyramidDY);
    // this.bottom = Game.baseY - (test + stepNum * Game.pyramidDY) - this.height;
  }

  collidedWithPlayer(player) {

    if ((this.left < player.left + player.width - 10) && this.direction == -1) {
      return true;
    }

    if ((this.left + this.width - 10 > player.left) && this.direction == 1) {
      return true;
    }

    return false;
  }

  collidedWithBullet(bullet) {
    const left = this.left - bullet.radius + 5;
    const right = this.left + this.width + bullet.radius - 5;
    const bottom = this.bottom - bullet.radius;
    const top = this.bottom + this.height + bullet.radius - 5;

    if (bullet.pos[0] > left &&
        bullet.pos[0] < right &&
        bullet.pos[1] < top &&
        bullet.pos[1] > bottom) {

      this.health -= bullet.strength;
      this.color = alienColor(this.health);
      return true;
    }

    return false;

  }

}

export default Alien;
