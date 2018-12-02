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
  bulletSpriteMap,
  DRAW_HITBOXES,
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
    this.vel = [bulletVelX(this.dir, this.radius), 0];
  }

  step(timeStep) {
    if (this.moving && this.pos && this.vel) {
      this.pos[0] += this.vel[0] * timeStep;
      this.pos[1] += this.vel[1] * timeStep;
      this.vel[1] += GRAVITY * timeStep;
    }
  }

  draw(ctx, frame) {

    const imgBorder = 4;

    const img = bulletSpriteMap(this.radius, frame)
    ctx.drawImage(img.img, 0, 0, 67, 67,
      this.pos[0] - this.radius - imgBorder, this.pos[1] - this.radius - imgBorder,
      (this.radius + imgBorder) * 2, (this.radius + imgBorder) * 2);

    if (DRAW_HITBOXES) {
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.closePath();
    }
  }

}

export default Bullet;
