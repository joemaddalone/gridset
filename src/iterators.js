const scanner = function* (arr, si) {
  let dir = 'f';
  let index = si ?? -1;
  const end = arr.length - 1;
  while (true) {
    switch (dir) {
      case 'f':
        if (index !== end) {
          index++;
        }
        if (index === end) {
          dir = 'r';
        }
        break;
      case 'r':
        if (index !== 0) {
          index--;
        }
        if (index === 0) {
          dir = 'f';
        }
        break;
    }
    yield arr[index];
  }
};
const bouncer = function* (arr, sx, sy, initMx = 1, initMy = 1) {
  let mx = initMx;
  let my = initMy;
  // // Because the first yield adds mx/my we reduce sx/sy by mx/my.
  let x = sx ? sx - 1 : -1;
  let y = sy ? sy - 1 : -1;
  const w = arr.length - 1;
  const h = arr[0].length - 1;
  while (true) {
    if (mx + x > w || mx + x < 0) {
      mx *= -1;
    }
    if (my + y > h || my + y < 0) {
      my *= -1;
    }
    x = x + mx;
    y = y + my;
    yield arr[x][y];
  }
};
const cycler = function* (arr, d = 'f', si) {
  let index = si ? si - 1 : -1;
  let dir = d || 'f';
  const w = arr.length - 1;
  while (true) {
    if (dir === 'f') {
      if (index === w) {
        index = -1;
      }
      index++;
    } else {
      if (index <= 0) {
        index = w + 1;
      }
      index--;
    }
    yield arr[index];
  }
};

export default {
  scanner,
  bouncer,
  cycler,
};
