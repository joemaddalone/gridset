import { cell } from './util.js';

const area = (grid) => ({ ci1, ri1, ci2, ri2 }) => {
  const cell1 = cell(ci1, ri1, grid);
  const cell2 = cell(ci2, ri2, grid);
  return areaByCell(grid)(cell1, cell2);
};

const areaByCell = (grid) => (cell1, cell2) => {
  const leftCell = cell1.ci <= cell2.ci ? cell1 : cell2;
  const rightCell = cell1.ci <= cell2.ci ? cell2 : cell1;
  const topCell = cell1.ri <= cell2.ri ? cell1 : cell2;
  const bottomCell = cell1.ri <= cell2.ri ? cell2 : cell1;
  const w =
    bottomCell.ci !== topCell.ci
      ? rightCell.r - leftCell.l
      : grid.autoCellWidth;
  const h =
    bottomCell.ri !== topCell.ri
      ? bottomCell.b - topCell.t
      : grid.autoCellHeight;

  const cols = Array.from({ length: rightCell.ci - leftCell.ci });
  const rows = Array.from({ length: bottomCell.ri - topCell.ri });
  const cells = cols.map((_, ci) => {
    return rows.map((_, ri) => {
      return cell(leftCell.ci + ci, topCell.ri + ri, grid);
    });
  });

  return {
    x: leftCell.x,
    y: topCell.y,
    w,
    h,
    t: topCell.t,
    l: leftCell.l,
    r: rightCell.r,
    b: bottomCell.b,
    cx: (leftCell.l + w) / 2,
    cy: (topCell.t + h) / 2,
    cells,
  };
};

export default {
  area,
  areaByCell,
};
