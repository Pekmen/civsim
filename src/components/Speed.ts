import type { Component } from '../core';

export interface Speed extends Component {
  readonly type: 'Speed';
  value: number;
}

export const createSpeed = (value: number): Speed => ({
  type: 'Speed',
  value,
});
