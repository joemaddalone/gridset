import { GridSettings, Cell, CellArray, Area } from './gridset.d';
import iterators from './iterators';
const { cycler } = iterators;

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
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'u', grid)
        : cell(ci, ri, grid);
    },
    // one cell up and one cell left
    _lu: (mode: string) => {
      const nCell = cell(ci - 1, ri - 1, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'lu', grid)
        : cell(ci, ri, grid);
    },
    // one cell right and up
    _ru: (mode: string) => {
      const nCell = cell(ci + 1, ri - 1, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ru', grid)
        : cell(ci, ri, grid);
    },
    // one cell down
    _d: (mode: string) => {
      const nCell = cell(ci, ri + 1, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'd', grid)
        : cell(ci, ri, grid);
    },
    // one cell left and down
    _ld: (mode: string) => {
      const nCell = cell(ci - 1, ri + 1, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ld', grid)
        : cell(ci, ri, grid);
    },
    // one cell right and down
    _rd: (mode: string) => {
      const nCell = cell(ci + 1, ri + 1, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'rd', grid)
        : cell(ci, ri, grid);
    },
    // one cell right
    _r: (mode: string) => {
      const nCell = cell(ci + 1, ri, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'r', grid)
        : cell(ci, ri, grid);
    },
    // one cell left
    _l: (mode: string) => {
      const nCell = cell(ci - 1, ri, grid);
      if (nCell) return nCell;
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'l', grid)
        : cell(ci, ri, grid);
    },
  };
};

export const cycleCell = function (
  cell: Pick<Cell, 'ri' | 'ci'>,
  dir: string,
  grid: GridSettings,
) {
  let cells: CellArray = [];
  let cycleDir = '';
  let si = 0;
  const { ci, ri } = cell;
  const isCol = dir === 'u' || dir === 'd';
  const isRow = dir === 'l' || dir === 'r';
  const isDiag = !isCol && !isRow;
  const antidiagonalPath = antidiagonal(grid);
  const diagonalPath = diagonal(grid);

  if (isCol) {
    cells = colCells(ci, grid);
    si = ri;
    if (dir === 'u') {
      cycleDir = 'r';
    }
    if (dir === 'd') {
      cycleDir = 'f';
    }
  }
  if (isRow) {
    cells = rowCells(ri, grid);
    si = ci;
    if (dir === 'l') {
      cycleDir = 'r';
    }
    if (dir === 'r') {
      si = ci + 1;
      cycleDir = 'f';
    }
  }
  if (isDiag) {
    if (dir === 'lu' || dir === 'rd') {
      cells = diagonalPath(ci, ri);
    } else {
      cells = antidiagonalPath(ci, ri);
    }
    si = cells.findIndex((c) => c?.ci === ci) + 1;
    cycleDir = dir.startsWith('r') ? 'f' : 'r';
  }

  return cycler(cells, cycleDir, si).next().value;
};

export const colCells = (ci: number, grid: GridSettings): CellArray =>
  Array.from({ length: grid.rowCount }).map((_, ri) => cell(ci, ri, grid));

export const rowCells = (ri: number, grid: GridSettings): CellArray =>
  Array.from({ length: grid.colCount }).map((_, ci) => cell(ci, ri, grid));

export const cols = (grid: GridSettings): Area =>
  Array.from({ length: grid.colCount }).map((_, ci) => colCells(ci, grid));

export const rows = (grid: GridSettings): Area =>
  Array.from({ length: grid.rowCount }).map((_, ri) => rowCells(ri, grid));

export const flatCells = (grid: GridSettings) =>
  cols(grid).flatMap((col) => col);

export const diagonal = (grid: GridSettings) => (
  ci: number,
  ri: number,
): CellArray => {
  const cells = flatCells(grid);
  const dCells = cells.filter((c: any) => ci - c.ci === ri - c.ri);
  return dCells;
};

export const antidiagonal = (grid: GridSettings) => (
  ci: number,
  ri: number,
) => {
  const cells = flatCells(grid);
  return cells.filter((c: any) => {
    if (ci === c.ci && ri === c.ri) {
      return true; // this is our cell.
    }
    const cResult = ci - c.ci;
    const rResult = ri - c.ri;
    if (cResult < 0 || rResult < 0) {
      // one of them must be negative
      return Math.min(cResult, rResult) === Math.max(cResult, rResult) * -1;
    } else {
      return false;
    }
  });
};

export const area = (grid: GridSettings) => ({
  ci1,
  ri1,
  ci2,
  ri2,
}: {
  ci1: number;
  ri1: number;
  ci2: number;
  ri2: number;
}) => {
  const cell1 = cell(ci1, ri1, grid);
  const cell2 = cell(ci2, ri2, grid);
  if (cell1 && cell2) {
    return areaByCell(grid)(cell1, cell2);
  }
  return;
};

export const areaByCell = (grid: GridSettings) => (
  cell1: Cell,
  cell2: Cell,
) => {
  const leftCell = cell1.ci <= cell2.ci ? cell1 : cell2;
  const rightCell = cell1.ci <= cell2.ci ? cell2 : cell1;
  const topCell = cell1.ri <= cell2.ri ? cell1 : cell2;
  const bottomCell = cell1.ri <= cell2.ri ? cell2 : cell1;
  const w =
    bottomCell.ci !== topCell.ci ? rightCell.r - leftCell.l : grid.cellWidth;
  const h =
    bottomCell.ri !== topCell.ri ? bottomCell.b - topCell.t : grid.cellHeight;

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
