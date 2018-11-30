
class GameRender {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  startGame() {
    document.addEventListener('keydown', this.game.keyDownHandler.bind(this.game), false);
    document.addEventListener('keyup', this.game.keyUpHandler.bind(this.game), false);
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeStep = time - this.prevTime || 0;
    this.game.step(timeStep, time);
    this.game.draw(this.ctx);
    this.prevTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

export default GameRender;
