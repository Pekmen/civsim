import type { Component } from '../core';

export interface Position extends Component {
  readonly name: 'Position';
  x: number;
  y: number;
}

export const createPosition = ({ x = 0, y = 0 }): Position => ({
  name: 'Position',
  x,
  y,
});
