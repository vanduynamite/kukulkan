

class GameRender {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  startGame() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeStep = time - this.prevTime || 0;

    this.game.step(timeStep, time);
    this.game.draw(this.ctx);
    this.prevTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  // bindKeyHandlers() {
  //
  //
  //
  //   Object.keys(GameView.MOVES).forEach((k) => {
  //     const move = GameView.MOVES[k];
  //     key(k, () => { ship.power(move); });
  //   });
  //
  //   key("space", () => { ship.fireBullet(); });
  // }

}

export default GameRender;
