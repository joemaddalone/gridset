import { Grid } from './gridset.d';
import { cycleCell } from './cycleCell';

export const calcXy = (rici: number, wh: string, grid: Grid) => {
  const gridDimension = wh === 'w' ? grid.width : grid.height;
  const cellDimension = wh === 'w' ? grid.cellWidth : grid.cellHeight;
  const iterableDimension = wh === 'w' ? grid.colCount : grid.rowCount;
  return rici * ((gridDimension - cellDimension) / (iterableDimension - 1));
};

const checkBounds = (ci: number, ri: number, grid: Grid) => {
  return ci >= 0 && ci < grid.colCount && ri >= 0 && ri < grid.rowCount;
};

export const cell = (ci: number, ri: number, grid: Grid) => {
  if (!checkBounds(ci, ri, grid)) {
    throw new Error('out of grid');
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
    cy: y + grid.cellHeight / 2,
    ci,
    ri,
    ...looks(ci, ri, grid),
  };

  return props;
};

export const looks = (ci: number, ri: number, grid: Grid) => {
  return {
    // one cell up
    _u: (mode: string) => {
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
    _lu: (mode: string) => {
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
    _ru: (mode: string) => {
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
    _d: (mode: string) => {
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
    _ld: (mode: string) => {
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
    _rd: (mode: string) => {
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
    _r: (mode: string) => {
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
    _l: (mode: string) => {
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
