const piece = ({ x, y, w, h }, className, id) => {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  p.setAttribute('width', w);
  p.setAttribute('height', h);
  p.setAttribute('x', x);
  p.setAttribute('y', y);
  p.setAttribute('class', className);
  p.id = id ? id : `${x}-${y}-svg`;
  return p;
};

const addPiece = (positions, container) => {
  let anim;
  clearInterval(anim);
  const id = `svg__${Math.random()}`;
  const pc = piece(positions.next().value, 'position red', id);
  container.appendChild(pc);
  anim = setInterval(() => {
    try {
      const np = positions.next().value;
      const o = document.getElementById(id);
      o.setAttribute('x', np.x);
      o.setAttribute('y', np.y);
    } catch (err) {}
  }, 50);
};

export const svg = (grid, container, showGrid = false) => {
  container.setAttribute('width', grid.width);
  container.setAttribute('height', grid.height);
  container.querySelectorAll('rect').forEach((r) => r.remove());
  if (showGrid) {
    grid.cells.forEach((c, ci) => {
      c.forEach((r, ri) => {
        const p = piece(r, 'position', `${ci}-${ri}-svg`);
        container.appendChild(p);
      });
    });
  }

  addPiece(grid.bounce(), container);
};
