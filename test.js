import Gridset from './index.js'
import assert from 'node:assert'

console.log('should have correct number of cells')
const g = new Gridset({
  width: 100,
  height: 100,
  rows: 4,
  cols: 4
})
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
assert.strictEqual(g.cols.length, 4, 'cols are correct')
assert.strictEqual(g.rows.length, 4)

console.log('should have correct automatic sizing of cells')
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
assert.strictEqual(g.cells[0][0].w, 25)
assert.strictEqual(g.cells[0][0].h, 25)

console.log('should have correct size and positions for custom cellWidth')
const g2 = new Gridset({
  width: 200,
  height: 200,
  rows: 5,
  cols: 5,
  cellWidth: 60
})
/**
     0           60      95      130     165     200
     └────────────┴───────┴───────┴───────┴───────┘
     ┌────────────¦───────¦───────¦───────¦───────┐
     │            ¦       ¦       ¦       ¦       │  <- Row 0
     └────────────¦───────¦───────¦───────¦───────┘
     │            ¦       ¦       ¦       ¦       ¦
     │    col0    ¦       │       ¦       ¦       ¦
     ├────────────┘       │       ¦       ¦       ¦
     ¦        │           │       ¦       ¦       ¦
     ¦        │   col1    │       ¦       ¦       ¦
     0        ├───────────┘       ¦       ¦       ¦
              ¦       │           ¦       ¦       ¦
              ¦       │   col2    ¦       ¦       ¦
             35       ├───────────┘       ¦       ¦
                      ¦       │           ¦       ¦
                      ¦       │    col3   ¦       ¦
                     70       ├───────────┘       ¦
                              ¦       │           ¦
                              ¦       │   col4    ¦
                             105      ├───────────┘
                                      ¦
                                      ¦
                                     140
 */
assert.strictEqual(g2.cells[0][0].w, 60)
assert.strictEqual(g2.cells[1][0].x, 35) //  +35
assert.strictEqual(g2.cells[2][0].x, 70) //  +35
assert.strictEqual(g2.cells[3][0].x, 105) // +35
assert.strictEqual(g2.cells[4][0].x, 140) // +35

console.log('should have correct size and positions for custom cellHeight')
const g5 = new Gridset({
  width: 200,
  height: 200,
  rows: 5,
  cols: 5,
  cellHeight: 60
})
/**
    0   ┐ ┌──────────────┐
        │ │              │
        │ │              │
        │ │   row0       │------┬---- 35
        │ │              │      │
    60  ┤ │──────────────┘      │
        │ │   row1              │------┬---- 70
        │ │                     │      │
    95  ┤ │─────────────────────┘      │
        │ │   row2                     │------┬---- 105
        │ │                            │      │
    130 ┤ │────────────────────────────┘      │
        │ │   row3                            │------┬---- 140
        │ │                                   │      │
    165 ┤ │───────────────────────────────────┘      │
        │ │   row4                                   │
        │ │                                          │
    200 ┘ └──────────────────────────────────────────┘
 */
assert.strictEqual(g5.cells[0][0].h, 60)
assert.strictEqual(g5.cells[0][1].y, 35) //  +35
assert.strictEqual(g5.cells[0][2].y, 70) //  +35
assert.strictEqual(g5.cells[0][3].y, 105) //  +35
assert.strictEqual(g5.cells[0][4].y, 140) //  +35

console.log('should flat array of cells')
assert.strictEqual(g.flatCells.length, 4 * 4)

console.log('should return the correct area properties')
/**
+-----------------------------+
| 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
+-----------------------------+
| 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
+-----------------------------+
| 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | <-- from 1,2
+-----------------------------+
| 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
+-----------------------------+
| 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | <-- to 4,4
+-----------------------------+
 */
const g3 = new Gridset({
  width: 100,
  height: 100,
  rows: 5,
  cols: 5
})
let computedSize = 20 // 100/5
let area = g3.area({ ci1: 1, ri1: 2, ci2: 4, ri2: 4 })
assert.strictEqual(area.cells.length, 3)
assert.strictEqual(area.cells[0].length, 2)
assert.strictEqual(area.w, computedSize * 4)
assert.strictEqual(area.h, computedSize * 3)
assert.strictEqual(area.l, computedSize)
assert.strictEqual(area.r, computedSize * 5)

