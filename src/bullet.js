
class Bullet {

  constructor(direction, timeCreated) {
    this.direction = direction;
    this.pos = [480 + 20 * this.direction, 160];
    this.radius = 5;
    this.strength = 1;
    this.timeCreated = timeCreated;
    this.color = '#b540e4';

    this.gravity = 0.0004;
    this.vel = [this.direction * radius ** 1.25 * 0.01, 0];
    this.moving = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  step(timeStep) {
    if (this.moving) {
      this.pos[0] += this.vel[0] * timeStep;
      this.pos[1] += this.vel[1] * timeStep;
      this.vel[1] += this.gravity * timeStep;
    }
  }

}

export default Bullet;
