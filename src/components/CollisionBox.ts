import type { Component } from '../core/Component';

export interface CollisionBox extends Component {
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
