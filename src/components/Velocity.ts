import type { Component } from '../core';

export interface Velocity extends Component {
  readonly name: 'Velocity';
  vx: number;
  vy: number;
}

export const createVelocity = ({ vx = 0, vy = 0 }): Velocity => ({
  name: 'Velocity',
  vx,
  vy,
});
