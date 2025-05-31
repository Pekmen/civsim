import type { Behavior } from '../components/Behavior';
import type { BoundingBox } from '../components/BoundingBox';
import { createMoveTarget, type MoveTarget } from '../components/MoveTarget';
import type { Position } from '../components/Position';
import type { Speed } from '../components/Speed';
import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import { randomPositionInBounds } from '../utils/helpers';

export class BehaviorSystem extends System {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super('BehaviorSystem');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update(entityManager: EntityManager): void {
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
            entity.add(createMoveTarget(randomPos.x, randomPos.y));
          }
          break;

        default:
          break;
      }
    }
  }
}
