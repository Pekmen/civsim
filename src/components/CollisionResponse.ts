import type { Component } from '../core/Component';

export interface CollisionResponse extends Component {
  readonly name: 'CollisionResponse';
  positionCorrectionX: number;
  positionCorrectionY: number;
  velocityCorrectionX: number;
  velocityCorrectionY: number;
}

export const createCollisonResponse = (
  positionCorrectionX = 0,
  positionCorrectionY = 0,
  velocityCorrectionX = 0,
  velocityCorrectionY = 0,
): CollisionResponse => ({
  name: 'CollisionResponse',
  positionCorrectionX,
  positionCorrectionY,
  velocityCorrectionX,
  velocityCorrectionY,
});
