import paths from './paths.js';
import { colCells, rowCells } from './util.js';
import iterators from './iterators.js';
const { cycler } = iterators;

export const cycleCell = function (cell, dir, grid) {
  let cells, cycleDir, si;
  const { ci, ri } = cell;
  const isCol = dir === 'u' || dir === 'd';
  const isRow = dir === 'l' || dir === 'r';
  const isDiag = !isCol && !isRow;
  const antidiagonal = paths.antidiagonal(grid);
  const diagonal = paths.diagonal(grid);

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
      cells = diagonal(ci, ri);
    } else {
      cells = antidiagonal(ci, ri);
    }
    si = cells.findIndex((c) => c.ci === ci) + 1;
    cycleDir = dir.startsWith('r') ? 'f' : 'r';
  }

  return cycler(cells, cycleDir, si).next().value;
};
export const scanCells = function (cells, dir = 'f', si = null) {
  cells = cells || this.flatCells;
  return this.scanner(cells, dir, si);
};
export const cycleCells = function (cells, dir = 'f', si = null) {
  cells = cells || this.flatCells;
  return this.cycler(cells, dir, si);
};
export const scanRow = function (ri, dir = 'f', si = null) {
  const cells = this.rowCells(ri);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
export const scanDiagonal = function (ci, ri, dir = 'f', si = null) {
  const cells = this.diagonal(ci, ri);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
export const scanAntidiagonal = function (ci, ri, dir = 'f', si = null) {
  const cells = this.antidiagonal(ci, ri);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
export const scanCol = function (ci, dir = 'f', si = null) {
  const cells = this.colCells(ci);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
export const cycleRow = function (ri, dir = 'f', si = null) {
  return this.cycleCells(this.rowCells(ri), dir, si);
};
export const cycleCol = function (ci, dir = 'f', si = null) {
  return this.cycleCells(this.colCells(ci), dir, si);
};
export const cycleDiagonal = function (ci, ri, dir = 'f', si) {
  return this.cycleCells(this.diagonal(ci, ri), dir, si);
};
export const cycleAntidiagonal = function (ci, ri, dir = 'f', si = null) {
  return this.cycleCells(this.antidiagonal(ci, ri), dir, si);
};
export const bounce = function (area, sx, sy, mx, my) {
  const cells = area || this.cells;
  return this.bouncer(cells, sx, sy, mx, my);
};

export default {
  cycleCell,
  scanCells,
  cycleCells,
  scanRow,
  scanDiagonal,
  scanAntidiagonal,
  scanCol,
  cycleRow,
  cycleCol,
  cycleDiagonal,
  cycleAntidiagonal,
  bounce,
};
