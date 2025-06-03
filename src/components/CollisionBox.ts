import type { Box } from '.';

export interface CollisionBox extends Box {
  readonly name: 'CollisionBox';
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export const createCollisionBox = (
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
): CollisionBox => ({
  name: 'CollisionBox',
  offsetX,
  offsetY,
  width,
  height,
});
