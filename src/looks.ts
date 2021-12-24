import { GridSettings } from './gridset.d';
import { cycleCell } from './cycleCell';
import { cell } from './cell';

export const looks = (ci: number, ri: number, grid: GridSettings) => {
  return {
    // one cell up
    _u: (mode: string) => {
      const nCell = cell(ci, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'u', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell up and one cell left
    _lu: (mode: string) => {
      const nCell = cell(ci - 1, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'lu', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell right and up
    _ru: (mode: string) => {
      const nCell = cell(ci + 1, ri - 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'ru', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell down
    _d: (mode: string) => {
      const nCell = cell(ci, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'd', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell left and down
    _ld: (mode: string) => {
      const nCell = cell(ci - 1, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'ld', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell right and down
    _rd: (mode: string) => {
      const nCell = cell(ci + 1, ri + 1, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'rd', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell right
    _r: (mode: string) => {
      const nCell = cell(ci + 1, ri, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'r', grid);
      }
      return cell(ci, ri, grid);
    },
    // one cell left
    _l: (mode: string) => {
      const nCell = cell(ci - 1, ri, grid);
      if (nCell) {
        return nCell;
      }
      if (!nCell && mode === 'cycle') {
        return cycleCell({ ci, ri }, 'l', grid);
      }
      return cell(ci, ri, grid);
    },
  };
};
