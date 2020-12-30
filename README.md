## 👷🏼‍♂️ this is a work in progress

# gridset

An imaginary grid to make positioning and moving things easier.

## Install.

`npm i gridset // not yet published so like nvm`

## Setup

```js
import { Gridset } from 'gridset';

const grid = new Gridset({
  width: 200,  // <-- width of the grid
  height: 200, // <-- height of the grid
  rows: 5,     // <-- number of rows
  cols: 5      // <-- number of columns
})
```

You now have a Gridset. It looks like this:

```
┌─────┬─────┬─────┬─────┬─────┐
│ 0,0 │ 1,0 │ 2,0 │ 3,0 │ 4,0 │
├─────┼─────┼─────┼─────┼─────┤
│ 0,1 │ 1,1 │ 2,1 │ 3,1 │ 4,1 │
├─────┼─────┼─────┼─────┼─────┤
│ 0,2 │ 1,2 │ 2,2 │ 3,2 │ 4,2 │
├─────┼─────┼─────┼─────┼─────┤
│ 0,3 │ 1,3 │ 2,3 │ 3,3 │ 4,3 │
├─────┼─────┼─────┼─────┼─────┤
│ 0,4 │ 1,4 │ 2,4 │ 3,4 │ 4,4 │
└─────┴─────┴─────┴─────┴─────┘
Fun fact: this example was made with Gridset.
```

But Gridset does not actually render a grid. That part is up to you if you want
to and it's easy.

## Get a cell

The imaginary cells generated by Gridset is can be located by column and row
indexes. So the first cell in our grid above is identified by `.cell(0,0)` -
that's the cell at column 0, row 0.

When you retrieve a cell it looks like this:

```
{
  x:  x coordinate of the cell,
  y:  y coordinate of the cell,
  w:  width of the cell,
  h:  height of the cell,
  t:  top coordinate of the cell,
  l:  left coordinate of the cell,
  r:  right coordinate of the cell
  b:  bottom coordinate of the cell,
  cx: center x coordinate of the cell,
  cy: center y coordinate of the cell,
  ri: row index of the cell,
  ci: column index of the cell,
}
```

It is important to note that none of these are measured in pixels or inches or
any other arbitrary unit. These are calculated values based on the parameters
you used to initialize Gridset. Namely width, height, cols, and rows.

## Get a column

You can select an entire column of cells from your Gridset by calling
`.col(columnIndex)`.

When you retrieve a column it looks like this:

```
{
  x:  x coordinate of the column,
  y:  y coordinate of the column,
  w:  width of the column,
  h:  height of the column,
  t:  top coordinate of the column,
  l:  left coordinate of the column,
  r:  right coordinate of the column
  b:  bottom coordinate of the column,
  cx: center x coordinate of the column,
  cy: center y coordinate of the column,
  ci: index of the column,
  cells: an array of the cells in the column
}
```

## Get a row

You can select an entire row of cells from your Gridset by calling
`.row(rowIndex)`.

When you retrieve a row it looks like this:

```
{
  x:  x coordinate of the row,
  y:  y coordinate of the row,
  w:  width of the row,
  h:  height of the row,
  t:  top coordinate of the row,
  l:  left coordinate of the row,
  r:  right coordinate of the row
  b:  bottom coordinate of the row,
  cx: center x coordinate of the row,
  cy: center y coordinate of the row,
  ci: index of the row,
  cells: an array of the cells in the row
}
```

## Get an area

An area is a group of cells defined by any two cells and composed of all the
cells between them.

So an area made of cell 1,2 and cell 3,3 would look like this

```
┌─────┬─────┬─────┬─────┬─────┐
│ 0,0 │ 1,0 │ 2,0 │ 3,0 │ 4,0 │
├─────┼─────┼─────┼─────┼─────┤
│ 0,1 │ 1,1 │ 2,1 │ 3,1 │ 4,1 │
├─────┼─────┴─────┴─────┼─────┤
│ 0,2 │                 │ 4,2 │
├─────┤      area       ├─────┤
│ 0,3 │                 │ 4,3 │
├─────┼─────┬─────┬─────┼─────┤
│ 0,4 │ 1,4 │ 2,4 │ 3,4 │ 4,4 │
└─────┴─────┴─────┴─────┴─────┘
Fun fact: this example was made with Gridset.
```

You can select a group of cells from your Gridset by calling _.area_ or
_.areaByCells_. with cells that define two of the corners of the area you want
to select in no particular order.

`.areaByCells(cell1, cell2)` takes two cell objects, but it's really only
concerned about the `ri` and `ci` properties of each of them so if you don't
already have the cells you can use `.area({ci1: 1, ri1: 2, ci2: 3 ri2: 3})` and
the result will be the same.

When you retrieve an area it looks like this:

```
{
  x:  x coordinate of the area,
  y:  y coordinate of the area,
  w:  width of the area,
  h:  height of the area,
  t:  top coordinate of the area,
  l:  left coordinate of the area,
  r:  right coordinate of the area
  b:  bottom coordinate of the area,
  cx: center x coordinate of the area,
  cy: center y coordinate of the area,
  cells: a 2d array of the cells in the area (sub-grid)
}
```

## Set cell width and height.

Our grid is defined by width, height, number of columns and rows. Simple. But
wait - there's more!

You can make the cells of the grid any size you want... even if they are bigger
than the grid itself - which can get weird, but hey it's your grid.

Our 5 column grid looks like this

```js
const grid = new Gridset({
  width: 200,
  height: 200,
  rows: 5,
  cols: 5
});
```

```
 0        40       80      120      160      200
 └────────┴────────┴────────┴────────┴────────┘
 ┌────────┬────────┬────────┬────────┬────────┐
 │    0   │    1   │    2   │    3   │    4   │ <- Row 0
 └────────┴────────┴────────┴────────┴────────┘
```

Here each the grid has been evenly divided into columns of 40 wide.

Let's add cellWidth.

```js
const grid = new Gridset({
  width: 200,
  height: 200,
  rows: 5,
  cols: 5  
  cellWidth: 60
});
```

```
 0           60      95      130     165      200
 └────────────┴───────┴───────┴───────┴───────┘
 ┌────────────¦───────¦───────¦───────¦───────┐
 │            ¦       ¦       ¦       ¦       │  <- Row 0
 └────────────¦───────¦───────¦───────¦───────┘
 │            ¦       ¦       ¦       ¦       ¦
 │    col0    ¦       ¦       ¦       ¦       ¦
 ├────────────┘       ¦       ¦       ¦       ¦
 ¦        │           ¦       ¦       ¦       ¦
 ¦        │   col1    ¦       ¦       ¦       ¦
 0        ├───────────┘       ¦       ¦       ¦
          ¦       │           ¦       ¦       ¦
          ¦       │   col2    ¦       ¦       ¦
  		 35       ├───────────┘       ¦       ¦
                  ¦       │           ¦       ¦
                  ¦       │    col3   ¦       ¦
                 70       ├───────────┘       ¦
                          ¦       │           ¦
                          ¦       │   col4    ¦
                         105      ├───────────┘
                                  ¦
                                  ¦
								 140
```

Our grid still has the correct width while respecting the custom cellWidth.  In order to achieve this our columns/cells now overlap.  And it works the same way with setting `cellHeight`