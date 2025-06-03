import type { Position } from '.';
import type { Component } from '../core';

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

export const createRenderable = (render: RenderFunction) => ({
  name: 'Renderable',
  render,
});
