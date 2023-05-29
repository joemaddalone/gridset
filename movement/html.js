export const html = (grid, container, showGrid = true, mover) => {
	const clear = () => {
	  container.querySelectorAll('div').forEach((r) => r.remove());
	};
  
	const drawGrid = () => {
	  grid.cells.forEach((c, ci) => {
		c.forEach((r, ri) => {
		  container.appendChild(box(r, 'position', `${ci}-${ri}-html`));
		});
	  });
	};
  
	const box = ({ x, y, w, h }, className, id) => {
	  const p = document.createElement('div');
	  p.style.height = `${h}px`;
	  p.style.width = `${w}px`;
	  p.style.top = `${y}px`;
	  p.style.left = `${x}px`;
	  p.className = className;
	  p.id = id ? id : `${x}-${y}-html`;
	  return p;
	};
  
	const movable = (positions, container) => {
	  let anim;
	  clearInterval(anim);
	  const id = `html__${Math.random()}`;
	  const p = positions.next().value.el;
	  container.appendChild(box(positions.next().value.el, 'position red', id));
	  anim = setInterval(() => {
		try {
		  const np = positions.next().value.el;
		  const o = document.getElementById(id);
		  o.style.left = np.x + 'px';
		  o.style.top = np.y + 'px';
		} catch (err) {}
	  }, 50);
	};
  
	clear();
	if (showGrid) {
	  drawGrid();
	}
	movable(mover, container);
  };
  