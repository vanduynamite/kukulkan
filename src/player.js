import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_BASE_HEIGHT,
} from './settings';

class Player {

  constructor() {
    this.width = PLAYER_WIDTH;
    this.left = GAME_WIDTH / 2 - this.width / 2;

    this.maxHeight = PLAYER_HEIGHT;
    this.height = this.maxHeight;
    this.bottom = PLAYER_BASE_HEIGHT;

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
    this.bottom = PLAYER_BASE_HEIGHT + 10 * Math.cos(this.angle);
    this.angle += 0.01 * timeStep;
  }

}

export default Player;
