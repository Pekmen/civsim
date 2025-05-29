import type { Component } from '../core/Component';

export interface Speed extends Component {
  readonly name: 'Speed';
  value: number;
}

export const createSpeed = (value: number): Speed => ({
  name: 'Speed',
  value,
});
