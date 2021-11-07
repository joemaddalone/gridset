const row = function (ri) {
  const cells = this.rowCells(ri);
  const y = cells[0].y;
  const h = cells[0].h;
  const cy = cells[0].cy;
  return {
    cells,
    x: 0,
    y: y,
    w: this.width,
    h: h,
    cx: this.width / 2,
    cy,
    t: y,
    l: 0,
    r: this.width,
    b: y + h,
    ri,
  };
};
export default row;
