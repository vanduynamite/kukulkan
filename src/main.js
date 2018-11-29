
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('kukulkanvas');
  const context = canvas.getContext('2d');
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;

  // const game = new Game();
  // new GameView(game, ctx).start();

  context.beginPath();
  context.rect(20, 40, 50, 50);
  context.fillStyle = "#FFFFFF";
  context.fill();
  context.closePath();
});