console.log(
  'should return the correct area properties when the second cell is to the left or above'
)
/**
+-----------------------------+
| 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
+-----------------------------+
| 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
+-----------------------------+
| 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | <-- to 1,2
+-----------------------------+
| 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
+-----------------------------+
| 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | <-- from 4,4
+-----------------------------+
 */
computedSize = 20 // 100/5
area = g3.area({ ci1: 4, ri1: 4, ci2: 1, ri2: 2 })
assert.strictEqual(area.cells.length, 3)
assert.strictEqual(area.cells[0].length, 2)
assert.strictEqual(area.w, computedSize * 4)
assert.strictEqual(area.h, computedSize * 3)
assert.strictEqual(area.l, computedSize)
assert.strictEqual(area.r, computedSize * 5)

console.log('should return the correct column')
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
const col = g.col(2)
assert.strictEqual(col.x, 50)
assert.strictEqual(col.w, 25)
assert.strictEqual(col.h, 100)
assert.strictEqual(col.cells[0].ci, 2)
assert.strictEqual(col.cells.length, 4)

console.log('should return the correct row')
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
const row = g.row(2)
assert.strictEqual(row.y, 50)
assert.strictEqual(row.w, 100)
assert.strictEqual(row.h, 25)
assert.strictEqual(row.cells[0].ri, 2)
assert.strictEqual(row.cells.length, 4)

console.log('should return the diagonal cells')
/**
    ┌─────┬─────┬─────┬─────┬─────┐
    │     │     │     │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │ 0,1 │     │     │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │     │ 1,2 │     │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │     │     │ 2,3 │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │     │     │     │ 3,4 │     │
    └─────┴─────┴─────┴─────┴─────┘
 */
const diag = g3.diagonal(1, 2)
assert.strictEqual(diag[0].ci, 0)
assert.strictEqual(diag[0].ri, 1)
assert.strictEqual(diag[1].ci, 1)
assert.strictEqual(diag[1].ri, 2)
assert.strictEqual(diag[2].ci, 2)
assert.strictEqual(diag[2].ri, 3)
assert.strictEqual(diag[3].ci, 3)
assert.strictEqual(diag[3].ri, 4)

console.log('should return the anti-diagonal cells')
/**
    ┌─────┬─────┬─────┬─────┬─────┐
    │     │     │     │ 3,0 │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │     │     │ 2,1 │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │     │ 1,2 │     │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │ 0,3 │     │     │     │     │
    ├─────┼─────┼─────┼─────┼─────┤
    │     │     │     │     │     │
    └─────┴─────┴─────┴─────┴─────┘
 */
const adiag = g3.antidiagonal(1, 2)
assert.strictEqual(adiag[0].ci, 0)
assert.strictEqual(adiag[0].ri, 3)
assert.strictEqual(adiag[1].ci, 1)
assert.strictEqual(adiag[1].ri, 2)
assert.strictEqual(adiag[2].ci, 2)
assert.strictEqual(adiag[2].ri, 1)
assert.strictEqual(adiag[3].ci, 3)
assert.strictEqual(adiag[3].ri, 0)

console.log('should return the correct adjacent cells')
/**
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │        │
     │   0,0  │   1,0  │   2,0 <----------- land here.
     │        │    u   │    r   │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,1  │   1,1  │   2,1  │  3,1   │
     │    lu  │    u   │    ru  │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,2  │   1,2  │   2,2  │  3,2   │
     │    l   │    *   │    r   │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,3  │   1,3  │   2,3  │  3,3   │
     │    ld  │    d   │    rd  │        │
     └────────┴────────┴────────┴────────┘
 */
let cell = g.cell(1, 2)
assert.strictEqual(cell._u().ci, 1)
assert.strictEqual(cell._u().ri, 1)
assert.strictEqual(cell._r().ci, 2)
assert.strictEqual(cell._r().ri, 2)
assert.strictEqual(cell._l().ci, 0)
assert.strictEqual(cell._l().ri, 2)
assert.strictEqual(cell._d().ci, 1)
assert.strictEqual(cell._d().ri, 3)
assert.strictEqual(cell._lu().ci, 0)
assert.strictEqual(cell._lu().ri, 1)
assert.strictEqual(cell._ru().ci, 2)
assert.strictEqual(cell._ru().ri, 1)
assert.strictEqual(cell._rd().ci, 2)
assert.strictEqual(cell._rd().ri, 3)
assert.strictEqual(cell._ld().ci, 0)
assert.strictEqual(cell._ld().ri, 3)
assert.strictEqual(cell._u()._u()._r().ci, 2)
assert.strictEqual(cell._u()._u()._r().ri, 0)

