import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from './settings';

class Player {

  constructor() {
    this.width = 40;
    this.left = GAME_WIDTH / 2 - this.width / 2;

    this.maxHeight = 80;
    this.baseY = 130;

    this.height = this.maxHeight;
    this.bottom = this.baseY;

    this.angle = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.left, this.bottom, this.width, this.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
  }

  step(timeStep) {
    this.height = this.maxHeight - 10 * Math.cos(this.angle);
    this.bottom = this.baseY + 10 * Math.cos(this.angle);
    this.angle += 0.01 * timeStep;
  }

}

export default Player;
