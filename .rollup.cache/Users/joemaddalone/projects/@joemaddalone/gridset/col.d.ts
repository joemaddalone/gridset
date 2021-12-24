import { GridSettings } from './gridset.d';
declare const col: (grid: GridSettings) => (ci: number) => {
    cells: import("./gridset.d").CellArray;
    x: number;
    y: number;
    w: number;
    h: number;
    t: number;
    l: number;
    r: number;
    b: number;
    cx: number;
    cy: number;
    ci: number;
};
export default col;
