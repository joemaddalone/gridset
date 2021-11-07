const diagonal = function (ci, ri) {
  const cells = this.flatCells;
  const dCells = cells.filter((c) => ci - c.ci === ri - c.ri);
  return dCells;
};
const antidiagonal = function (ci, ri) {
  const cells = this.flatCells;
  return cells.filter((c) => {
    if (ci === c.ci && ri === c.ri) {
      return true; // this is our cell.
    }
    const cResult = ci - c.ci;
    const rResult = ri - c.ri;
    if (cResult < 0 || rResult < 0) {
      // one of them must be negative
      return Math.min(cResult, rResult) === Math.max(cResult, rResult) * -1;
    } else {
      return false;
    }
  });
};

export default {
  diagonal,
  antidiagonal,
};
