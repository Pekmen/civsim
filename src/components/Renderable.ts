import type { Component } from '../core';
import type { Position } from '.';

export type RenderFunction = ({
  context,
  position,
}: {
  context: CanvasRenderingContext2D;
  position: Position;
}) => void;

export interface Renderable extends Component {
  readonly name: 'Renderable';
  render: RenderFunction;
}

export const createRenderable = (render: RenderFunction): Renderable => ({
  name: 'Renderable',
  render,
});
