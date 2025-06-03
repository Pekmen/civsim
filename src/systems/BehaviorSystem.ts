import {
  type Behavior,
  type Position,
  type Speed,
  type MoveTarget,
  type BoundingBox,
  createMoveTarget,
} from '../components';
import { System, type SystemUpdateParams } from '../core';
import { randomPositionInBounds } from '../utils';

export class BehaviorSystem extends System {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super('BehaviorSystem');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update({ entityManager }: SystemUpdateParams): void {
    const entities = entityManager.query(['Behavior']);

    for (const entity of entities) {
      const behavior = entity.get<Behavior>('Behavior');
      const pos = entity.get<Position>('Position');
      const speed = entity.get<Speed>('Speed');
      const moveTarget = entity.get<MoveTarget>('MoveTarget');
      const boundingBox = entity.get<BoundingBox>('BoundingBox');

      switch (behavior?.current) {
        case 'idle':
          entity.remove('MoveTarget');
          break;
        case 'wandering':
          if (!moveTarget && boundingBox && pos && speed) {
            const { width, height } = boundingBox;
            const randomPos = randomPositionInBounds(
              width,
              height,
              this.canvasWidth - width,
              this.canvasHeight - height,
            );
            entity.add(createMoveTarget({ x: randomPos.x, y: randomPos.y }));
          }
          break;

        default:
          break;
      }
    }
  }
}
