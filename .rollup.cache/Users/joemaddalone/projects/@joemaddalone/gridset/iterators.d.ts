import { CellArray, Area } from './gridset.d';
declare const _default: {
    scanner: (arr: CellArray, dir: string | undefined, si: number | null) => Generator<import("./gridset.d").Cell | null | undefined, never, unknown>;
    bouncer: (arr: Area, sx?: number | null | undefined, sy?: number | null | undefined, initMx?: number, initMy?: number) => Generator<import("./gridset.d").Cell | 0, never, unknown>;
    cycler: (arr: CellArray, d?: string, si?: number | null) => Generator<import("./gridset.d").Cell | null | undefined, never, unknown>;
};
export default _default;
