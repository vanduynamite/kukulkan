import Player from './player.js';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('kukulkanvas');
  const context = canvas.getContext('2d');
  canvas.width = 960;
  canvas.height = 640;

  // new GameView(game, ctx).start();

  const player = new Player(context);

  setInterval(player.draw, 10);

});

// const draw = (context, maxHeight=50, angle=0, base=220) => () => {
//   console.log('refreshing');
//
//   const height = maxHeight - 10*Math.cos(angle);
//   y = base + 10*Math.cos(angle);
//   angle += 0.1;
//
//   context.clearRect(0, 0, 960, 640);
//
//   context.beginPath();
//
//   context.rect(480, y, 30, height);
//   context.fillStyle = "#FFFFFF";
//   context.fill();
//
//   context.closePath();
//
// };






// context.arc(480, 320, 320, start_angle, end_angle, false);
// context.fillStyle = "#FFFFFF";
// context.fill();

// context.rect(center_x, center_y, width, height);
// context.arc(center_x, center_y, radius, start_angle, end_angle, reverse?)

// draw just a line
// context.strokeStyle = "rgba(255, 0, 255, 50)";
// context.stroke();

// as opposed to stroke for outlines...
// context.fillStyle = "#FFFFFF";
// context.fill();
