
class Player {

  constructor() {
    this.maxHeight = 50;
    this.baseY = 220;

    this.height = this.maxHeight;
    this.y = this.baseY;

    this.angle = 0;
    this.draw = this.draw.bind(this);
  }

  draw(context) {
    context.beginPath();
    context.rect(480, this.y, 30, this.height);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
  }

  step(timeStep) {
    this.height = this.maxHeight - 10 * Math.cos(this.angle);
    this.y = this.baseY + 10 * Math.cos(this.angle);
    this.angle += 0.01 * timeStep;
  }

}

export default Player;
