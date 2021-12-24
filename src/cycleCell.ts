import { GridSettings, Cell, CellArray } from './gridset.d';
import { colCells, rowCells, antidiagonal, diagonal } from './cells';
import iterators from './iterators';
const { cycler } = iterators;

export const cycleCell = function (
  cell: Pick<Cell, 'ri' | 'ci'>,
  dir: string,
  grid: GridSettings,
) {
  let cells: CellArray = [];
  let cycleDir = '';
  let si = 0;
  const { ci, ri } = cell;
  const isCol = dir === 'u' || dir === 'd';
  const isRow = dir === 'l' || dir === 'r';
  const isDiag = !isCol && !isRow;
  const antidiagonalPath = antidiagonal(grid);
  const diagonalPath = diagonal(grid);

  if (isCol) {
    cells = colCells(ci, grid);
    si = ri;
    if (dir === 'u') {
      cycleDir = 'r';
    }
    if (dir === 'd') {
      cycleDir = 'f';
    }
  }
  if (isRow) {
    cells = rowCells(ri, grid);
    si = ci;
    if (dir === 'l') {
      cycleDir = 'r';
    }
    if (dir === 'r') {
      si = ci + 1;
      cycleDir = 'f';
    }
  }
  if (isDiag) {
    if (dir === 'lu' || dir === 'rd') {
      cells = diagonalPath(ci, ri);
    } else {
      cells = antidiagonalPath(ci, ri);
    }
    si = cells.findIndex((c) => c?.ci === ci) + 1;
    cycleDir = dir.startsWith('r') ? 'f' : 'r';
  }

  return cycler(cells, cycleDir, si).next().value;
};
