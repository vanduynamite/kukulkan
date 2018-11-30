

class GameRender {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.leftDown = false;
    this.rightDown = false;
  }

  startGame() {
    document.addEventListener('keydown', this.game.keyDownHandler, false);
    document.addEventListener('keyup', this.game.keyUpHandler, false);
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeStep = time - this.prevTime || 0;
    // console.log(`left down: ${this.leftDown}, right down: ${this.rightDown}`);
    this.game.step(timeStep, time);
    this.game.draw(this.ctx);
    this.prevTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }



  // bindKeyHandlers() {
  //   // Object.keys(GameView.MOVES).forEach((k) => {
  //   //   const move = GameView.MOVES[k];
  //   //   key(k, () => { ship.power(move); });
  //   // });
  //
  //   key('space', () => { console.log('space'); });
  // }

}

export default GameRender;
