function chunkString(str, length) {
	return str.match(new RegExp('.{1,' + length + '}', 'g'));
  }
  
  String.prototype.replaceAt = function (index, replacement) {
	return (
	  this.substr(0, index) +
	  replacement +
	  this.substr(index + replacement.length)
	);
  };
  
  export const text = (grid, container, showGrid = true, mover) => {
	let lastTime = 0;
	const fps = 30;
	const nextFrame = 1000 / fps;
	let timer = 0;
  
	const existingPre = document.getElementById('text-ex');
	if (existingPre) {
	  existingPre.remove();
	}
  
	const pre = document.createElement('pre');
	pre.id = 'text-ex';
	container.insertBefore(pre, container.firstChild);
  
	const textArray = [];
	const count = grid.colCount * grid.rowCount;
	const gridChar = showGrid ? `·` : ' ';
	const s = gridChar.repeat(count);
	const t = chunkString(s, grid.colCount);
	pre.textContent = t.join('\n');
  
	const anim = (timeStamp) => {
	  const deltaTime = timeStamp - lastTime;
	  lastTime = timeStamp;
	  if (timer > nextFrame) {
		try {
		  const { ri, ci } = mover.next().value.el;
		  const temp = JSON.parse(JSON.stringify(t));
		  const str = temp[ri];
		  temp[ri] = str.replaceAt(ci, 'X');
		  pre.textContent = temp.join('\n');
		} catch (err) {}
		timer = 0;
	  } else {
		timer += deltaTime;
	  }
	  requestAnimationFrame(anim);
	};
  
	anim(0);
  };
  