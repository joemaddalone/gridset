const piece = ({ x, y, w, h }, className, id) => {
  const p = document.createElement('div');
  p.style.height = `${h}px`;
  p.style.width = `${w}px`;
  p.style.top = `${y}px`;
  p.style.left = `${x}px`;
  p.className = className;
  p.id = id ? id : `${x}-${y}-html`;
  return p;
};

const addPiece = (positions, container) => {
  let anim;
  clearInterval(anim);
  const id = `html__${Math.random()}`;
  const p = positions.next().value;
  const pc = piece(positions.next().value, 'position red', id);
  container.appendChild(pc);
  anim = setInterval(() => {
    try {
      const np = positions.next().value;
      const o = document.getElementById(id);
      o.style.left = np.x + 'px';
      o.style.top = np.y + 'px';
    } catch (err) {}
  }, 50);
};

export const html = (grid, container, showGrid) => {
  container.querySelectorAll('div').forEach((r) => r.remove());
  if (showGrid) {
    grid.cells.forEach((c, ci) => {
      c.forEach((r, ri) => {
        const p = piece(r, 'position', `${ci}-${ri}-html`);
        container.appendChild(p);
      });
    });
  }
  addPiece(grid.bounce(), container);
};
