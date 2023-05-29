export class CanvasGrid {
  constructor(grid, container, w, h) {
    this.grid = grid;
    this.canvas = document.createElement('canvas');
    this.canvas.width = w;
    this.canvas.height = h;
    container.insertBefore(this.canvas, container.firstChild);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.width = w;
    this.ctx.height = h;
    this.clear()
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.grid.width,
      this.grid.height,
    );
  }

  drawSimpleGrid(h = [0, 0], v = [0, 0]) {
    this.ctx.strokeStyle = '#555';
    this.ctx.lineWidth = 0.5;
    this.ctx.setLineDash(h);
    for (let i = 1; i < this.grid.colCount; i++) {
      const { x, y, w, h } = this.grid.col(i);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + h);
      this.ctx.stroke();
    }
    this.ctx.setLineDash(v);
    for (let i = 1; i < this.grid.rowCount; i++) {
      const { x, y, w, h } = this.grid.row(i);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + w, y);
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.grid.x, this.grid.y);
    this.ctx.lineTo(this.grid.width + this.grid.x, this.grid.y);
    this.ctx.lineTo(this.grid.width + this.grid.x, this.grid.height + this.grid.y);
    this.ctx.lineTo(this.grid.x, this.grid.height + this.grid.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  fillCoordValues() {
    this.ctx.textAlign = 'center';
    this.grid.flatCells.forEach((cell) => {
      this.ctx.fillText(`${cell.ci},${cell.ri}`, cell.cx, cell.cy + 5);
    });
  }

  highlightCell(cell, color = 'red') {
    this.ctx.strokeStyle = 'red'
		this.ctx.lineWidth = 2;
    this.ctx.strokeRect(cell.x, cell.y, cell.w, cell.h);
  }

  fillCell(cell, color = 'red') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
  }

  highlightCells(cells, color = 'red') {
    cells.forEach((cell) => this.highlightCell(cell, color));
  }

  fillCells(cells, color = 'red') {
    cells.forEach((cell) => this.fillCell(cell, color));  
  }
}
