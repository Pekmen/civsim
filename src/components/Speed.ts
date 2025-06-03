import type { Component } from '../core';

export interface Speed extends Component {
  readonly name: 'Speed';
  value: number;
}

export const createSpeed = (value: number): Speed => ({
  name: 'Speed',
  value,
});
