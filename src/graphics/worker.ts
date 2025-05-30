import type { Position } from '../components/Position';

export const createWorkerRenderer = () => {
  return (context: CanvasRenderingContext2D, pos: Position) => {
    context.save();

    context.translate(pos.x, pos.y);
    // Draw shadow
    context.fillStyle = 'rgba(0,0,0,0.3)';
    context.fillRect(-3, 2, 6, 2);

    // Draw person body
    context.fillStyle = '#8B4513';
    context.fillRect(-3, -6, 6, 8);

    // Draw head
    context.fillStyle = '#FFDBAC';
    context.fillRect(-2, -8, 4, 4);

    context.restore();
  };
};