console.log(
  'should return the same cell when looking negatively out of the row bounds of the grid'
)
/**
              +--------+
              |        |
              |   u    | <-- out of grid.
              |        |
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │        │
     │   0,0  │   1,0 <--------------------- so you get this cell instead.
     │        │    u   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,1  │   1,1  │   2,1  │  3,1   │
     │        │    u   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,2  │   1,2  │   2,2  │  3,2   │
     │        │    *   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,3  │   1,3  │   2,3  │  3,3   │
     │        │        │        │        │
     └────────┴────────┴────────┴────────┘
 */
cell = g.cell(1, 2)
assert.strictEqual(cell._u()._u()._u().ci, 1)
assert.strictEqual(cell._u()._u()._u().ri, 0)

console.log(
  'should return the same cell when looking positively out of the row bounds of the grid'
)
/**
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │        │
     │   0,0  │   1,0  │   2,0  │  3,0   │
     │        │    u   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,1  │   1,1  │   2,1  │  3,1   │
     │        │    u   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,2  │   1,2  │   2,2  │  3,2   │
     │        │    *   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,3  │   1,3 <--------------------- so you get this cell instead.
     │        │        │        │        │
     └────────┴────────┴────────┴────────┘
              |        |
              |   u    | <-- out of grid.
              |        |
              +--------+
 */
cell = g.cell(1, 2)
assert.strictEqual(cell._d()._d().ci, 1)
assert.strictEqual(cell._d()._d().ri, 3)

console.log(
  "should return the correct 'cycled' cell looking negatively out of the row bounds of the grid"
)
/**
              +--------+
              |        |
              |   u    | <-- out of grid.
              |        |
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │        │
     │   0,0  │   1,0  │   2,0  │  3,0   │
     │        │    u   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,1  │   1,1  │   2,1  │  3,1   │
     │        │    u   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,2  │   1,2  │   2,2  │  3,2   │
     │        │    *   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,3  │   1,3 <---------------------- so you get this cell instead.
     │        │        │        │        │
     └────────┴────────┴────────┴────────┘
 */
cell = g.cell(1, 2)
let mode = 'cycle'
assert.strictEqual(cell._u()._u()._u(mode).ci, 1)
assert.strictEqual(cell._u()._u()._u(mode).ri, 3)

