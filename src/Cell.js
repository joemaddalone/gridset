class Cell {
  constructor({ ci, ri, w, h, grid, look }) {
    this.ci = ci;
    this.ri = ri;
    this.w = w;
    this.h = h;
    this.grid = grid;
    this.look = look;
  }
  __calcXy(rici, wh) {
    const gridDimension = wh === 'w' ? this.grid.width : this.grid.height;
    const cellDimension = wh === 'w' ? this.w : this.h;
    const iterableDimension = wh === 'w' ? this.grid.cols : this.grid.rows;
    return rici * ((gridDimension - cellDimension) / (iterableDimension - 1));
  }
  get x() {
    const val = this.__calcXy(this.ci, 'w');
    Object.defineProperty(this, 'x', {
      value: val,
    });
    return val;
  }
  get y() {
    const val = this.__calcXy(this.ri, 'h');
    Object.defineProperty(this, 'y', {
      value: val,
    });
    return val;
  }
  get t() {
    return this.y;
  }
  get r() {
    const val = this.x + this.w;
    Object.defineProperty(this, 'r', {
      value: val,
    });
    return val;
  }
  get l() {
    return this.x;
  }
  get b() {
    const val = this.y + this.h;
    Object.defineProperty(this, 'b', {
      value: val,
    });
    return val;
  }
  get cx() {
    const val = this.x + this.w / 2;
    Object.defineProperty(this, 'cx', {
      value: val,
    });
    return val;
  }
  get cy() {
    const val = this.y + this.h / 2;
    Object.defineProperty(this, 'cy', {
      value: val,
    });
    return val;
  }
}

export default Cell;
