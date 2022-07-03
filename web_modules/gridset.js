/**
 * @param  {array} arr
 * @param  {string} dir="f"
 * @param  {number} si=0
 */
const scan = function * (arr, dir = 'f', startingIndex = 0) {
  const end = arr.length - 1;
  let index = dir === 'f' ? -1 : end + 1;
  if (startingIndex !== null) {
    if (dir === 'f') {
      index = startingIndex - 1;
    } else {
      index = startingIndex + 1;
    }
  }

  while (true) {
    if (dir === 'f') {
      if (index !== end) {
        index++;
      } else {
        dir = 'r';
        index--;
      }
    } else {
      if (index !== 0) {
        index--;
      } else {
        dir = 'f';
        index++;
      }
    }
    yield { el: arr[index], col: index };
  }
};
/**
 * @param  {array} arr
 * @param  {number} sx
 * @param  {number} sy
 * @param  {number} initMx=1
 * @param  {number} initMy=1
 */
const bounce = function * (arr, sx, sy) {
  let mx = 1;
  let my = 1;
  // // Because the first yield adds mx/my we reduce sx/sy by mx/my.
  let x = sx ? sx - 1 : -1;
  let y = sy ? sy - 1 : -1;
  const w = arr.length - 1;
  const h = (arr[0] && arr[0].length - 1) || 0;
  while (true) {
    if (mx + x > w || mx + x < 0) {
      mx *= -1;
    }
    if (my + y > h || my + y < 0) {
      my *= -1;
    }
    x = x + mx;
    y = y + my;
    yield { el: arr?.[x]?.[y] || 0, row: x, col: y };
  }
};
/**
 * @param  {array} arr
 * @param  {string} d="f"
 * @param  {number} si
 */
const cycle = function * (arr, d = 'f', startingIndex = 0) {
  let index = startingIndex ? startingIndex - 1 : -1;
  const dir = d || 'f';
  const w = arr.length - 1;
  while (true) {
    if (dir === 'f') {
      if (index === w) {
        index = -1;
      }
      index++;
    } else {
      if (index <= 0) {
        index = w + 1;
      }
      index--;
    }
    yield { el: arr[index], col: index };
  }
};

/**
 * @param  {array} arr
 * @param  {number} row
 * @param  {number} col
 */
const cell$1 = (arr, row, col) => ({ row, col, val: arr[row][col] });

const toCoords = (arr) => {
  return arr.map((row, i) => row.map((cell, j) => [i, j])).flat()
};
/**
 * @param  {array} arr
 * @param  {number} row
 * @param  {number} col
 */
const diagonal = (arr, row, col) => {
  return toCoords(arr)
    .filter((c) => row - c[0] === col - c[1])
    .map((dc) => cell$1(arr, dc[0], dc[1]))
};
/**
 * @param  {array} arr
 * @param  {number} row
 * @param  {number} col
 */
const antidiagonal = (arr, row, col) => {
  return toCoords(arr)
    .filter((c) => {
      if (row === c[0] && col === c[1]) {
        return true
      }
      const cResult = col - c[1];
      const rResult = row - c[0];
      if (cResult < 0 || rResult < 0) {
        // one of them must be negative
        return Math.min(cResult, rResult) === Math.max(cResult, rResult) * -1
      } else {
        return false
      }
    })
    .map((dc) => cell$1(arr, dc[0], dc[1]))
};

const calcXy = (rici, wh, grid) => {
  const gridDimension = wh === 'w' ? grid.width : grid.height;
  const cellDimension = wh === 'w' ? grid.cellWidth : grid.cellHeight;
  const iterableDimension = wh === 'w' ? grid.colCount : grid.rowCount;
  return rici * ((gridDimension - cellDimension) / (iterableDimension - 1))
};

const checkBounds = (ci, ri, grid) => {
  return ci >= 0 && ci < grid.colCount && ri >= 0 && ri < grid.rowCount
};

const cell = (ci, ri, grid) => {
  if (!checkBounds(ci, ri, grid)) {
    return null
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
    ...looks(ci, ri, grid)
  };

  return props
};

const looks = (ci, ri, grid) => {
  return {
    // one cell up
    _u: (mode) => {
      const nCell = cell(ci, ri - 1, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'u', grid)
        : cell(ci, ri, grid)
    },
    // one cell up and one cell left
    _lu: (mode) => {
      const nCell = cell(ci - 1, ri - 1, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'lu', grid)
        : cell(ci, ri, grid)
    },
    // one cell right and up
    _ru: (mode) => {
      const nCell = cell(ci + 1, ri - 1, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ru', grid)
        : cell(ci, ri, grid)
    },
    // one cell down
    _d: (mode) => {
      const nCell = cell(ci, ri + 1, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'd', grid)
        : cell(ci, ri, grid)
    },
    // one cell left and down
    _ld: (mode) => {
      const nCell = cell(ci - 1, ri + 1, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ld', grid)
        : cell(ci, ri, grid)
    },
    // one cell right and down
    _rd: (mode) => {
      const nCell = cell(ci + 1, ri + 1, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'rd', grid)
        : cell(ci, ri, grid)
    },
    // one cell right
    _r: (mode) => {
      const nCell = cell(ci + 1, ri, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'r', grid)
        : cell(ci, ri, grid)
    },
    // one cell left
    _l: (mode) => {
      const nCell = cell(ci - 1, ri, grid);
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'l', grid)
        : cell(ci, ri, grid)
    }
  }
};

const cycleCell = function (
  cell,
  dir,
  grid
) {
  let cells = [];
  let cycleDir = '';
  let si = 0;
  const { ci, ri } = cell;
  const isCol = dir === 'u' || dir === 'd';
  const isRow = dir === 'l' || dir === 'r';
  const isDiag = !isCol && !isRow;

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
      cells = diagonal(rows(grid), ri, ci).map(c => c.val);
    } else {
      cells = antidiagonal(rows(grid), ri, ci).map(c => c.val).reverse();
    }
    si = cells.findIndex((c) => c?.ci === ci) + 1;
    cycleDir = dir.startsWith('r') ? 'f' : 'r';
  }
  return cycle(cells, cycleDir, si).next().value.el
};

