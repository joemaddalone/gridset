import Gridset from '../web_modules/gridset.js';
import { CanvasGrid } from '../canvasGrid.js';

export default (target) => {
	const overlap = new Gridset({
		width: 250,
		height: 250,
		rows: 5,
		cols: 5,
		cellHeight: 60,
		x: 20,
		y: 10,
	});

	const b = new CanvasGrid(
		overlap,
		target,
		290,
		270,
	);
	b.drawSimpleGrid([1], [1])
	Array.from({ length: 5 }).forEach((_, i) => {
		const row = b.grid.area({ ci1: 0, ri1: i, ci2: i, ri2: i });
		const ct = row.t;
		const cb = row.b;
		const rowBottom = b.grid.row(i).b;
		b.ctx.strokeStyle = '#000';
		b.ctx.lineWidth = 2;
		b.ctx.beginPath();
		b.ctx.setLineDash([0]);
		const l = i === 0 ? row.l : row.l + i * b.grid.cellWidth;
		b.ctx.moveTo(l, ct);
		b.ctx.lineTo(row.r, ct);
		b.ctx.lineTo(row.r, row.b);
		b.ctx.lineTo(row.l, row.b);
		b.ctx.stroke();

		b.ctx.textAlign = 'center';
		b.ctx.fillText(parseInt(row.b - 10), row.x - 10, row.b + 3);
		b.ctx.fillText(`row(${i})`, row.x + 25, b.grid.row(i).cy);
		b.ctx.textAlign = 'center';
		b.ctx.fillText(parseInt(row.t - 10), b.grid.width + 30, ct);
	});

};
