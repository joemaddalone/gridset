function* scan(arr, si) {
  let dir = 'f';
  let index = si ?? -1;
  const end = arr.length - 1;
  while (true) {
    switch (dir) {
      case 'f':
        if (index !== end) {
          index++;
        }
        if (index === end) {
          dir = 'r';
        }
        break;
      case 'r':
        if (index !== 0) {
          index--;
        }
        if (index === 0) {
          dir = 'f';
        }
        break;
    }
    yield arr[index];
  }
}

function* bounce(arr, sx, sy, initMx = 1, initMy = 1) {
  let mx = initMx;
  let my = initMy;
  // // Because the first yield adds mx/my we reduce sx/sy by mx/my.
  let x = sx ? sx - 1 : -1;
  let y = sy ? sy - 1 : -1;
  const w = arr.length - 1;
  const h = arr[0].length - 1;
  while (true) {
    if (mx + x > w || mx + x < 0) {
      mx *= -1;
    }
    if (my + y > h || my + y < 0) {
      my *= -1;
    }
    x = x + mx;
    y = y + my;
    yield arr[x][y];
  }
}

function* cycle(arr, d = 'f', si) {
  let index = si ? si - 1 : -1;
  let dir = d || 'f';
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
    yield arr[index];
  }
}
export class Gridset {
  constructor({
    width = 0,
    height = 0,
    rows = 0,
    cols = 0,
    cellWidth = null,
    cellHeight = null,
  }) {
    this.properties = { width, height, rows, cols };
    this.width = Number(width);
    this.height = Number(height);
    this.rowCount = Number(rows);
    this.colCount = Number(cols);
    this.gWidth = width / cols;
    this.gHeight = height / rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.create();
  }
  __calcCustom(rici, wh) {
    const gridDimension = wh === 'w' ? this.width : this.height;
    const cellDimension = wh === 'w' ? this.cellWidth : this.cellHeight;
    const iterableDimension = wh === 'w' ? this.colCount : this.rowCount;
    return rici * ((gridDimension - cellDimension) / (iterableDimension - 1));
  }
  __createCell(ci, ri) {
    const x = ci * this.gWidth;
    const y = ri * this.gHeight;
    const w = this.gWidth;
    const h = this.gHeight;
    const cellProps = {
      x,
      y,
      w,
      h,
      t: y,
      l: x,
      ri,
      ci,
    };

    cellProps.look = this.look({ ...cellProps });

    if (this.cellWidth) {
      cellProps.x = this.__calcCustom(ci, 'w');
      cellProps.w = this.cellWidth;
    }
    if (this.cellHeight) {
      cellProps.y = this.__calcCustom(ri, 'h');
      cellProps.h = this.cellHeight;
    }

    cellProps.r = cellProps.x + cellProps.w;
    cellProps.b = cellProps.y + cellProps.h;
    cellProps.cx = cellProps.x + cellProps.w / 2;
    cellProps.cy = cellProps.y + cellProps.h / 2;

    return cellProps;
  }
  /**
   *
   * @param {*} cell
   */
  look(cell) {
    const { ci, ri } = cell;
    const make = (mode, dir) => {
      return this.__createCellLookMode(mode, ci, ri, dir);
    };
    return {
      u: (mode) => this.cell(ci, ri - 1, { ci, ri, mode: make(mode, 'u') }),
      lu: (mode) =>
        this.cell(ci - 1, ri - 1, { ci, ri, mode: make(mode, 'lu') }),
      ru: (mode) =>
        this.cell(ci + 1, ri - 1, { ci, ri, mode: make(mode, 'ru') }),
      d: (mode) => this.cell(ci, ri + 1, { ci, ri, mode: make(mode, 'd') }),
      ld: (mode) =>
        this.cell(ci - 1, ri + 1, { ci, ri, mode: make(mode, 'ld') }),
      rd: (mode) =>
        this.cell(ci + 1, ri + 1, { ci, ri, mode: make(mode, 'rd') }),
      r: (mode) => this.cell(ci + 1, ri, { ci, ri, mode: make(mode, 'r') }),
      l: (mode) => this.cell(ci - 1, ri, { ci, ri, mode: make(mode, 'l') }),
    };
  }
  __createCellLookMode(mode = null, ci, ri, dir) {
    if (!mode) {
      return null;
    }
    if (mode === 'cycle') {
      return this.cycleCell.bind(this, { ci, ri }, dir);
    }
    return null;
  }
  create() {
    this.gridMap = Array.from({ length: this.colCount }).map((c, ci) => {
      return Array.from({ length: this.rowCount }).map((r, ri) => {
        return this.__createCell(ci, ri);
      });
    });
  }
  get cells() {
    // filter null -> null = deleted cell functionality not yet implemented.
    return this.gridMap.map((c) => c.filter((r) => r !== null));
  }
  get flatCells() {
    return this.cells.flat(Infinity);
  }
  cell(ci, ri, callerCell = null) {
    const checkBounds = (c, r) => {
      return c >= 0 && (c < this.colCount) & (r >= 0) && r < this.rowCount;
    };
    return checkBounds(ci, ri)
      ? this.gridMap[ci][ri]
      : callerCell && checkBounds(callerCell.ci, callerCell.ri)
      ? !callerCell.mode
        ? this.gridMap[callerCell.ci][callerCell.ri]
        : callerCell.mode()
      : null;
  }
  area({ ci1, ri1, ci2, ri2 }) {
    const cell1 = this.cell(ci1, ri1);
    const cell2 = this.cell(ci2, ri2);
    return this.areaByCell(cell1, cell2);
  }
  areaByCell(cell1, cell2) {
    const leftCell = cell1.ci <= cell2.ci ? cell1 : cell2;
    const rightCell = cell1.ci <= cell2.ci ? cell2 : cell1;
    const topCell = cell1.ri <= cell2.ri ? cell1 : cell2;
    const bottomCell = cell1.ri <= cell2.ri ? cell2 : cell1;
    const w =
      bottomCell.ci !== topCell.ci ? rightCell.r - leftCell.l : this.gWidth;
    const h =
      bottomCell.ri !== topCell.ri ? bottomCell.b - topCell.t : this.gHeight;

    const cols = Array.from({ length: rightCell.ci - leftCell.ci });
    const rows = Array.from({ length: bottomCell.ri - topCell.ri });
    const cells = cols.map((_, ci) => {
      return rows.map((_, ri) => {
        return this.cell(leftCell.ci + ci, topCell.ri + ri);
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
      cx: (topCell.t + h) / 2,
      cells,
    };
  }
  row(ri) {
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
  }
  rowCells(ri) {
    return this.gridMap.map((c) => c[ri]);
  }
  get rows() {
    return Array.from({ length: this.rowCount }).map((_, i) =>
      this.rowCells(i),
    );
  }
  col(ci) {
    const cells = this.colCells(ci);
    const x = cells[0].x;
    const w = cells[0].w;
    const h = this.height;
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
      b: this.height,
      cx,
      cy: this.height / 2,
      ci,
    };
  }
  colCells(ci) {
    return this.gridMap[ci];
  }
  get cols() {
    return this.gridMap;
  }
  diagonal(ci, ri) {
    const cells = this.flatCells;
    const dCells = cells.filter((c) => ci - c.ci === ri - c.ri);
    return dCells;
  }
  antidiagonal(ci, ri) {
    const cells = this.flatCells;
    return cells.filter((c) => {
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
  }
  cycleCell(cell, dir) {
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

    return cycle(cells, cycleDir, si).next().value;
  }
  scanCells(cells, dir = 'f', si = null) {
    cells = cells || this.flatCells;
    return scan(cells, dir, si);
  }
  cycleCells(cells, dir = 'f', si = null) {
    cells = cells || this.flatCells;
    return cycle(cells, dir, si);
  }
  scanRow(ri, dir = 'f', si = null) {
    const cells = this.rowCells(ri);
    if (dir === 'r') {
      cells.reverse();
    }
    return this.scanCells(cells, si);
  }
  scanDiagonal(ci, ri, dir = 'f', si = null) {
    const cells = this.diagonal(ci, ri);
    if (dir === 'r') {
      cells.reverse();
    }
    return this.scanCells(cells, si);
  }
  scanAntidiagonal(ci, ri, dir = 'f', si = null) {
    const cells = this.antidiagonal(ci, ri);
    if (dir === 'r') {
      cells.reverse();
    }
    return this.scanCells(cells, si);
  }
  scanCol(ci, dir = 'f', si = null) {
    const cells = this.colCells(ci);
    if (dir === 'r') {
      cells.reverse();
    }
    return this.scanCells(cells, si);
  }
  cycleRow(ri, dir = 'f', si = null) {
    return this.cycleCells(this.rowCells(ri), dir, si);
  }
  cycleCol(ci, dir = 'f', si = null) {
    return this.cycleCells(this.colCells(ci), dir, si);
  }
  cycleDiagonal(ci, ri, dir = 'f', si) {
    return this.cycleCells(this.diagonal(ci, ri), dir, si);
  }
  cycleAntidiagonal(ci, ri, dir = 'f', si = null) {
    return this.cycleCells(this.antidiagonal(ci, ri), dir, si);
  }
  bounce(area, sx, sy, mx, my) {
    const cells = area || this.cells;
    return bounce(cells, sx, sy, mx, my);
  }
}
