import type { CollisionBox } from '../components/CollisionBox';
import type { Position } from '../components/Position';
import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import { getAABB } from '../utils/collision';

export class CollisionSystem extends System {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super('CollisionSystem');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update(entityManager: EntityManager): void {
    const entites = entityManager.query(['CollisionBox', 'Position']);

    for (const entity of entites) {
      const collisionBox = entity.get<CollisionBox>('CollisionBox');
      const pos = entity.get<Position>('Position');

      if (!collisionBox || !pos) continue;

      const { left, top, right, bottom } = getAABB(pos, collisionBox);

      if (left < 0) {
        pos.x = -collisionBox.offsetX;
      }

      if (top < 0) {
        pos.y = -collisionBox.offsetY;
      }

      if (right > this.canvasWidth) {
        pos.x = this.canvasWidth - collisionBox.width - collisionBox.offsetX;
      }

      if (bottom > this.canvasHeight) {
        pos.y = this.canvasHeight - collisionBox.height - collisionBox.offsetY;
      }
    }
  }
}
