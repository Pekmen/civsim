import type { Size } from '../components/Size';
import type { Position } from '../components/Position';
import type { RenderFunction } from '../components/Renderable';

export const createRectRenderer = (fillStyle = '#333'): RenderFunction => {
  return (context: CanvasRenderingContext2D, pos: Position, size: Size) => {
    context.save();
    context.fillStyle = fillStyle;
    context.fillRect(
      pos.x - size.width / 2,
      pos.y - size.height / 2,
      size.width,
      size.height,
    );
    context.restore();
  };
};
