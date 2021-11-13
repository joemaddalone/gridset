import iterators from './iterators';
import row from './row';
import col from './col';
import { cell } from './cell';
import {
  diagonal,
  antidiagonal,
  colCells,
  rowCells,
  cols,
  rows,
  flatCells,
  area,
  areaByCell,
} from './cells';
export default class Gridset {
  width: number;
  height: number;
  rowCount: number;
  colCount: number;
  autoCellWidth: number;
  autoCellHeight: number;
  cellWidth: any;
  cellHeight: any;
  col: Function;
  row: Function;
  diagonal: Function;
  antidiagonal: Function;
  area: Function;
  areaByCell: Function;
  properties: {
    width: number;
    height: number;
    rows: number;
    cols: number;
    rowCount: number;
    colCount: number;
    cellWidth: any;
    cellHeight: any;
  };
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
    this.area = area(this.properties);
    this.areaByCell = areaByCell(this.properties);
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
  cell(ci: number, ri: number) {
    return cell(ci, ri, this.properties);
  }
  rowCells(ri: number) {
    return rowCells(ri, this.properties);
  }
  colCells(ci: number) {
    return colCells(ci, this.properties);
  }
  scanCells(cells = this.flatCells, dir = 'f', si = null) {
    return iterators.scanner(cells, dir, si);
  }
  cycleCells(cells = this.flatCells, dir = 'f', si = null) {
    return iterators.cycler(cells, dir, si);
  }
  scanRow(ri: number, dir = 'f', si = null) {
    const cells = this.rowCells(ri);
    return this.scanCells(cells, dir, si);
  }
  scanDiagonal(ci: number, ri: number, dir = 'f', si = null) {
    const cells = this.diagonal(ci, ri).slice();
    return this.scanCells(cells, dir, si);
  }
  scanAntidiagonal(ci: number, ri: number, dir = 'f', si = null) {
    const cells = this.antidiagonal(ci, ri);
    if (dir === 'r') {
      cells.reverse();
    }
    return this.scanCells(cells, dir, si);
  }
  scanCol(ci: number, dir = 'f', si = null) {
    const cells = this.colCells(ci);
    return this.scanCells(cells, dir, si);
  }
  cycleRow(ri: number, dir = 'f', si = null) {
    return this.cycleCells(this.rowCells(ri), dir, si);
  }
  cycleCol(ci: number, dir = 'f', si = null) {
    return this.cycleCells(this.colCells(ci), dir, si);
  }
  cycleDiagonal(ci: number, ri: number, dir = 'f', si = null) {
    return this.cycleCells(this.diagonal(ci, ri), dir, si);
  }
  cycleAntidiagonal(ci: number, ri: number, dir = 'f', si = null) {
    return this.cycleCells(this.antidiagonal(ci, ri), dir, si);
  }
  bounce(area = this.cells, sx: number, sy: number, mx: number, my: number) {
    return iterators.bouncer(area, sx, sy, mx, my);
  }
}
