import { colors } from '../colors';
import type { Position, RenderFunction } from '../components';

export const createHouseRenderer = (): RenderFunction => {
  return ({
    context,
    position,
  }: {
    context: CanvasRenderingContext2D;
    position: Position;
  }) => {
    context.save();

    context.translate(position.x, position.y);

    context.fillStyle = colors.graphics.house.walls;
    context.fillRect(-30, -20, 60, 40);

    context.restore();
  };
};
