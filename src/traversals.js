const cycleCell = function (cell, dir) {
  let cells, cycleDir, si;
  const { ci, ri } = cell;
  const isCol = dir === 'u' || dir === 'd';
  const isRow = dir === 'l' || dir === 'r';
  const isDiag = !isCol && !isRow;

  if (isCol) {
    cells = this.colCells(ci);
    si = ri;
    if (dir === 'u') {
      cycleDir = 'r';
    }
    if (dir === 'd') {
      cycleDir = 'f';
    }
  }
  if (isRow) {
    cells = this.rowCells(ri);
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
      cells = this.diagonal(ci, ri);
    } else {
      cells = this.antidiagonal(ci, ri);
    }
    si = cells.findIndex((c) => c.ci === ci) + 1;
    cycleDir = dir.startsWith('r') ? 'f' : 'r';
  }

  return this.cycler(cells, cycleDir, si).next().value;
};
const scanCells = function (cells, dir = 'f', si = null) {
  cells = cells || this.flatCells;
  return this.scanner(cells, dir, si);
};
const cycleCells = function (cells, dir = 'f', si = null) {
  cells = cells || this.flatCells;
  return this.cycler(cells, dir, si);
};
const scanRow = function (ri, dir = 'f', si = null) {
  const cells = this.rowCells(ri);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
const scanDiagonal = function (ci, ri, dir = 'f', si = null) {
  const cells = this.diagonal(ci, ri);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
const scanAntidiagonal = function (ci, ri, dir = 'f', si = null) {
  const cells = this.antidiagonal(ci, ri);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
const scanCol = function (ci, dir = 'f', si = null) {
  const cells = this.colCells(ci);
  if (dir === 'r') {
    cells.reverse();
  }
  return this.scanCells(cells, si);
};
const cycleRow = function (ri, dir = 'f', si = null) {
  return this.cycleCells(this.rowCells(ri), dir, si);
};
const cycleCol = function (ci, dir = 'f', si = null) {
  return this.cycleCells(this.colCells(ci), dir, si);
};
const cycleDiagonal = function (ci, ri, dir = 'f', si) {
  return this.cycleCells(this.diagonal(ci, ri), dir, si);
};
const cycleAntidiagonal = function (ci, ri, dir = 'f', si = null) {
  return this.cycleCells(this.antidiagonal(ci, ri), dir, si);
};
const bounce = function (area, sx, sy, mx, my) {
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
