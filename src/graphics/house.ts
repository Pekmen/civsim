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

    context.fillStyle = '#645452';
    context.fillRect(-30, -20, 60, 40);

    context.restore();
  };
};
