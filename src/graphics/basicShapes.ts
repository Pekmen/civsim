import type { Position } from '../components/Position';
import type { RenderFunction } from '../components/Renderable';

export const createRectRenderer = (
  width = 100,
  height = 100,
  fillStyle = '#333',
): RenderFunction => {
  return (context: CanvasRenderingContext2D, position: Position) => {
    context.save();

    context.fillStyle = fillStyle;
    context.fillRect(position.x, position.y, height, width);

    context.restore();
  };
};

export const createCircleRenderer = (
  radius = 50,
  fillStyle = '#333',
): RenderFunction => {
  return (context: CanvasRenderingContext2D, position: Position) => {
    context.save();
    context.fillStyle = fillStyle;
    context.beginPath();
    context.arc(
      position.x + radius,
      position.y + radius,
      radius,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();
  };
};
