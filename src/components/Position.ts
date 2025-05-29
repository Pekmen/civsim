import type { Component } from '../core/Component';

// @TODO: still not sure if this is the best approach
export interface Position extends Component {
  readonly name: 'position';
  x: number;
  y: number;
}

export const createPosition = (x: number, y: number): Position => ({
  name: 'position',
  x,
  y,
});
