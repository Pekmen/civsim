import type { Box } from './Box';

export interface BoundingBox extends Box {
  readonly name: 'BoundingBox';
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export const createBoundingBox = (
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
): BoundingBox => ({
  name: 'BoundingBox',
  offsetX,
  offsetY,
  width,
  height,
});
