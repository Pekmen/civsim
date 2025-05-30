import type { Component } from '../core/Component';
import type { Position } from './Position';

export type RenderFunction = (
  ctx: CanvasRenderingContext2D,
  position: Position,
) => void;

export interface Renderable extends Component {
  readonly name: 'Renderable';
  render: RenderFunction;
}

export const createRenderable = (render: RenderFunction) => ({
  name: 'Renderable',
  render,
});
