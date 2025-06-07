export interface MoveTarget {
  readonly type: 'MoveTarget';
  x: number;
  y: number;
}

export const createMoveTarget = ({ x = 0, y = 0 }): MoveTarget => ({
  type: 'MoveTarget',
  x,
  y,
});
