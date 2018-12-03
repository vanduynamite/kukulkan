

export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};



// to draw a pyramid
// ctx.beginPath();
// ctx.moveTo(0, PYR_BOTTOM - 0 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 0 * PYR_DX, PYR_BOTTOM - 0 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 1 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 2 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 3 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 4 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 5 * PYR_DX, PYR_BOTTOM - 3 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 6 * PYR_DX, PYR_BOTTOM - 3 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 7 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 8 * PYR_DX, PYR_BOTTOM - 2 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 9 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 10 * PYR_DX, PYR_BOTTOM - 1 * PYR_DY);
// ctx.lineTo(PYR_LEFT + 11 * PYR_DX, PYR_BOTTOM - 0 * PYR_DY);
// ctx.lineTo(960, PYR_BOTTOM);
// ctx.stroke();
// ctx.closePath();
