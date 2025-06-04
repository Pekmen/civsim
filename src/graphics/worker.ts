import { colors } from '../colors';
import type { Position, RenderFunction } from '../components';

export const createWorkerRenderer = (): RenderFunction => {
  return ({
    context,
    position,
  }: {
    context: CanvasRenderingContext2D;
    position: Position;
  }) => {
    context.save();

    context.translate(position.x, position.y);

    context.fillStyle = colors.graphics.worker.body;
    context.fillRect(-3, -6, 6, 12);

    context.restore();
  };
};
