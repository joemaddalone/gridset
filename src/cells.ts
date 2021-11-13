import { Grid, Cell } from './gridset.d';
import { cell } from './cell';

export const colCells = (ci: number, grid: Grid): (Cell | null)[] =>
  Array.from({ length: grid.rowCount }).map((_, ri) => cell(ci, ri, grid));

export const rowCells = (ri: number, grid: Grid): (Cell | null)[] =>
  Array.from({ length: grid.colCount }).map((_, ci) => cell(ci, ri, grid));

export const cols = (grid: Grid): (Cell | null)[][] =>
  Array.from({ length: grid.colCount }).map((_, ci) => colCells(ci, grid));

export const rows = (grid: Grid): (Cell | null)[][] =>
  Array.from({ length: grid.rowCount }).map((_, ri) => rowCells(ri, grid));

export const flatCells = (grid: Grid) => cols(grid).flatMap((col) => col);

export const diagonal = (grid: Grid) => (
  ci: number,
  ri: number,
): (Cell | null)[] => {
  let cells = flatCells(grid);
  let dCells = cells.filter((c: any) => ci - c.ci === ri - c.ri);
  return dCells;
};

export const antidiagonal = (grid: Grid) => (ci: number, ri: number) => {
  const cells = flatCells(grid);
  return cells.filter((c: any) => {
    if (ci === c.ci && ri === c.ri) {
      return true; // this is our cell.
    }
    const cResult = ci - c.ci;
    const rResult = ri - c.ri;
    if (cResult < 0 || rResult < 0) {
      // one of them must be negative
      return Math.min(cResult, rResult) === Math.max(cResult, rResult) * -1;
    } else {
      return false;
    }
  });
};

export const area = (grid: Grid) => ({
  ci1,
  ri1,
  ci2,
  ri2,
}: {
  ci1: number;
  ri1: number;
  ci2: number;
  ri2: number;
}) => {
  const cell1 = cell(ci1, ri1, grid);
  const cell2 = cell(ci2, ri2, grid);
  if (cell1 && cell2) {
    return areaByCell(grid)(cell1, cell2);
  }
  return;
};

export const areaByCell = (grid: Grid) => (cell1: Cell, cell2: Cell) => {
  const leftCell = cell1.ci <= cell2.ci ? cell1 : cell2;
  const rightCell = cell1.ci <= cell2.ci ? cell2 : cell1;
  const topCell = cell1.ri <= cell2.ri ? cell1 : cell2;
  const bottomCell = cell1.ri <= cell2.ri ? cell2 : cell1;
  const w =
    bottomCell.ci !== topCell.ci ? rightCell.r - leftCell.l : grid.cellWidth;
  const h =
    bottomCell.ri !== topCell.ri ? bottomCell.b - topCell.t : grid.cellHeight;

  const cols = Array.from({ length: rightCell.ci - leftCell.ci });
  const rows = Array.from({ length: bottomCell.ri - topCell.ri });
  const cells = cols.map((_, ci) => {
    return rows.map((_, ri) => {
      return cell(leftCell.ci + ci, topCell.ri + ri, grid);
    });
  });

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
    cells,
  };
};
