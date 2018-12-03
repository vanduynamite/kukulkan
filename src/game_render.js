
class GameRender {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.frame = 0;
  }

  startGame() {
    document.addEventListener('keydown', this.game.keyDownHandler.bind(this.game), false);
    document.addEventListener('keyup', this.game.keyUpHandler.bind(this.game), false);

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeStep = time - this.prevTime || 0;
    this.frame = (this.frame + 1) % 60;
    this.game.step(timeStep, time, this.ctx, this.frame);
    this.prevTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

export default GameRender;
