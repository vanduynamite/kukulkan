import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_BASE_HEIGHT,
  playerSpriteMap,
} from './settings';

class Player {

  constructor(game) {
    this.game = game;
    this.width = PLAYER_WIDTH;
    this.left = GAME_WIDTH / 2 - this.width / 2;
    this.direction = 1;

    this.maxHeight = PLAYER_HEIGHT;
    this.height = this.maxHeight;
    this.bottom = PLAYER_BASE_HEIGHT;

    this.angle = 0;

    this.imgObj = playerSpriteMap(this.direction);
  }

  updateDirection(direction) {
    this.direction = direction;
    this.imgObj = playerSpriteMap(this.direction);
  }

  draw(ctx, frame) {
    const imgObj = this.imgObj;

    const sprite = Math.floor(frame / (60 / imgObj.frames));

    const sx = imgObj.start - imgObj.width * sprite * this.direction;
    const dx = this.left - (imgObj.width - PLAYER_WIDTH) / 2 + imgObj.sideBuffer;
    const dy = this.bottom + imgObj.bottomBuffer;

    ctx.drawImage(imgObj.img, sx, 0, imgObj.width, imgObj.height,
      dx, dy, imgObj.width, imgObj.height)

    if (this.game.hitboxes) {
      ctx.beginPath();
      ctx.rect(this.left, this.bottom, this.width, this.height);
      ctx.stroke();
      ctx.closePath();
    }
  }

  step(timeStep) {
    this.height = this.maxHeight - 1 * Math.cos(this.angle);
    this.bottom = PLAYER_BASE_HEIGHT + 1 * Math.cos(this.angle);
    this.angle += 0.005 * timeStep;
  }

}

export default Player;
