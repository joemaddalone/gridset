import { colCells } from './cell.js'

const col = (grid) => (ci) => {
  const cells = colCells(ci, grid)
  if (cells[0]) {
    const x = cells[0].x
    const w = cells[0].w
    const h = grid.height
    const cx = cells[0].cx
    return {
      cells,
      x,
      y: 0,
      w,
      h,
      t: 0,
      l: x,
      r: x + w,
      b: grid.height,
      cx,
      cy: grid.height / 2,
      ci
    }
  } else {
    throw new Error('no cell at position 0')
  }
}

export default col
