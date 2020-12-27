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

export const text = (grid, container, showGrid) => {
  let anim;
  clearInterval(anim);

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

  const b = grid.bounce();
  anim = setInterval(() => {
    try {
      const { ri, ci } = b.next().value;
      const temp = JSON.parse(JSON.stringify(t));
      const str = temp[ri];
      temp[ri] = str.replaceAt(ci, 'X');
      pre.textContent = temp.join('\n');
    } catch (err) {}
  }, 50);
};
