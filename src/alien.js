import Game from './game';

class Alien {

  constructor() {
    this.width = 40;
    this.height = 50;
    this.direction = Math.sign(Math.random() - 0.5);
    // this.direction = -1;

    this.left = (Game.width - this.width) / 2 - this.direction * (Game.width + this.width) / 2;
    this.bottom = Game.baseY - this.height;


    // 0.03 slow, 0.06 medium, 0.1 fast, 0.15 very fast, 0.2 sprinter
    this.speed = 0.1 * this.direction;
    this.health = 1;
    this.color = "#FFFFFF";
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
    const toe = this.left + this.width * 0.5;
    // 84 or 876
    // 480 - 396 or 480 + 396
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

  }

}

export default Alien;
