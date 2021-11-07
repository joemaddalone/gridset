import { rowCells } from './util.js';

const row = (grid) => (ri) => {
  const cells = rowCells(ri, grid);
  const y = cells[0].y;
  const h = cells[0].h;
  const cy = cells[0].cy;
  return {
    cells,
    x: 0,
    y: y,
    w: grid.width,
    h: h,
    cx: grid.width / 2,
    cy,
    t: y,
    l: 0,
    r: grid.width,
    b: y + h,
    ri,
  };
};
export default row;
