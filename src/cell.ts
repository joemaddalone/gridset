import { GridSettings } from './gridset.d';
import { cycleCell } from './cycleCell';

export const calcXy = (rici: number, wh: string, grid: GridSettings) => {
  const gridDimension = wh === 'w' ? grid.width : grid.height;
  const cellDimension = wh === 'w' ? grid.cellWidth : grid.cellHeight;
  const iterableDimension = wh === 'w' ? grid.colCount : grid.rowCount;
  return rici * ((gridDimension - cellDimension) / (iterableDimension - 1));
};

const checkBounds = (ci: number, ri: number, grid: GridSettings) => {
  return ci >= 0 && ci < grid.colCount && ri >= 0 && ri < grid.rowCount;
};

export const cell = (ci: number, ri: number, grid: GridSettings) => {
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
    cy: y + grid.cellHeight / 2,
    ci,
    ri,
    ...looks(ci, ri, grid),
  };

  return props;
};

export const looks = (ci: number, ri: number, grid: GridSettings) => {
  return {
    // one cell up
    _u: (mode: string) => {
      const nCell = cell(ci, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'u', grid)
        : cell(ci, ri, grid);
    },
    // one cell up and one cell left
    _lu: (mode: string) => {
      const nCell = cell(ci - 1, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'lu', grid)
        : cell(ci, ri, grid);
    },
    // one cell right and up
    _ru: (mode: string) => {
      const nCell = cell(ci + 1, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ru', grid)
        : cell(ci, ri, grid);
    },
    // one cell down
    _d: (mode: string) => {
      const nCell = cell(ci, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'd', grid)
        : cell(ci, ri, grid);
    },
    // one cell left and down
    _ld: (mode: string) => {
      const nCell = cell(ci - 1, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ld', grid)
        : cell(ci, ri, grid);
    },
    // one cell right and down
    _rd: (mode: string) => {
      const nCell = cell(ci + 1, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'rd', grid)
        : cell(ci, ri, grid);
    },
    // one cell right
    _r: (mode: string) => {
      const nCell = cell(ci + 1, ri, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'r', grid)
        : cell(ci, ri, grid);
    },
    // one cell left
    _l: (mode: string) => {
      const nCell = cell(ci - 1, ri, grid);
      if (nCell) {
        return nCell;
      }
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'l', grid)
        : cell(ci, ri, grid);
    },
  };
};
