
class Bullet {

  constructor(game, radius, direction) {
    this.direction = direction;
    this.pos = [480 + 20 * direction, 160];
    this.radius = radius; // min 5, max 20
    this.vel = [direction * radius**1.25 * 0.01, 0];
    this.game = game;

    this.color = '#b540e4';

    this.gravity = 0.0004;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  step(timeStep) {
    this.pos[0] += this.vel[0] * timeStep;
    this.pos[1] += this.vel[1] * timeStep;
    this.vel[1] += this.gravity * timeStep;
  }

}

export default Bullet;
