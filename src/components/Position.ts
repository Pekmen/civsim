import type { Component } from '../core/Component';

export interface Position extends Component {
  readonly name: 'Position';
  x: number;
  y: number;
}

export const createPosition = (x: number, y: number): Position => ({
  name: 'Position',
  x,
  y,
});
