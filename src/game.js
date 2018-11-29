import Player from './player.js';

class Game {

  constructor() {
    this.aliens = [];
    this.bullets = [];
    this.player = new Player();
  }

  allObjects() {
    return [].concat(this.aliens, this.bullets, this.player);
  }

  draw(context) {
    context.clearRect(0, 0, 960, 640);
    this.allObjects().forEach(obj => obj.draw(context));
  }

  step(timeStep) {
    this.allObjects().forEach(obj => obj.step(timeStep));
    // collisions and such
  }

}

export default Game;
