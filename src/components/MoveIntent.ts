export interface MoveIntent {
  readonly name: 'MoveIntent';
  dx: number;
  dy: number;
}

export const createMoveintent = (dx = 0, dy = 0): MoveIntent => ({
  name: 'MoveIntent',
  dx,
  dy,
});
