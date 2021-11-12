import { Grid, Cell } from './gridset.d';
import { cell } from './cell';

export const colCells = (ci: number, grid: Grid): Cell[] =>
  Array.from({ length: grid.rowCount }).map((_, ri) => cell(ci, ri, grid));

export const rowCells = (ri: number, grid: Grid): Cell[] =>
  Array.from({ length: grid.colCount }).map((_, ci) => cell(ci, ri, grid));

export const cols = (grid: Grid): Cell[][] =>
  Array.from({ length: grid.colCount }).map((_, ci) => colCells(ci, grid));

export const rows = (grid: Grid): Cell[][] =>
  Array.from({ length: grid.rowCount }).map((_, ri) => rowCells(ri, grid));

export const flatCells = (grid: Grid) => cols(grid).flatMap((col) => col);
