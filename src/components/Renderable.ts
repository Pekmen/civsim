import type { Component } from '../core/Component';
import type { Position } from './Position';

export type RenderFunction = (
  ctx: CanvasRenderingContext2D,
  position: Position,
) => void;

export interface Renderable extends Component {
  readonly name: 'renderable';
  render: RenderFunction;
  visible: boolean;
}

export const createRenderable = (render: RenderFunction, visible = true) => ({
  name: 'renderable',
  render,
  visible,
});
