
const DrawPlayer = (context, maxHeight=50, angle=0, base=220) => () => {
  // console.log('refreshing');

  const height = maxHeight - 10*Math.cos(angle);
  const y = base + 10 * Math.cos(angle);
  angle += 0.1;

  context.clearRect(0, 0, 960, 640);

  context.beginPath();

  context.rect(480, y, 30, height);
  context.fillStyle = "#FFFFFF";
  context.fill();

  context.closePath();

};


export default DrawPlayer;
