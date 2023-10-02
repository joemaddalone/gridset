import cl from './doConsoleGrid.js';
import cellWidth from './demo-grids/cellWidth.js';
import cellHeight from './demo-grids/cellHeight.js';
import column from './demo-grids/column.js';
import row from './demo-grids/row.js';
import diagonal from './demo-grids/diagonal.js';
import antidiagonal from './demo-grids/antidiagonal.js';
import areaByCell from './demo-grids/areaByCell.js';
import area from './demo-grids/area.js';

column(document.getElementById('gridset-column'));
row(document.getElementById('gridset-row'));
diagonal(document.getElementById('gridset-diagonal'));
antidiagonal(document.getElementById('gridset-antidiagonal'));
areaByCell(document.getElementById('gridset-areabycell'));
area(document.getElementById('gridset-area'));
cl();
