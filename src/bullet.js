import {
  bulletStrength,
  bulletColor,
} from './difficulty';

class Bullet {

  constructor(direction, timeCreated) {
    this.direction = direction;
    this.timeCreated = timeCreated;

    this.pos = [480 + 20 * this.direction, 160];
    this.radius = 4;
    this.strength = 1;

    this.gravity = 0.0004;
    this.vel = [this.direction * this.radius ** 1.25 * 0.01, 0];
    this.moving = false;

    this.color = '#b540e4';

    this.maxFormTime = 1000;
    this.numSizes = 10;
    this.timeInterval = this.maxFormTime / (this.numSizes - 1);
    this.maxSize = 20;
  }

  updateParameters(newTime) {
    const timePassed = Math.min(newTime - this.timeCreated, this.maxFormTime);
    const bulletLevel = Math.floor(timePassed / this.timeInterval) + 1;

    this.radius = bulletLevel * (this.maxSize / (this.numSizes));
    this.strength = bulletStrength(this.radius);
    this.color = bulletColor(this.strength);
    this.vel = [this.direction * this.radius ** 1.25 * 0.01, 0];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  step(timeStep) {
    if (this.moving) {
      this.pos[0] += this.vel[0] * timeStep;
      this.pos[1] += this.vel[1] * timeStep;
      this.vel[1] += this.gravity * timeStep;
    }
  }

}

export default Bullet;
