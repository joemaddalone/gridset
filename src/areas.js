const area = function ({ ci1, ri1, ci2, ri2 }) {
  const cell1 = this.cell(ci1, ri1);
  const cell2 = this.cell(ci2, ri2);
  return this.areaByCell(cell1, cell2);
};

const areaByCell = function (cell1, cell2) {
  const leftCell = cell1.ci <= cell2.ci ? cell1 : cell2;
  const rightCell = cell1.ci <= cell2.ci ? cell2 : cell1;
  const topCell = cell1.ri <= cell2.ri ? cell1 : cell2;
  const bottomCell = cell1.ri <= cell2.ri ? cell2 : cell1;
  const w =
    bottomCell.ci !== topCell.ci ? rightCell.r - leftCell.l : this.gWidth;
  const h =
    bottomCell.ri !== topCell.ri ? bottomCell.b - topCell.t : this.gHeight;

  const cols = Array.from({ length: rightCell.ci - leftCell.ci });
  const rows = Array.from({ length: bottomCell.ri - topCell.ri });
  const cells = cols.map((_, ci) => {
    return rows.map((_, ri) => {
      return this.cell(leftCell.ci + ci, topCell.ri + ri);
    });
  });

  return {
    x: leftCell.x,
    y: topCell.y,
    w,
    h,
    t: topCell.t,
    l: leftCell.l,
    r: rightCell.r,
    b: bottomCell.b,
    cx: (leftCell.l + w) / 2,
    cy: (topCell.t + h) / 2,
    cells,
  };
};

export default {
  area,
  areaByCell,
};