const colCells = (ci, grid) =>
  Array.from({ length: grid.rowCount }).map((_, i) => cell(ci, i, grid));

const rowCells = (ri, grid) =>
  Array.from({ length: grid.colCount }).map((_, i) => cell(i, ri, grid));

const cols = (grid) =>
  Array.from({ length: grid.colCount }).map((_, i) => colCells(i, grid));

const rows = (grid) =>
  Array.from({ length: grid.rowCount }).map((_, i) => rowCells(i, grid));

const flatCells = (grid) =>
  cols(grid).flatMap((col) => col);

const area = (grid) => ({
  ci1,
  ri1,
  ci2,
  ri2
}) => {
  const cell1 = cell(ci1, ri1, grid);
  const cell2 = cell(ci2, ri2, grid);
  if (cell1 && cell2) {
    return areaByCell(grid)(cell1, cell2)
  }
};

const areaByCell = (grid) => (
  cell1,
  cell2
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
      return cell(leftCell.ci + ci, topCell.ri + ri, grid)
    })
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
    cells
  }
};

const row = (grid) => (ri) => {
  const cells = rowCells(ri, grid);
  if (cells[0]) {
    const y = cells[0].y;
    const h = cells[0].h;
    const cy = cells[0].cy;
    return {
      cells,
      x: 0,
      y,
      w: grid.width,
      h,
      cx: grid.width / 2,
      cy,
      t: y,
      l: 0,
      r: grid.width,
      b: y + h,
      ri
    }
  } else {
    throw new Error('no cell at position 0')
  }
};

const col = (grid) => (ci) => {
  const cells = colCells(ci, grid);
  if (cells[0]) {
    const x = cells[0].x;
    const w = cells[0].w;
    const h = grid.height;
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
      b: grid.height,
      cx,
      cy: grid.height / 2,
      ci
    }
  } else {
    throw new Error('no cell at position 0')
  }
};

class Gridset {
  constructor ({
    width = 0,
    height = 0,
    rows = 0,
    cols = 0,
    cellWidth = null,
    cellHeight = null
  }) {
    this.settings = {
      width: Number(width),
      height: Number(height),
      rowCount: Number(rows),
      colCount: Number(cols),
      cellWidth: cellWidth || width / cols,
      cellHeight: cellHeight || height / rows
    };

    this.col = col(this.settings);
    this.row = row(this.settings);
    this.diagonal = (ci, ri) => diagonal(this.rows, ri, ci).map(c => c.val);
    this.antidiagonal = (ci, ri) => antidiagonal(this.rows, ri, ci).map(c => c.val).reverse();
    this.area = area(this.settings);
    this.areaByCell = areaByCell(this.settings);
  }

  get cells () {
    return cols(this.settings)
  }

  get cols () {
    return cols(this.settings)
  }

  get rows () {
    return rows(this.settings)
  }

  get flatCells () {
    return flatCells(this.settings)
  }

  cell (ci, ri) {
    return cell(ci, ri, this.settings)
  }

  rowCells (ri) {
    return rowCells(ri, this.settings)
  }

  colCells (ci) {
    return colCells(ci, this.settings)
  }

  scanCells (cells = this.flatCells, dir = 'f', si = null) {
    return scan(cells, dir, si)
  }

  cycleCells (cells = this.flatCells, dir = 'f', si = null) {
    return cycle(cells, dir, si)
  }

  scanRow (ri, dir = 'f', si = null) {
    const cells = this.rowCells(ri);
    return this.scanCells(cells, dir, si)
  }

  scanDiagonal (ci, ri, dir = 'f', si = null) {
    const cells = diagonal(this.rows, ri, ci).map(c => c.val);
    return this.scanCells(cells, dir, si)
  }

  scanAntidiagonal (ci, ri, dir = 'f', si = null) {
    const cells = antidiagonal(this.rows, ri, ci).map(c => c.val);
    if (dir === 'r') {
      cells.reverse();
    }
    return this.scanCells(cells, dir, si)
  }

  scanCol (ci, dir = 'f', si = null) {
    const cells = this.colCells(ci);
    return this.scanCells(cells, dir, si)
  }

  cycleRow (ri, dir = 'f', si = null) {
    return this.cycleCells(this.rowCells(ri), dir, si)
  }

  cycleCol (ci, dir = 'f', si = null) {
    return this.cycleCells(this.colCells(ci), dir, si)
  }

  cycleDiagonal (ci, ri, dir = 'f', si = null) {
    return this.cycleCells(diagonal(this.rows, ri, ci).map(c => c.val), dir, si)
  }

  cycleAntidiagonal (ci, ri, dir = 'f', si = null) {
    return this.cycleCells(antidiagonal(this.rows, ri, ci).map(c => c.val).reverse(), dir, si)
  }

  bounce (area = this.cells, sx, sy, mx, my) {
    return bounce(area, sx, sy)
  }

  get width () {
    return this.settings.width
  }

  get height () {
    return this.settings.height
  }

  get rowCount () {
    return this.settings.rowCount
  }

  get colCount () {
    return this.settings.colCount
  }

  get cellWidth () {
    return this.settings.cellWidth
  }

  get cellHeight () {
    return this.settings.cellHeight
  }
}

export { Gridset as default };
