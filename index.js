import { Gridset } from './web_modules/gridset.js';
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
  get g() {
    return this.showGrid;
  }
  set g(v) {
    this.showGrid = v;
    this.draw();
  }
  draw() {
    const g = new Gridset({
      width: this.width,
      height: this.height,
      cols: this.cols,
      rows: this.rows,
    });

    [htmlRoot, svgRoot].forEach((r) => {
      r.style.width = `${g.width}px`;
      r.style.height = `${g.height}px`;
    });

    text(g, textRoot, this.showGrid);
    html(g, htmlRoot, this.showGrid);
    svg(g, svgRoot, this.showGrid);
    canvas(g, canvasRoot, this.showGrid);
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
