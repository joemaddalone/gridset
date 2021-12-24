/* eslint-disable @typescript-eslint/ban-types */
export type GridSettings = {
  width: number;
  height: number;
  rowCount: number;
  colCount: number;
  cellWidth: number;
  cellHeight: number;
};

export type Cell = {
  x: number;
  y: number;
  t: number;
  l: number;
  b: number;
  r: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  ci: number;
  ri: number;
  _u: Function;
  _lu: Function;
  _ru: Function;
  _d: Function;
  _ld: Function;
  _rd: Function;
  _r: Function;
  _l: Function;
};

export type CellArray = (Cell | null)[];
export type Area = (Cell | null)[][];
export type Scanner = Generator;
export type Cycler = Generator;
export type Bouncer = Generator;

export interface IGridset {
  readonly cells: Area;
  readonly cols: Area;
  readonly rows: Area;
  readonly flatCells: CellArray;
  readonly settings: GridSettings;
  readonly width: GridSettings.width;
  readonly height: GridSettings.height;
  readonly colCount: GridSettings.colCount;
  readonly rowCount: GridSettings.rowCount;
  readonly cellWidth: GridSettings.cellWidth;
  readonly cellHeight: GridSettings.cellHeight;
  cell(ci: number, ri: number): Cell | null;
  rowCells(ri: number): CellArray;
  colCells(ci: number): CellArray;
  scanCells(cells, dir, si): Scanner;
  cycleCells(cells, dir, si): Cycler;
  scanRow(ri: number, dir, si): Scanner;
  scanDiagonal(ci: number, ri: number, dir, si): Scanner;
  scanAntidiagonal(ci: number, ri: number, dir, si): Scanner;
  scanCol(ci: number, dir, si): Cycler;
  cycleRow(ri: number, dir, si): Cycler;
  cycleCol(ci: number, dir, si): Cycler;
  cycleDiagonal(ci: number, ri: number, dir, si): Cycler;
  cycleAntidiagonal(ci: number, ri: number, dir, si): Cycler;
  bounce(area, sx: number, sy: number, mx: number, my: number): Bouncer;
}
