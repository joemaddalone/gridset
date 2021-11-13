export type Grid = {
  width: number;
  height: number;
  rows: number;
  cols: number;
  rowCount: number;
  colCount: any;
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

export type CellPoint = {
  ri: number;
  ci: number;
};
