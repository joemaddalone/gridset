import { cycle } from 'array-trails'
import { diagonal, antidiagonal } from 'array-areas'

export const calcXy = (rici, wh, grid) => {
  const gridDimension = wh === 'w' ? grid.width : grid.height
  const cellDimension = wh === 'w' ? grid.cellWidth : grid.cellHeight
  const iterableDimension = wh === 'w' ? grid.colCount : grid.rowCount
  return rici * ((gridDimension - cellDimension) / (iterableDimension - 1))
}

const checkBounds = (ci, ri, grid) => {
  return ci >= 0 && ci < grid.colCount && ri >= 0 && ri < grid.rowCount
}

export const cell = (ci, ri, grid) => {
  if (!checkBounds(ci, ri, grid)) {
    return null
  }
  const x = calcXy(ci, 'w', grid)
  const y = calcXy(ri, 'h', grid)
  const props = {
    x,
    y,
    t: y,
    l: x,
    b: y + grid.cellHeight,
    r: x + grid.cellWidth,
    w: grid.cellWidth,
    h: grid.cellHeight,
    cx: x + grid.cellWidth / 2,
    cy: y + grid.cellHeight / 2,
    ci,
    ri,
    ...looks(ci, ri, grid)
  }

  return props
}

export const looks = (ci, ri, grid) => {
  return {
    // one cell up
    _u: (mode) => {
      const nCell = cell(ci, ri - 1, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'u', grid)
        : cell(ci, ri, grid)
    },
    // one cell up and one cell left
    _lu: (mode) => {
      const nCell = cell(ci - 1, ri - 1, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'lu', grid)
        : cell(ci, ri, grid)
    },
    // one cell right and up
    _ru: (mode) => {
      const nCell = cell(ci + 1, ri - 1, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ru', grid)
        : cell(ci, ri, grid)
    },
    // one cell down
    _d: (mode) => {
      const nCell = cell(ci, ri + 1, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'd', grid)
        : cell(ci, ri, grid)
    },
    // one cell left and down
    _ld: (mode) => {
      const nCell = cell(ci - 1, ri + 1, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'ld', grid)
        : cell(ci, ri, grid)
    },
    // one cell right and down
    _rd: (mode) => {
      const nCell = cell(ci + 1, ri + 1, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'rd', grid)
        : cell(ci, ri, grid)
    },
    // one cell right
    _r: (mode) => {
      const nCell = cell(ci + 1, ri, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'r', grid)
        : cell(ci, ri, grid)
    },
    // one cell left
    _l: (mode) => {
      const nCell = cell(ci - 1, ri, grid)
      if (nCell) return nCell
      return mode === 'cycle'
        ? cycleCell({ ci, ri }, 'l', grid)
        : cell(ci, ri, grid)
    }
  }
}

export const cycleCell = function (
  cell,
  dir,
  grid
) {
  let cells = []
  let cycleDir = ''
  let si = 0
  const { ci, ri } = cell
  const isCol = dir === 'u' || dir === 'd'
  const isRow = dir === 'l' || dir === 'r'
  const isDiag = !isCol && !isRow

  if (isCol) {
    cells = colCells(ci, grid)
    si = ri
    if (dir === 'u') {
      cycleDir = 'r'
    }
    if (dir === 'd') {
      cycleDir = 'f'
    }
  }
  if (isRow) {
    cells = rowCells(ri, grid)
    si = ci
    if (dir === 'l') {
      cycleDir = 'r'
    }
    if (dir === 'r') {
      si = ci + 1
      cycleDir = 'f'
    }
  }
  if (isDiag) {
    if (dir === 'lu' || dir === 'rd') {
      cells = diagonal(rows(grid), ri, ci).map(c => c.val)
    } else {
      cells = antidiagonal(rows(grid), ri, ci).map(c => c.val).reverse()
    }
    si = cells.findIndex((c) => c?.ci === ci) + 1
    cycleDir = dir.startsWith('r') ? 'f' : 'r'
  }
  return cycle(cells, cycleDir, si).next().value.el
}

export const colCells = (ci, grid) =>
  Array.from({ length: grid.rowCount }).map((_, i) => cell(ci, i, grid))

export const rowCells = (ri, grid) =>
  Array.from({ length: grid.colCount }).map((_, i) => cell(i, ri, grid))

export const cols = (grid) =>
  Array.from({ length: grid.colCount }).map((_, i) => colCells(i, grid))

export const rows = (grid) =>
  Array.from({ length: grid.rowCount }).map((_, i) => rowCells(i, grid))

export const flatCells = (grid) =>
  cols(grid).flatMap((col) => col)

export const area = (grid) => ({
  ci1,
  ri1,
  ci2,
  ri2
}) => {
  const cell1 = cell(ci1, ri1, grid)
  const cell2 = cell(ci2, ri2, grid)
  if (cell1 && cell2) {
    return areaByCell(grid)(cell1, cell2)
  }
}

export const areaByCell = (grid) => (
  cell1,
  cell2
) => {
  const leftCell = cell1.ci <= cell2.ci ? cell1 : cell2
  const rightCell = cell1.ci <= cell2.ci ? cell2 : cell1
  const topCell = cell1.ri <= cell2.ri ? cell1 : cell2
  const bottomCell = cell1.ri <= cell2.ri ? cell2 : cell1
  const w =
    bottomCell.ci !== topCell.ci ? rightCell.r - leftCell.l : grid.cellWidth
  const h =
    bottomCell.ri !== topCell.ri ? bottomCell.b - topCell.t : grid.cellHeight

  const cols = Array.from({ length: rightCell.ci - leftCell.ci })
  const rows = Array.from({ length: bottomCell.ri - topCell.ri })
  const cells = cols.map((_, ci) => {
    return rows.map((_, ri) => {
      return cell(leftCell.ci + ci, topCell.ri + ri, grid)
    })
  })

  return {
    x: leftCell.x,
    y: topCell.y,
    w,
    h,
    t: topCell.t,
    l: leftCell.l,
    r: rightCell.r,
    b: bottomCell.b,
    cx: (leftCell.l + w) / 2,
    cy: (topCell.t + h) / 2,
    cells
  }
}
