export interface MoveTarget {
  readonly name: 'MoveTarget';
  x: number;
  y: number;
}

export const createMoveTarget = (x = 0, y = 0): MoveTarget => ({
  name: 'MoveTarget',
  x,
  y,
});
