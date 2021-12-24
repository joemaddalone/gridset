import { GridSettings, Cell } from './gridset.d';
export declare const cycleCell: (cell: Pick<Cell, 'ri' | 'ci'>, dir: string, grid: GridSettings) => Cell | null | undefined;
