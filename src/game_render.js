

class GameRender {

  constructor(game, context) {
    this.game = game;
    this.context = context;
  }

  startGame() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    // console.log(`game render step time: ${time}`);

    const timeStep = time - this.prevTime || 0;

    this.game.step(timeStep);
    this.game.draw(this.context);
    this.prevTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

export default GameRender;
