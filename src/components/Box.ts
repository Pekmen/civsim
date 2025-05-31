import type { Component } from '../core/Component';

export interface Box extends Component {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}
