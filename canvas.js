const piece = ({ x, y, w, h }, context) => {
  context.strokeStyle = '#eee';
  context.strokeRect(x, y, w, h);
};

const addPiece = (p, context) => {
  const props = p.next().value;
  context.fillStyle = 'red';
  context.fillRect(props.x, props.y, props.w, props.h);
};

export const canvas = (grid, container, showGrid = true, mover) => {
  let now, then, delta, rfnId;

  const existingCanvas = document.getElementById('canvas-ex');
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'canvas-ex';
  canvas.width = grid.width;
  canvas.height = grid.height;
  container.insertBefore(canvas, container.firstChild);

  const fps = 20;
  const interval = 1000 / fps;
  const context = canvas.getContext('2d');
  const memGrid = document.createElement('canvas');
  const gridContext = memGrid.getContext('2d');
  context.width = grid.width;
  context.height = grid.height;
  context.clearRect(0, 0, grid.width, grid.height);
  memGrid.width = grid.width;
  memGrid.height = grid.height;

  grid.cells.forEach((c, ci) => {
    c.forEach((r, ri) => {
      piece(r, gridContext);
    });
  });
  try {
    if (rfnId) {
      cancelRequestAnimation(rfnId);
    }
  } catch (err) {}

  const bounce = (now) => {
    if (!then) {
      then = now;
    }
    rfnId = requestAnimationFrame(bounce);
    delta = now - then;
    if (delta > interval) {
      context.clearRect(0, 0, grid.width, grid.height);
      if (showGrid) {
        context.drawImage(memGrid, 0, 0, grid.width, grid.height);
      }
      addPiece(mover, context);
      then = now - (delta % interval);
    }
  };
  cancelAnimationFrame(rfnId);

  rfnId = requestAnimationFrame(bounce);
};
