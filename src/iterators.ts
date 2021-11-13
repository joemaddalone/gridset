const scanner = function* (arr: any[], dir = 'f', si: number | null) {
  const end = arr.length - 1;
  let index = dir === 'f' ? -1 : end + 1;
  if (si !== null) {
    if (dir === 'f') {
      index = si - 1;
    } else {
      index = si + 1;
    }
  }

  while (true) {
    if (dir === 'f') {
      if (index !== end) {
        index++;
      } else {
        dir = 'r';
        index--;
      }
    } else {
      if (index !== 0) {
        index--;
      } else {
        dir = 'f';
        index++;
      }
    }
    yield arr[index];
  }
};
const bouncer = function* (
  arr: any[],
  sx?: number | null,
  sy?: number | null,
  initMx = 1,
  initMy = 1,
) {
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
const cycler = function* (arr: any[], d = 'f', si: number | null = 0) {
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
