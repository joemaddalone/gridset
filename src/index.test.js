import { Gridset } from './';

describe('Gridset', () => {
  it('should have correct number of cells', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    expect(g.cols.length).toBe(4);
    expect(g.rows.length).toBe(4);
  });

  it('should have correct automatic sizing of cells', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    expect(g.cells[0][0].w).toBe(25);
    expect(g.cells[0][0].h).toBe(25);
  });

  it('should have correct size and positions for custom cellWidth', () => {
    const g = new Gridset({
      width: 200,
      height: 200,
      rows: 5,
      cols: 5,
      cellWidth: 60,
    });
    /**
    0           60      95      130     165      200
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
    expect(g.cells[0][0].w).toBe(60);
    expect(g.cells[1][0].x).toBe(35); //  +35
    expect(g.cells[2][0].x).toBe(70); //  +35
    expect(g.cells[3][0].x).toBe(105); // +35
    expect(g.cells[4][0].x).toBe(140); // +35
  });

  it('should have correct size and positions for custom cellHeight', () => {
    const g = new Gridset({
      width: 200,
      height: 200,
      rows: 5,
      cols: 5,
      cellHeight: 60,
    });
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
    expect(g.cells[0][0].h).toBe(60);
    expect(g.cells[0][1].y).toBe(35); //  +35
    expect(g.cells[0][2].y).toBe(70); //  +35
    expect(g.cells[0][3].y).toBe(105); //  +35
    expect(g.cells[0][4].y).toBe(140); //  +35
  });

  it('should flat array of cells', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
    expect(g.flatCells.length).toBe(4 * 4);
  });

  it('should return the correct area properties', () => {
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
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 5,
      cols: 5,
    });
    const computedSize = 20; // 100/5
    const area = g.area({ ci1: 1, ri1: 2, ci2: 4, ri2: 4 });
    expect(area.cells.length).toBe(3);
    expect(area.cells[0].length).toBe(2);
    expect(area.w).toBe(computedSize * 4);
    expect(area.h).toBe(computedSize * 3);
    expect(area.l).toBe(computedSize);
    expect(area.r).toBe(computedSize * 5);
  });
  it('should return the correct area properties when the second cell is to the left or above', () => {
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
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 5,
      cols: 5,
    });
    const computedSize = 20; // 100/5
    const area = g.area({ ci1: 4, ri1: 4, ci2: 1, ri2: 2 });
    expect(area.cells.length).toBe(3);
    expect(area.cells[0].length).toBe(2);
    expect(area.w).toBe(computedSize * 4);
    expect(area.h).toBe(computedSize * 3);
    expect(area.l).toBe(computedSize);
    expect(area.r).toBe(computedSize * 5);
  });

  it('should return the correct column', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const col = g.col(2);
    expect(col.x).toBe(50);
    expect(col.w).toBe(25);
    expect(col.h).toBe(100);
    expect(col.cells[0].ci).toBe(2);
    expect(col.cells.length).toBe(4);
  });

  it('should return the correct row', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const row = g.row(2);
    expect(row.y).toBe(50);
    expect(row.w).toBe(100);
    expect(row.h).toBe(25);
    expect(row.cells[0].ri).toBe(2);
    expect(row.cells.length).toBe(4);
  });

  it('should return the diagonal cells', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 5,
      cols: 5,
    });
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
    const diag = g.diagonal(1, 2);
    expect(diag[0].ci).toBe(0);
    expect(diag[0].ri).toBe(1);
    expect(diag[1].ci).toBe(1);
    expect(diag[1].ri).toBe(2);
    expect(diag[2].ci).toBe(2);
    expect(diag[2].ri).toBe(3);
    expect(diag[3].ci).toBe(3);
    expect(diag[3].ri).toBe(4);
  });

  it('should return the anti-diagonal cells', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 5,
      cols: 5,
    });
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
    const adiag = g.antidiagonal(1, 2);
    expect(adiag[0].ci).toBe(0);
    expect(adiag[0].ri).toBe(3);
    expect(adiag[1].ci).toBe(1);
    expect(adiag[1].ri).toBe(2);
    expect(adiag[2].ci).toBe(2);
    expect(adiag[2].ri).toBe(1);
    expect(adiag[3].ci).toBe(3);
    expect(adiag[3].ri).toBe(0);
  });

  it('should return the correct adjacent cells', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    expect(cell.look.u().ci).toBe(1);
    expect(cell.look.u().ri).toBe(1);
    expect(cell.look.r().ci).toBe(2);
    expect(cell.look.r().ri).toBe(2);
    expect(cell.look.l().ci).toBe(0);
    expect(cell.look.l().ri).toBe(2);
    expect(cell.look.d().ci).toBe(1);
    expect(cell.look.d().ri).toBe(3);
    expect(cell.look.lu().ci).toBe(0);
    expect(cell.look.lu().ri).toBe(1);
    expect(cell.look.ru().ci).toBe(2);
    expect(cell.look.ru().ri).toBe(1);
    expect(cell.look.rd().ci).toBe(2);
    expect(cell.look.rd().ri).toBe(3);
    expect(cell.look.ld().ci).toBe(0);
    expect(cell.look.ld().ri).toBe(3);
    expect(cell.look.u().look.u().look.r().ci).toBe(2);
    expect(cell.look.u().look.u().look.r().ri).toBe(0);
  });

  it('should return the same cell when looking negatively out of the row bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    expect(cell.look.u().look.u().look.u().ci).toBe(1);
    expect(cell.look.u().look.u().look.u().ri).toBe(0);
  });

  it('should return the same cell when looking positively out of the row bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    expect(cell.look.d().look.d().ci).toBe(1);
    expect(cell.look.d().look.d().ri).toBe(3);
  });

  it('should return the correct "cycled" cell looking negatively out of the row bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    const mode = 'cycle';
    expect(cell.look.u(mode).look.u(mode).look.u(mode).ci).toBe(1);
    expect(cell.look.u(mode).look.u(mode).look.u(mode).ri).toBe(3);
  });

  it('should return the correct "cycled" cell looking positively out of the row bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    const mode = 'cycle';
    expect(cell.look.d(mode).look.d(mode).ci).toBe(1);
    expect(cell.look.d(mode).look.d(mode).ri).toBe(3);
  });

  it('should return the correct "cycled" cell looking positively outside of the column bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    const mode = 'cycle';
    expect(cell.look.r(mode).look.r(mode).look.r(mode).ci).toBe(0);
    expect(cell.look.r(mode).look.r(mode).look.r(mode).ri).toBe(2);
  });

  it('should return the correct "cycled" cell looking negatively outside of the column bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    const mode = 'cycle';
    expect(cell.look.l(mode).look.l(mode).ci).toBe(3);
    expect(cell.look.l(mode).look.l(mode).ri).toBe(2);
  });

  it('should return the correct "cycled" cell looking positively outside of the diagonal bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    const mode = 'cycle';
    expect(cell.look.rd(mode).look.rd(mode).ci).toBe(0);
    expect(cell.look.rd(mode).look.rd(mode).ri).toBe(1);
  });

  it('should return the correct "cycled" cell looking negatively outside of the diagonal bounds of the grid', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const cell = g.cell(1, 2);
    const mode = 'cycle';
    expect(cell.look.lu(mode).look.lu(mode).ci).toBe(2);
    expect(cell.look.lu(mode).look.lu(mode).ri).toBe(3);
  });

  it('should return the correct scanRow values', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const m = g.scanRow(2);
    const computedSize = 25;
    expect(m.next().value.x).toBe(0);
    expect(m.next().value.x).toBe(computedSize);
    expect(m.next().value.x).toBe(computedSize * 2);
    expect(m.next().value.x).toBe(computedSize * 3);
    expect(m.next().value.x).toBe(computedSize * 2);
    expect(m.next().value.x).toBe(computedSize);
    expect(m.next().value.x).toBe(0);
  });

  it('should return the correct scanCol values', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const m = g.scanCol(2);
    const computedSize = 25;
    expect(m.next().value.y).toBe(0);
    expect(m.next().value.y).toBe(computedSize);
    expect(m.next().value.y).toBe(computedSize * 2);
    expect(m.next().value.y).toBe(computedSize * 3);
    expect(m.next().value.y).toBe(computedSize * 2);
    expect(m.next().value.y).toBe(computedSize);
    expect(m.next().value.y).toBe(0);
  });

  it('should return the correct cycleRow values', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const m = g.cycleRow(2);
    const computedSize = 25;
    expect(m.next().value.x).toBe(0);
    expect(m.next().value.x).toBe(computedSize);
    expect(m.next().value.x).toBe(computedSize * 2);
    expect(m.next().value.x).toBe(computedSize * 3);
    expect(m.next().value.x).toBe(0);
  });

  it('should return the correct cycleCol values', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 4,
    });
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
    const m = g.cycleCol(2);
    const computedSize = 25;
    expect(m.next().value.y).toBe(0);
    expect(m.next().value.y).toBe(computedSize);
    expect(m.next().value.y).toBe(computedSize * 2);
    expect(m.next().value.y).toBe(computedSize * 3);
    expect(m.next().value.y).toBe(0);
  });

  it('should return the correct bounce values', () => {
    const g = new Gridset({
      width: 100,
      height: 100,
      rows: 4,
      cols: 5,
    });
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
    const m = g.bounce();
    const computedSize = 25;
    const a = m.next().value; // 0,0
    const b = m.next().value; // 1,1
    const c = m.next().value; // 2,2
    const d = m.next().value; // 3,3
    const e = m.next().value; // 4,2
    const f = m.next().value; // 3,1

    expect(a.ci).toBe(0);
    expect(a.ri).toBe(0);
    expect(b.ci).toBe(1);
    expect(b.ri).toBe(1);
    expect(c.ci).toBe(2);
    expect(c.ri).toBe(2);
    expect(d.ci).toBe(3);
    expect(d.ri).toBe(3);
    expect(e.ci).toBe(4);
    expect(e.ri).toBe(2);
    expect(f.ci).toBe(3);
    expect(f.ri).toBe(1);
  });
});
