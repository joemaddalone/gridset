const col = function (ci) {
  const cells = this.colCells(ci);
  const x = cells[0].x;
  const w = cells[0].w;
  const h = this.height;
  const cx = cells[0].cx;
  return {
    cells,
    x,
    y: 0,
    w,
    h,
    t: 0,
    l: x,
    r: x + w,
    b: this.height,
    cx,
    cy: this.height / 2,
    ci,
  };
};

export default col;
