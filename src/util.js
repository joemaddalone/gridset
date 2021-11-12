import { cycleCell } from './cycleCell.js';

export const calcXy = (rici, wh, grid) => {
  const gridDimension = wh === 'w' ? grid.width : grid.height;
  const cellDimension = wh === 'w' ? grid.cellWidth : grid.cellHeight;
  const iterableDimension = wh === 'w' ? grid.colCount : grid.rowCount;
  return rici * ((gridDimension - cellDimension) / (iterableDimension - 1));
};

const checkBounds = (ci, ri, grid) => {
  return ci >= 0 && ci < grid.colCount && ri >= 0 && ri < grid.rowCount;
};

export const cell = (ci, ri, grid) => {
  if (!checkBounds(ci, ri, grid)) {
    return null;
  }
  const x = calcXy(ci, 'w', grid);
  const y = calcXy(ri, 'h', grid);
  const props = {
    x,
    y,
    t: y,
    l: x,
    b: y + grid.cellHeight,
    r: x + grid.cellWidth,
    w: grid.cellWidth,
    h: grid.cellHeight,
    cx: x + grid.cellWidth / 2,
    cx: y + grid.cellHeight / 2,
    ci,
    ri,
    ...looks(ci, ri, grid),
  };

  return props;
};

export const looks = (ci, ri, grid) => {
  return {
    // one cell up
    _u: (mode) => {
      const nCell = cell(ci, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'u', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell up and one cell left
    _lu: (mode) => {
      const nCell = cell(ci - 1, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'lu', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell right and up
    _ru: (mode) => {
      const nCell = cell(ci + 1, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'ru', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell down
    _d: (mode) => {
      const nCell = cell(ci, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'd', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell left and down
    _ld: (mode) => {
      const nCell = cell(ci - 1, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'ld', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell right and down
    _rd: (mode) => {
      const nCell = cell(ci + 1, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'rd', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell right
    _r: (mode) => {
      const nCell = cell(ci + 1, ri, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'r', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell left
    _l: (mode) => {
      const nCell = cell(ci - 1, ri, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'l', grid);
      }
      return cell(ci, ri, grid);
    },
  };
};

export const colCells = (ci, grid) =>
  Array.from({ length: grid.rowCount }).map((_, ri) => cell(ci, ri, grid));

export const rowCells = (ri, grid) =>
  Array.from({ length: grid.colCount }).map((_, ci) => cell(ci, ri, grid));

export const cols = (grid) =>
  Array.from({ length: grid.colCount }).map((_, ci) => colCells(ci, grid));

export const rows = (grid) =>
  Array.from({ length: grid.rowCount }).map((_, ri) => rowCells(ri, grid));

export const flatCells = (grid) => cols(grid).flat(Infinity);
