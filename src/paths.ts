import { Grid, Cell } from './gridset.d';
import { flatCells } from './cells';

export const diagonal = (grid: Grid) => (ci: number, ri: number): Cell[] => {
  let cells: Cell[] = flatCells(grid);
  let dCells: Cell[] = cells.filter((c: any) => ci - c.ci === ri - c.ri);
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
