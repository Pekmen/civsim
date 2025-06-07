import type { Box } from '.';

export interface BoundingBox extends Box {
  readonly type: 'BoundingBox';
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export const createBoundingBox = ({
  offsetX = 0,
  offsetY = 0,
  width = 0,
  height = 0,
}): BoundingBox => ({
  type: 'BoundingBox',
  offsetX,
  offsetY,
  width,
  height,
});
