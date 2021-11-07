/**
 * This file is just here for quick tests, usually in node.
 */
import { Gridset } from './index.js';

const g = new Gridset({
  width: 500,
  height: 500,
  rows: 10,
  cols: 5,
});

console.log(g.cell(0, 3).r().r().r().r().r().r('cycle'));
