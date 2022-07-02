import { rowCells } from './cell.js'

const row = (grid) => (ri) => {
  const cells = rowCells(ri, grid)
  if (cells[0]) {
    const y = cells[0].y
    const h = cells[0].h
    const cy = cells[0].cy
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
}
export default row
