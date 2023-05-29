import Gridset from './web_modules/gridset.js';
export default () => {
    const g2 = new Gridset({
      width: 200,
      height: 200,
      rows: 5,
      cols: 5,
    });
  
    const cellPaddingX = 4;
    const cellPaddingY = 2;
    const contentLength = 3; // this is cheating.
  
    const padX = cellPaddingX ? ' '.repeat(cellPaddingX / 2) : '';
    const padY = cellPaddingY ? cellPaddingY / 2 : 0;
  
    const rowValues = (row, numcols) => {
      return `│${Array.from({ length: numcols })
        .map((_, col) => `${padX}${col},${row}${padX}`)
        .join('│')}│`;
    };
  
    const cellPadY = (numcols) => {
      return `│${Array.from({ length: numcols })
        .map((_, i) => ' '.repeat(cellPaddingX + contentLength))
        .join('│')}│`;
    };
  
    const gridTop = `┌${g2.cols
      .map((_) => '─'.repeat(cellPaddingX + contentLength))
      .join('┬')}┐`;
  
    const gridBottom = `└${g2.cols
      .map((_) => '─'.repeat(cellPaddingX + contentLength))
      .join('┴')}┘`;
  
    const gridMid = `├${g2.cols
      .map((_) => '─'.repeat(cellPaddingX + contentLength))
      .join('┼')}┤`;
  
    const t = [];
    t.push(gridTop);
    g2.rows.forEach((row, i, rows) => {
      if (padY) {
        t.push(cellPadY(g2.colCount));
      }
      t.push(rowValues(i, g2.colCount));
      if (padY) {
        t.push(cellPadY(g2.colCount));
      }
      if (i !== rows.length - 1) {
        t.push(gridMid);
      }
    });
    t.push(gridBottom);
    console.log(t.join('\n'));
    console.log('Oh dang, we put a Gridset in your console!');
  };