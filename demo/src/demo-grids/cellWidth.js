import Gridset from 'gridset';
import { CanvasGrid } from '../canvasGrid.js';

export default (target) => {
  const overlap = new Gridset({
    width: 250,
    height: 250,
    rows: 5,
    cols: 5,
    cellWidth: 60,
    x: 10,
    y: 10,
  });

  const b = new CanvasGrid(
    overlap,
    target,
    270,
    270,
  );
  b.drawSimpleGrid([1], [1])
  Array.from({ length: 5 }).forEach((_, i) => {
    const col = b.grid.area({ ci1: i, ri1: 0, ci2: i, ri2: i });
    const ct = col.t;
    const cb = col.b;
    const colBottom = b.grid.col(i).b;
    b.ctx.strokeStyle = '#000';
    b.ctx.lineWidth = 2;
    b.ctx.beginPath();
    b.ctx.setLineDash([0]);
    b.ctx.moveTo(col.r, ct);
    b.ctx.lineTo(col.r, cb);
    b.ctx.stroke();

    // col bottom
    b.ctx.beginPath();
    b.ctx.setLineDash([0, 0]);
    b.ctx.moveTo(col.r, cb);
    b.ctx.lineTo(col.x, cb);
    b.ctx.stroke();

    // col left dark
    b.ctx.beginPath();
    b.ctx.setLineDash([0]);
    const t = i === 0 ? ct : ct + i * b.grid.cellHeight;
    b.ctx.moveTo(col.x, t);
    b.ctx.lineTo(col.x, col.b);
    b.ctx.stroke();

    b.ctx.textAlign = 'center';
    b.ctx.fillText(parseInt(col.x - 10), col.x, colBottom + 10);
    b.ctx.fillText(`col(${i})`, col.x + b.grid.cellWidth / 2, cb - 5);
    b.ctx.textAlign = 'center';
    b.ctx.fillText(parseInt(col.r) - 10, col.r, ct - 3);
  });
  
};