console.log(
  "should return the correct 'cycled' cell looking positively out of the row bounds of the grid"
)
/**
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │        │
     │   0,0  │   1,0 <--------------------- so you get this cell instead.
     │        │        │    r   │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,1  │   1,1  │   2,1  │  3,1   │
     │        │        │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,2  │   1,2  │   2,2  │  3,2   │
     │        │    *   │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,3  │   1,3  │   2,3  │  3,3   │
     │        │    d   │        │        │
     └────────┴────────┴────────┴────────┘
              |        |
              |    d   | <-- out of grid.
              |        |
              +--------+
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._d(mode)._d(mode).ci, 1)
assert.strictEqual(cell._d(mode)._d(mode).ri, 3)

console.log(
  "should return the correct 'cycled' cell looking positively outside of the column bounds of the grid"
)
/**
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │        │
     │   0,0  │   1,0  │   2,0  │  3,0   │
     │        │        │        │        │
     ├────────┼────────┼────────┼────────┤
     │        │        │        │        │
     │   0,1  │   1,1  │   2,1  │  3,1   │
     │        │        │        │        │
     ├────────┼────────┼────────┼────────┤---------+
     │        │        │        │        │         |
     │   0,2  │   1,2  │   2,2  │  3,2   │    r    | <-- out of grid.
     │    ⇡   │    *   │    r   │   r    │         |
     ├────│───┼────────┼────────┼────────┤---------+
     │    │   │        │        │        │
     │    └----------------------------------- so you get this cell instead.
     │        │        │        │        │
     └────────┴────────┴────────┴────────┘
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._r(mode)._r(mode)._r(mode).ci, 0)
assert.strictEqual(cell._r(mode)._r(mode)._r(mode).ri, 2)

console.log(
  "should return the correct 'cycled' cell looking negatively outside of the column bounds of the grid"
)
/**
           ┌────────┬────────┬────────┬────────┐
           │        │        │        │        │
           │   0,0  │   1,0  │   2,0  │  3,0   │
           │        │        │        │        │
           ├────────┼────────┼────────┼────────┤
    out of │        │        │        │        │
    grid   │   0,1  │   1,1  │   2,1  │  3,1   │
      |    │        │        │        │        │
    +------├────────┼────────┼────────┼────────┤
    |      │        │        │        │        │
    |      │   0,2  │   1,2  │   2,2  │  3,2 <----- so you get this cell instead.
    |   l  │    l   │    *   │        │        │
    +------├────────┼────────┼────────┼────────┤
           │        │        │        │        │
           │   0,3  │   1,3  │   2,3  │  3,3   │
           │        │        │        │        │
           └────────┴────────┴────────┴────────┘
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._l(mode)._l(mode).ci, 3)
assert.strictEqual(cell._l(mode)._l(mode).ri, 2)

console.log(
  "should return the correct 'cycled' cell looking positively outside of the diagonal bounds of the grid"
)
/**
    ┌────────┬────────┬────────┬────────┐
    │        │        │        │        │
    │   0,0  │   1,0  │   2,0  │  3,0   │
    │        │        │        │        │
    ├────────┼────────┼────────┼────────┤
    │        │        │        │        │
    │   0,1 <---------------------------------- so you get this cell instead.
    │        │        │        │        │
    ├────────┼────────┼────────┼────────┤
    │        │        │        │        │
    │   0,2  │   1,2  │   2,2  │  3,2   │
    │        │    *   │        │        │
    ├────────┼────────┼────────┼────────┤
    │        │        │        │        │
    │   0,3  │   1,3  │   2,3  │  3,3   │
    │        │        │    rd  │        │
    └────────┴────────┴────────┴────────┘
                               |        |
                               |   rd   | <-- out of grid.
                               |        |
                               +--------+
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._rd(mode)._rd(mode).ci, 0)
assert.strictEqual(cell._rd(mode)._rd(mode).ri, 1)

console.log(
  "should return the correct 'cycled' cell looking negatively outside of the diagonal bounds of the grid"
)
/**
    +-------┌────────┬────────┬────────┬────────┐
    |       │        │        │        │        │
    |  lu   │   0,0  │   1,0  │   2,0  │  3,0   │
    |       │        │        │        │        │
    +-------├────────┼────────┼────────┼────────┤
            │        │        │        │        │
            │   0,1  │   1,1  │   2,1  │  3,1   │
            │    lu  │        │        │        │
            ├────────┼────────┼────────┼────────┤
            │        │        │        │        │
            │   0,2  │   1,2  │   2,2  │  3,2   │
            │        │    *   │        │        │
            ├────────┼────────┼────────┼────────┤
            │        │        │        │        │
            │   0,3  │   1,3  │   2,3 <----------- so you get this cell instead.
            │        │        │        │        │
            └────────┴────────┴────────┴────────┘
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._lu(mode)._lu(mode).ci, 2)
assert.strictEqual(cell._lu(mode)._lu(mode).ri, 3)

console.log(
  "should return the correct 'cycled' cell looking positively outside of the anti-diagonal bounds of the grid"
)
/**

                                        +--------+
                                        |        |
                                        |   ru   |   <-- out of grid.
                                        |        |
    ┌────────┬────────┬────────┬────────+--------+
    │        │        │        │        │
    │   0,0  │   1,0  │   2,0  │  3,0   │
    │        │        │        │   ru   │
    ├────────┼────────┼────────┼────────┤
    │        │        │        │        │
    │   0,1  │   1,1  │   2,1  │  3,1   │
    │    lu  │        │    ru  │        │
    ├────────┼────────┼────────┼────────┤
    │        │        │        │        │
    │   0,2  │   1,2  │   2,2  │  3,2   │
    │        │    *   │        │        │
    ├────────┼────────┼────────┼────────┤
    │        │        │        │        │
    │   0,3 <----------------------------- so you get this cell instead.
    │        │        │        │        │
    └────────┴────────┴────────┴────────┘
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._ru(mode)._ru(mode)._ru(mode).ci, 0)
assert.strictEqual(cell._ru(mode)._ru(mode)._ru(mode).ri, 3)

console.log(
  "should return the correct 'cycled' cell looking negatively outside of the anti-diagonal bounds of the grid"
)
/**

             ┌────────┬────────┬────────┬────────┐
             │        │        │        │        │
             │   0,0  │   1,0  │   2,0  │  3,0 <------- so you get this cell instead.
             │        │        │        │        │
             ├────────┼────────┼────────┼────────┤
             │        │        │        │        │
             │   0,1  │   1,1  │   2,1  │  3,1   │
             │    lu  │        │        │        │
             ├────────┼────────┼────────┼────────┤
             │        │        │        │        │
             │   0,2  │   1,2  │   2,2  │  3,2   │
             │        │    *   │        │        │
             ├────────┼────────┼────────┼────────┤
             │        │        │        │        │
             │   0,3  │        │        │        │
             │    ld  │        │        │        │
     +-------+────────┴────────┴────────┴────────┘
     |       |
     |  ld   | <-- out of grid.
     |       |
     +-------+
 */
