import Gridset from 'gridset';
import { CanvasGrid } from '../canvasGrid.js';

export default (target) => {
	const g = new Gridset({
		width: 250,
		height: 250,
		rows: 5,
		cols: 5,
		x: 10,
		y: 10
	})

	const a = new CanvasGrid(g, target, 270, 270)
	a.drawSimpleGrid();
	a.fillCoordValues()
	const start = a.grid.cell(1, 2)
	const end = a.grid.cell(3,3)
	a.highlightCells(a.grid.areaByCell(start, end).cells.flat(Infinity))
}