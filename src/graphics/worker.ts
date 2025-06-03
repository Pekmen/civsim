import type { Position } from '../components';

export const createWorkerRenderer = () => {
  return (context: CanvasRenderingContext2D, pos: Position) => {
    context.save();

    context.translate(pos.x, pos.y);

    context.fillStyle = '#FFA652';
    context.fillRect(-3, -6, 6, 12);

    context.restore();
  };
};