cell = g.cell(1, 2)
mode = 'cycle'
assert.strictEqual(cell._ld(mode)._ld(mode).ci, 3)
assert.strictEqual(cell._ld(mode)._ld(mode).ri, 0)

console.log('should return the correct scanRow values')
/**
    +-----------------------+
    | 0,0 | 1,0 | 2,0 | 3,0 |
    +-----------------------+
    | 0,1 | 1,1 | 2,1 | 3,1 |
    +-----------------------+
    | 0,2 | 1,2 | 2,2 | 3,2 |
    +-----------------------+
    | 0,3 | 1,3 | 2,3 | 3,3 |
    +-----------------------+
 */
let m = g.scanRow(2)
computedSize = 25
assert.strictEqual(m.next().value.el.x, 0)
assert.strictEqual(m.next().value.el.x, computedSize)
assert.strictEqual(m.next().value.el.x, computedSize * 2)
assert.strictEqual(m.next().value.el.x, computedSize * 3)
assert.strictEqual(m.next().value.el.x, computedSize * 2)
assert.strictEqual(m.next().value.el.x, computedSize)
assert.strictEqual(m.next().value.el.x, 0)

console.log('should return the correct scanRow-reverse values')
/**
    +-----------------------+
    | 0,0 | 1,0 | 2,0 | 3,0 |
    +-----------------------+
    | 0,1 | 1,1 | 2,1 | 3,1 |
    +-----------------------+
    | 0,2 | 1,2 | 2,2 | 3,2 |
    +-----------------------+
    | 0,3 | 1,3 | 2,3 | 3,3 |
    +-----------------------+
 */
m = g.scanRow(2, 'r')
computedSize = 25
assert.strictEqual(m.next().value.el.x, computedSize * 3)
assert.strictEqual(m.next().value.el.x, computedSize * 2)
assert.strictEqual(m.next().value.el.x, computedSize)
assert.strictEqual(m.next().value.el.x, 0)
assert.strictEqual(m.next().value.el.x, computedSize)
assert.strictEqual(m.next().value.el.x, computedSize * 2)
assert.strictEqual(m.next().value.el.x, computedSize * 3)

console.log('should return the correct scanCol values')
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
m = g.scanCol(2)
computedSize = 25
assert.strictEqual(m.next().value.el.y, 0)
assert.strictEqual(m.next().value.el.y, computedSize)
assert.strictEqual(m.next().value.el.y, computedSize * 2)
assert.strictEqual(m.next().value.el.y, computedSize * 3)
assert.strictEqual(m.next().value.el.y, computedSize * 2)
assert.strictEqual(m.next().value.el.y, computedSize)
assert.strictEqual(m.next().value.el.y, 0)

console.log('should return the correct scanDiagonal values')
/**
    +-----------------------+
    | 0,0 | 1,0 | 2,0 | 3,0 |
    +-----------------------+
    | 0,1 | 1,1 | 2,1 | 3,1 |
    +-----------------------+
    | 0,2 | 1,2 | 2,2 | 3,2 |
    +-----------------------+
    | 0,3 | 1,3 | 2,3 | 3,3 |
    +-----------------------+
 */
