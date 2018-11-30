import { bulletStrength } from './difficulty';
import {
  GRAVITY,
  START_RADIUS,
  MAX_FORM_TIME,
  NUM_SIZES,
  MAX_SIZE,
  FORM_INTERVAL,
  bulletColor,
  bulletVelX,
  GAME_WIDTH,
  PLAYER_WIDTH,
  BULLET_HEIGHT,
} from './settings';

class Bullet {

  constructor(dir, timeCreated) {
    this.dir = dir;
    this.timeCreated = timeCreated;

    this.pos = [(GAME_WIDTH + PLAYER_WIDTH * this.dir) / 2, BULLET_HEIGHT];
    this.moving = false;
  }

  updateParameters(newTime) {
    const timePassed = Math.min(newTime - this.timeCreated, MAX_FORM_TIME);
    const bulletLevel = Math.floor(timePassed / FORM_INTERVAL) + 1;

    this.radius = bulletLevel * (MAX_SIZE / NUM_SIZES);
    this.strength = bulletStrength(this.radius);
    this.color = bulletColor(this.strength);
    this.vel = [bulletVelX(this.dir, this.radius), 0];
  }
  
  step(timeStep) {
    if (this.moving) {
      this.pos[0] += this.vel[0] * timeStep;
      this.pos[1] += this.vel[1] * timeStep;
      this.vel[1] += GRAVITY * timeStep;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}

export default Bullet;
