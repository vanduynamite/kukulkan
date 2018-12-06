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
  launchSounds
} from './settings';

class Bullet {

  constructor(game, dir) {
    this.game = game;
    this.timeCreated = game.gameTime;
    this.dir = dir;

    this.startPos = [(GAME_WIDTH + PLAYER_WIDTH * this.dir) / 2, BULLET_HEIGHT];
    this.pos = this.startPos.slice(0);
    this.moving = false;
  }

  updateParameters(newTime) {
    const timePassed = Math.min(newTime - this.timeCreated, MAX_FORM_TIME);
    const bulletLevel = Math.floor(timePassed / FORM_INTERVAL) + 1;

    this.radius = bulletLevel * (MAX_SIZE / NUM_SIZES);
    this.strength = bulletStrength(this.radius);
    this.velX = bulletVelX(this.dir, this.radius);
  }

  launch(timeReleased) {
    this.moving = true;
    this.timeReleased = timeReleased;
    launchSounds(this.radius, this.game.sounds).play();
  }

  step(gameTime) {
    if (this.moving && this.pos && this.velX) {
      const dt = gameTime - this.timeReleased;
      this.pos[0] = this.startPos[0] + this.velX * dt;
      this.pos[1] = this.startPos[1] + 0.5 * GRAVITY * Math.pow(dt, 2);
    }
  }

  draw(ctx, frame) {

    const imgBorder = 4;

    const img = bulletSpriteMap(this.radius, frame);
    ctx.drawImage(img.img, 0, 0, 67, 67,
      this.pos[0] - this.radius - imgBorder, this.pos[1] - this.radius - imgBorder,
      (this.radius + imgBorder) * 2, (this.radius + imgBorder) * 2);

    if (this.game.hitboxes) {
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.closePath();
    }
  }

}

export default Bullet;