m = g.scanDiagonal(1, 1)
let a = m.next().value.el // 0,0
let b = m.next().value.el // 1,1
let c = m.next().value.el // 2,2
let d = m.next().value.el // 3,3
let e = m.next().value.el // 2,2
let f = m.next().value.el // 1,1
assert.strictEqual(a.ci, 0)
assert.strictEqual(a.ri, 0)
assert.strictEqual(b.ci, 1)
assert.strictEqual(b.ri, 1)
assert.strictEqual(c.ci, 2)
assert.strictEqual(c.ri, 2)
assert.strictEqual(d.ci, 3)
assert.strictEqual(d.ri, 3)
assert.strictEqual(e.ci, 2)
assert.strictEqual(e.ri, 2)
assert.strictEqual(f.ci, 1)
assert.strictEqual(f.ri, 1)

console.log('should return the correct scanAntidiagonal values')
/**
    +-----------------------+
    | 0,0 | 1,0 | 2,0 | 3,0 |
    +-----------------------+
    | 0,1 | 1,1 | 2,1 | 3,1 |
    +-----------------------+
    | 0,2 | 1,2 | 2,2 | 3,2 |
    +-----------------------+
    | 0,3 | 1,3 | 2,3 | 3,3 |
    +-----------------------+
 */
m = g.scanAntidiagonal(2, 1)
a = m.next().value.el // 3,0
b = m.next().value.el // 2,1
c = m.next().value.el // 1,2
d = m.next().value.el // 0,3
e = m.next().value.el // 1,2
f = m.next().value.el // 2,1
assert.strictEqual(a.ci, 3)
assert.strictEqual(a.ri, 0)
assert.strictEqual(b.ci, 2)
assert.strictEqual(b.ri, 1)
assert.strictEqual(c.ci, 1)
assert.strictEqual(c.ri, 2)
assert.strictEqual(d.ci, 0)
assert.strictEqual(d.ri, 3)
assert.strictEqual(e.ci, 1)
assert.strictEqual(e.ri, 2)
assert.strictEqual(f.ci, 2)
assert.strictEqual(f.ri, 1)

console.log('should return the correct cycleRow values')
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
m = g.cycleRow(2)
computedSize = 25
assert.strictEqual(m.next().value.el.x, 0)
assert.strictEqual(m.next().value.el.x, computedSize)
assert.strictEqual(m.next().value.el.x, computedSize * 2)
assert.strictEqual(m.next().value.el.x, computedSize * 3)
assert.strictEqual(m.next().value.el.x, 0)

console.log('should return the correct cycleCol values')
/**
+-----------------------+
| 0,0 | 1,0 | 2,0 | 3,0 |
+-----------------------+
| 0,1 | 1,1 | 2,1 | 3,1 |
+-----------------------+
| 0,2 | 1,2 | 2,2 | 3,2 |
+-----------------------+
| 0,3 | 1,3 | 2,3 | 3,3 |
+-----------------------+
 */
m = g.cycleCol(2)
computedSize = 25
assert.strictEqual(m.next().value.el.y, 0)
assert.strictEqual(m.next().value.el.y, computedSize)
assert.strictEqual(m.next().value.el.y, computedSize * 2)
assert.strictEqual(m.next().value.el.y, computedSize * 3)
assert.strictEqual(m.next().value.el.y, 0)

console.log('should return the correct bounce values')
const g4 = new Gridset({
  width: 100,
  height: 100,
  rows: 4,
  cols: 5
})
/**
+-----------------------------+
| 0,0 | 1,0 | 2,0 | 3,0 | 4,0 | <- 0,0
+-----------------------------+
| 0,1 | 1,1 | 2,1 | 3,1 | 4,1 | <- 1,1
+-----------------------------+
| 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | <- 2,2
+-----------------------------+
| 0,3 | 1,3 | 2,3 | 3,3 | 4,3 | <- 3,3 and then 4,2 and then 3,1
+-----------------------------+
 */
m = g4.bounce()
a = m.next().value.el // 0,0
b = m.next().value.el // 1,1
c = m.next().value.el // 2,2
d = m.next().value.el // 3,3
e = m.next().value.el // 4,2
f = m.next().value.el // 3,1

assert.strictEqual(a.ci, 0)
assert.strictEqual(a.ri, 0)
assert.strictEqual(b.ci, 1)
assert.strictEqual(b.ri, 1)
assert.strictEqual(c.ci, 2)
assert.strictEqual(c.ri, 2)
assert.strictEqual(d.ci, 3)
assert.strictEqual(d.ri, 3)
assert.strictEqual(e.ci, 4)
assert.strictEqual(e.ri, 2)
assert.strictEqual(f.ci, 3)
assert.strictEqual(f.ri, 1)
