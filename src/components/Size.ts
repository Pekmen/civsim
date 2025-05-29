import type { Component } from '../core/Component';

export interface Size extends Component {
  readonly name: 'Size';
  width: number;
  height: number;
}

export const createSize = (width: number, height: number): Size => ({
  name: 'Size',
  width,
  height,
});
