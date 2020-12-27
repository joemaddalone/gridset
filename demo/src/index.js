import { Gridset } from 'gridset';
import { html } from './html.js';
import { svg } from './svg.js';
import { canvas } from './canvas.js';
import { text } from './text.js';

const htmlRoot = document.getElementById('html-root');
const textRoot = document.getElementById('text-root');
const svgRoot = document.getElementById('svg-root');
const canvasRoot = document.getElementById('canvas-root');

class Demo {
  constructor() {
    this.width = 350;
    this.height = 300;
    this.cols = 20;
    this.rows = 19;
    this.showGrid = true;
    this.demo = 'bounce';
    this.cellWidth = 0;
    this.cellHeight = 0;
    this.draw();
  }
  get w() {
    return this.width;
  }
  set w(v) {
    this.width = v;
    this.draw();
  }
  get h() {
    return this.height;
  }
  set h(v) {
    this.height = v;
    this.draw();
  }
  get c() {
    return this.cols;
  }
  set c(v) {
    this.cols = v;
    this.draw();
  }
  get r() {
    return this.rows;
  }
  set r(v) {
    this.rows = v;
    this.draw();
  }
  get cw() {
    return this.cellWidth;
  }
  set cw(v) {
    this.cellWidth = v;
    this.draw();
  }
  get ch() {
    return this.cellHeight;
  }
  set ch(v) {
    this.cellHeight = v;
    this.draw();
  }
  get g() {
    return this.showGrid;
  }
  set g(v) {
    this.showGrid = v;
    this.draw();
  }
  get d() {
    return this.demo;
  }
  set d(v) {
    this.demo = v;
    this.draw();
  }
  get mover() {
    switch (this.d) {
      case 'bounce':
        return this.grid.bounce();
      case 'scanCol':
        return this.grid.scanCol(3);
      case 'scanCol-r':
        return this.grid.scanCol(3, 'r');
      case 'scanRow':
        return this.grid.scanRow(3);
      case 'scanRow-r':
        return this.grid.scanRow(3, 'r');
      case 'cycleCol':
        return this.grid.cycleCol(3);
      case 'cycleCol-r':
        return this.grid.cycleCol(3, 'r');
      case 'cycleRow':
        return this.grid.cycleRow(3);
      case 'cycleRow-r':
        return this.grid.cycleRow(3, 'r');
      default:
        return this.grid.bounce();
    }
  }
  draw() {
    this.grid = new Gridset({
      width: this.width,
      height: this.height,
      cols: this.cols,
      rows: this.rows,
      cellWidth: this.cellWidth,
      cellHeight: this.cellHeight,
    });
    [htmlRoot, svgRoot].forEach((r) => {
      r.style.width = `${this.grid.width}px`;
      r.style.height = `${this.grid.height}px`;
    });

    text(this.grid, textRoot, this.showGrid, this.mover);
    html(this.grid, htmlRoot, this.showGrid, this.mover);
    svg(this.grid, svgRoot, this.showGrid, this.mover);
    canvas(this.grid, canvasRoot, this.showGrid, this.mover);
  }
}

const d = new Demo();

const changer = (prop, val) => {
  d[prop] = +val;
};

document.getElementById('w').addEventListener('input', (e) => {
  const val = +e.target.value;
  if (val > 0) {
    d.w = val;
  }
});

document.getElementById('h').addEventListener('input', (e) => {
  const val = +e.target.value;
  if (val > 0) {
    d.h = val;
  }
});

// document.getElementById('cw').addEventListener('input', (e) => {
//   const val = +e.target.value;
//   if (val > -1) {
//     d.cw = val;
//   }
// });

// document.getElementById('ch').addEventListener('input', (e) => {
//   const val = +e.target.value;
//   if (val > -1) {
//     d.ch = val;
//   }
// });

document.getElementById('r').addEventListener('input', (e) => {
  const val = +e.target.value;
  if (val > 2) {
    d.r = val;
  }
});

document.getElementById('c').addEventListener('input', (e) => {
  const val = +e.target.value;
  if (val > 2) {
    d.c = val;
  }
});

document.getElementById('g').addEventListener('click', (e) => {
  d.g = !d.g;
});

document.getElementById('d').addEventListener('change', (e) => {
  d.d = e.target.value;
});
