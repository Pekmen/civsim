import type { Component } from '../core';

export interface CollisionCorrection extends Component {
  readonly name: 'CollisionCorrection';
  positionCorrectionX: number;
  positionCorrectionY: number;
  velocityCorrectionX: number;
  velocityCorrectionY: number;
}

export const createCollisionCorrection = (
  positionCorrectionX = 0,
  positionCorrectionY = 0,
  velocityCorrectionX = 0,
  velocityCorrectionY = 0,
): CollisionCorrection => ({
  name: 'CollisionCorrection',
  positionCorrectionX,
  positionCorrectionY,
  velocityCorrectionX,
  velocityCorrectionY,
});
