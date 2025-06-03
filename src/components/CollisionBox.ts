import type { Box } from '.';

export interface CollisionBox extends Box {
  readonly name: 'CollisionBox';
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export const createCollisionBox = ({
  offsetX = 0,
  offsetY = 0,
  width = 0,
  height = 0,
}): CollisionBox => ({
  name: 'CollisionBox',
  offsetX,
  offsetY,
  width,
  height,
});
