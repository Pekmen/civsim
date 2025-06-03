import type { Position } from '../components';

export const createHouseRenderer = () => {
  return (context: CanvasRenderingContext2D, pos: Position) => {
    context.save();

    context.translate(pos.x, pos.y);

    context.fillStyle = '#645452';
    context.fillRect(-30, -20, 60, 40);

    context.restore();
  };
};
