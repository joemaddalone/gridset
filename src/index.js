import Cell from './Cell.js';
import iterators from './iterators.js';
import traversals from './traversals.js';
import paths from './paths.js';
import areas from './areas.js';
import row from './row.js';
import col from './col.js';
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
    this.row = row.bind(this);
    this.col = col.bind(this);

    for (const area in areas) {
      this[area] = areas[area].bind(this);
    }

    for (const iterator in iterators) {
      this[iterator] = iterators[iterator].bind(this);
    }

    for (const traversal in traversals) {
      this[traversal] = traversals[traversal].bind(this);
    }
    for (const path in paths) {
      this[path] = paths[path];
    }
    this.create();
  }
  __createCell(ci, ri) {
    const cellProps = {
      ci,
      ri,
      grid: { ...this.properties },
      w: this.cellWidth || this.gWidth,
      h: this.cellHeight || this.gHeight,
    };
    cellProps.look = this.look({ ...cellProps });

    return new Cell(cellProps);
  }

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
    return this.gridMap;
  }
  get flatCells() {
    return this.cells.flat(Infinity);
  }
  cell(ci, ri, callerCell = null) {
    const checkBounds = (c, r) => {
      return c >= 0 && c < this.colCount && r >= 0 && r < this.rowCount;
    };
    return checkBounds(ci, ri)
      ? this.gridMap[ci][ri]
      : callerCell && checkBounds(callerCell.ci, callerCell.ri)
      ? !callerCell.mode
        ? this.gridMap[callerCell.ci][callerCell.ri]
        : callerCell.mode()
      : null;
  }
  rowCells(ri) {
    return this.gridMap.map((c) => c[ri]);
  }
  get rows() {
    return Array.from({ length: this.rowCount }).map((_, i) =>
      this.rowCells(i),
    );
  }
  colCells(ci) {
    return this.gridMap[ci].slice();
  }
  get cols() {
    return this.gridMap;
  }
}
