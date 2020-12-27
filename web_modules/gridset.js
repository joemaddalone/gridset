function* scan(arr, d, i) {
  let dir = d || 'f';
  let index = i ?? -1;
  const end = arr.length - 1;
  while (true) {
    switch (dir) {
      case 'f':
        if (index !== end) {
          index++;
        }
        if (index === end) {
          dir = 'b';
        }
        break;
      case 'b':
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

function* cycle(arr, si) {
  let index = si ?? -1;
  const w = arr.length - 1;
  while (true) {
    if (index === w) {
      index = -1;
    }
    index++;
    yield arr[index];
  }
}

class Gridset {
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
      cx: x + w / 2,
      cy: y + h / 2,
      t: y,
      l: x,
      r: x + w,
      b: y + h,
      ri,
      ci,
    };

    if (this.cellWidth) {
      cellProps.x = ci * this.gWidth + this.cellWidth / 2;
      cellProps.w = this.cellWidth;
    }
    if (this.cellHeight) {
      cellProps.y = ri * this.gHeight + this.cellHeight / 2;
      cellProps.h = this.cellHeight;
    }

    return cellProps;
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
  area(col1, row1, col2, row2) {
    const cellA = this.cell(col1, row1);
    const cellB = this.cell(col2, row2);
    return this.areaByCell(cellA, cellB);
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
  row(rowIndex) {
    return {
      cells: this.rowCells(rowIndex),
      x: 0,
      y: this.gHeight * rowIndex,
      w: this.gWidth * this.colCount,
      h: this.gHeight,
      cx: (this.gWidth * this.colCount) / 2,
      cy: (this.gHeight + this.gHeight * rowIndex) / 2,
    };
  }
  rowCells(rowIndex) {
    return this.gridMap.map((c) => c[rowIndex]);
  }
  get rows() {
    return Array.from({ length: this.rowCount }).map((_, i) =>
      this.rowCells(i),
    );
  }
  col(colIndex) {
    return {
      cells: this.colCells(colIndex),
      x: this.gWidth * colIndex,
      y: 0,
      w: this.gWidth,
      h: this.gHeight * this.rowCount,
      cx: (this.gWidth + this.gWidth * colIndex) / 2,
      cy: (this.gHeight * this.rowCount) / 2,
    };
  }
  colCells(colIndex) {
    return this.gridMap[colIndex];
  }
  get cols() {
    return this.gridMap;
  }
  cell(col, row) {
    return this.gridMap[col][row];
  }
  scanRow(rowIndex) {
    return scan(this.rowCells(rowIndex));
  }
  scanCol(colIndex) {
    return scan(this.colCells(colIndex));
  }
  cycleRow(rowIndex) {
    return cycle(this.rowCells(rowIndex));
  }
  cycleCol(colIndex) {
    return cycle(this.colCells(colIndex));
  }
  bounce(area, sx, sy, mx, my) {
    const cells = area || this.cells;
    return bounce(cells, sx, sy, mx, my);
  }
}

export { Gridset };
