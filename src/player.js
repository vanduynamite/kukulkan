
class Player {

  constructor(context) {
    this.context = context;
    this.maxHeight = 50;
    this.angle = 0;
    this.baseY = 220;
    this.draw = this.draw.bind(this);
  }

  draw() {
    const height = this.maxHeight - 10*Math.cos(this.angle);
    const y = this.baseY + 10 * Math.cos(this.angle);
    this.angle += 0.1;

    this.context.clearRect(0, 0, 960, 640);

    this.context.beginPath();

    this.context.rect(480, y, 30, height);
    this.context.fillStyle = "#FFFFFF";
    this.context.fill();

    this.context.closePath();
  }

}

export default Player;
