import { rowCells } from './cell.js'

const row = (grid) => (ri) => {
  const cells = rowCells(ri, grid)
  if (cells[0]) {
    const y = cells[0].y
    const x = cells[0].x
    const h = cells[0].h
    const cy = cells[0].cy
    return {
      cells,
      x,
      y,
      w: grid.width,
      h,
      cx: (grid.width / 2) + grid.x,
      cy,
      t: y,
      l: x,
      r: grid.width + grid.x,
      b: y + h,
      ri
    }
  } else {
    throw new Error('no cell at position 0')
  }
}
export default row
