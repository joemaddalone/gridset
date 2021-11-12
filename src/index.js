import iterators from './iterators.js';
import { diagonal, antidiagonal } from './paths.js';
import areas from './areas.js';
import row from './row.js';
import col from './col.js';
import { colCells, rowCells, cols, rows, flatCells, cell } from './util.js';
export default class Gridset {
  constructor({
    width = 0,
    height = 0,
    rows = 0,
    cols = 0,
    cellWidth = null,
    cellHeight = null,
  }) {
    this.width = Number(width);
    this.height = Number(height);
    this.rowCount = Number(rows);
    this.colCount = Number(cols);
    this.autoCellWidth = width / cols;
    this.autoCellHeight = height / rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.properties = {
      width,
      height,
      rows,
      cols,
      rowCount: this.rowCount,
      colCount: this.colCount,
      cellWidth: this.cellWidth || this.autoCellWidth,
      cellHeight: this.cellHeight || this.autoCellHeight,
    };

    this.col = col(this.properties);
    this.row = row(this.properties);
    this.diagonal = diagonal(this.properties);
    this.antidiagonal = antidiagonal(this.properties);

    for (const area in areas) {
      this[area] = areas[area](this.properties);
    }

    for (const iterator in iterators) {
      this[iterator] = iterators[iterator].bind(this);
    }
  }
  get cells() {
    return cols(this.properties);
  }
  get cols() {
    return cols(this.properties);
  }
  get rows() {
    return rows(this.properties);
  }
  get flatCells() {
    return flatCells(this.properties);
  }
  cell(ci, ri) {
    return cell(ci, ri, this.properties);
  }
  rowCells(ri) {
    return rowCells(ri, this.properties);
  }
  colCells(ci) {
    return colCells(ci, this.properties);
  }
  scanCells(cells, dir = 'f', si = null) {
    cells = cells || this.flatCells;
    return this.scanner(cells, dir, si);
  }
  cycleCells(cells, dir = 'f', si = null) {
    cells = cells || this.flatCells;
    return this.cycler(cells, dir, si);
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
    return this.bouncer(cells, sx, sy, mx, my);
  }
}
