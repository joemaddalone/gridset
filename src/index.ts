/* eslint-disable @typescript-eslint/ban-types */
import iterators from './iterators';
import row from './row';
import col from './col';
import { cell } from './cell';
import { GridSettings, IGridset } from './gridset.d';
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
export default class Gridset implements IGridset {
  col: Function;
  row: Function;
  diagonal: Function;
  antidiagonal: Function;
  area: Function;
  areaByCell: Function;
  settings: GridSettings;
  constructor({
    width = 0,
    height = 0,
    rows = 0,
    cols = 0,
    cellWidth = null,
    cellHeight = null,
  }) {
    this.settings = {
      width: Number(width),
      height: Number(height),
      rowCount: Number(rows),
      colCount: Number(cols),
      cellWidth: cellWidth || width / cols,
      cellHeight: cellHeight || height / rows,
    };

    this.col = col(this.settings);
    this.row = row(this.settings);
    this.diagonal = diagonal(this.settings);
    this.antidiagonal = antidiagonal(this.settings);
    this.area = area(this.settings);
    this.areaByCell = areaByCell(this.settings);
  }
  get cells() {
    return cols(this.settings);
  }
  get cols() {
    return cols(this.settings);
  }
  get rows() {
    return rows(this.settings);
  }
  get flatCells() {
    return flatCells(this.settings);
  }
  cell(ci: number, ri: number) {
    return cell(ci, ri, this.settings);
  }
  rowCells(ri: number) {
    return rowCells(ri, this.settings);
  }
  colCells(ci: number) {
    return colCells(ci, this.settings);
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
  get width() {
    return this.settings.width;
  }
  get height() {
    return this.settings.height;
  }
  get rowCount() {
    return this.settings.rowCount;
  }
  get colCount() {
    return this.settings.colCount;
  }
  get cellWidth() {
    return this.settings.cellWidth;
  }
  get cellHeight() {
    return this.settings.cellHeight;
  }
}
