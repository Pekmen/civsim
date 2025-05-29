import type { Component } from '../core/Component';

export interface BoundingBox extends Component {
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
