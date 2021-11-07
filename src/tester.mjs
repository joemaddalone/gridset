/**
 * This file is just here for quick tests, usually in node.
 */
import { Gridset } from './index.js';

const g = new Gridset({
  width: 500,
  height: 500,
  rows: 10,
  cols: 10,
});

console.log(g.diagonal(1, 1, 5, 5));
