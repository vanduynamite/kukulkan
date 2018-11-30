import Player from './player.js';
import Alien from './alien.js';

class Game {

  constructor() {
    this.aliens = [];
    this.bullets = [];
    this.player = new Player(Game.width, Game.height);

    this.aliens.push(new Alien());
  }

  allObjects() {
    return [].concat(this.aliens, this.bullets, this.player);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.width, Game.height);
    this.allObjects().forEach(obj => obj.draw(ctx));

    const startY = Game.baseY;
    const startX = Game.baseX;
    const dy = Game.pyramidDY;
    const dx = Game.pyramidDX;

    ctx.beginPath();
    ctx.moveTo(0, startY - 0 * dy);
    ctx.lineTo(startX + 0 * dx, startY - 0 * dy);
    ctx.lineTo(startX + 1 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 2 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 3 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 4 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 5 * dx, startY - 3 * dy);
    ctx.lineTo(startX + 6 * dx, startY - 3 * dy);
    ctx.lineTo(startX + 7 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 8 * dx, startY - 2 * dy);
    ctx.lineTo(startX + 9 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 10 * dx, startY - 1 * dy);
    ctx.lineTo(startX + 11 * dx, startY - 0 * dy);
    ctx.lineTo(960, startY);
    ctx.stroke();
    ctx.closePath();
  }

  step(timeStep) {
    this.allObjects().forEach(obj => obj.step(timeStep));
    // collisions and such
  }

}

Game.width = 960;
Game.height = 540;
Game.baseY = 450;
Game.baseX = 84;
Game.pyramidDY = 80;
Game.pyramidDX = 72;

export default Game;
