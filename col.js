import { colCells } from './cell.js'

const col = (grid) => (ci) => {
  const cells = colCells(ci, grid)
  if (cells[0]) {
    const x = cells[0].x
    const y = cells[0].y
    const w = cells[0].w
    const h = grid.height
    const cx = cells[0].cx
    return {
      cells,
      x,
      y,
      w,
      h,
      t: 0 + grid.y,
      l: x,
      r: x + w,
      b: grid.height + grid.y,
      cx,
      cy: (grid.height / 2) + grid.y,
      ci
    }
  } else {
    throw new Error('no cell at position 0')
  }
}

export default col
