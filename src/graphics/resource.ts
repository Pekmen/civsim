import { colors } from '../colors';
import type { Position, RenderFunction } from '../components';

export const createResourceDepositRenderer = (): RenderFunction => {
  return ({
    context,
    position,
  }: {
    context: CanvasRenderingContext2D;
    position: Position;
  }) => {
    context.save();

    context.translate(position.x, position.y);

    context.fillStyle = colors.graphics.resource.food;
    context.fillRect(-10, -10, 20, 20);

    context.restore();
  };
};
