import { GridSettings } from './gridset.d';
declare const row: (grid: GridSettings) => (ri: number) => {
    cells: import("./gridset.d").CellArray;
    x: number;
    y: number;
    w: number;
    h: number;
    cx: number;
    cy: number;
    t: number;
    l: number;
    r: number;
    b: number;
    ri: number;
};
export default row;
