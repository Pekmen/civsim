import type { Component } from '../core/Component';

export interface Velocity extends Component {
  readonly name: 'Velocity';
  vx: number;
  vy: number;
}

export const createVelocity = (vx: number, vy: number): Velocity => ({
  name: 'Velocity',
  vx,
  vy,
});
