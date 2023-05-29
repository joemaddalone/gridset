export const svg = (grid, container, showGrid = true, mover) => {
	const clear = () => {
	  container.querySelectorAll('rect').forEach((r) => r.remove());
	};
  
	const drawGrid = () => {
	  grid.cells.forEach((c, ci) => {
		c.forEach((r, ri) => {
		  container.appendChild(box(r, 'position', `${ci}-${ri}-svg`));
		});
	  });
	};
  
	const box = ({ x, y, w, h }, className, id) => {
	  const p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	  p.setAttribute('width', w);
	  p.setAttribute('height', h);
	  p.setAttribute('x', x);
	  p.setAttribute('y', y);
	  p.setAttribute('class', className);
	  p.id = id ? id : `${x}-${y}-svg`;
	  return p;
	};
  
	const movable = (positions, container) => {
	  let anim;
	  clearInterval(anim);
	  const id = `svg__${Math.random()}`;
	  const p = positions.next().value.el;
	  container.appendChild(box(positions.next().value.el, 'position red', id));
	  anim = setInterval(() => {
		try {
		  const np = positions.next().value.el;
		  const o = document.getElementById(id);
		  o.setAttribute('x', np.x);
		  o.setAttribute('y', np.y);
		} catch (err) {}
	  }, 50);
	};
  
	clear();
	if (showGrid) {
	  drawGrid();
	}
	movable(mover, container);
  };
  