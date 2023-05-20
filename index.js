import { scan, cycle, bounce } from 'array-trails'
import { diagonal, antidiagonal } from 'array-areas'
import row from './row.js'
import col from './col.js'
import {
  cell,
  colCells,
  rowCells,
  cols,
  rows,
  flatCells,
  area,
  areaByCell
} from './cell.js'
export default class Gridset {
  constructor ({
    width = 0,
    height = 0,
    rows = 0,
    cols = 0,
    cellWidth = null,
    cellHeight = null,
    x = 0,
    y = 0
  }) {
    this.settings = {
      width: Number(width),
      height: Number(height),
      rowCount: Number(rows),
      colCount: Number(cols),
      cellWidth: cellWidth || width / cols,
      cellHeight: cellHeight || height / rows,
      x: Number(x),
      y: Number(y)
    }

    this.col = col(this.settings)
    this.row = row(this.settings)
    this.diagonal = (ci, ri) => diagonal(this.rows, ri, ci).map(c => c.val)
    this.antidiagonal = (ci, ri) => antidiagonal(this.rows, ri, ci).map(c => c.val).reverse()
    this.area = area(this.settings)
    this.areaByCell = areaByCell(this.settings)
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
    const cells = this.rowCells(ri)
    return this.scanCells(cells, dir, si)
  }

  scanDiagonal (ci, ri, dir = 'f', si = null) {
    const cells = diagonal(this.rows, ri, ci).map(c => c.val)
    return this.scanCells(cells, dir, si)
  }

  scanAntidiagonal (ci, ri, dir = 'f', si = null) {
    const cells = antidiagonal(this.rows, ri, ci).map(c => c.val)
    if (dir === 'r') {
      cells.reverse()
    }
    return this.scanCells(cells, dir, si)
  }

  scanCol (ci, dir = 'f', si = null) {
    const cells = this.colCells(ci)
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
    return bounce(area, sx, sy, mx, my)
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
