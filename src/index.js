import iterators from './iterators.js';
import traversals from './traversals.js';
import paths from './paths.js';
import areas from './areas.js';
import row from './row.js';
import col from './col.js';
import { colCells, rowCells, cols, rows, flatCells, cell } from './util.js';
export class Gridset {
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

    for (const area in areas) {
      this[area] = areas[area](this.properties);
    }

    for (const iterator in iterators) {
      this[iterator] = iterators[iterator].bind(this);
    }

    for (const traversal in traversals) {
      this[traversal] = traversals[traversal].bind(this);
    }
    for (const path in paths) {
      this[path] = paths[path](this.properties);
    }
  }
  get cells() {
    return cols(this.properties);
  }
  get cols() {
    return cols(this.properties);
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
  get rows() {
    return rows(this.properties);
  }
  colCells(ci) {
    return colCells(ci, this.properties);
  }
}
