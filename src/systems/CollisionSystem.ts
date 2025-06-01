import type { CollisionBox } from '../components/CollisionBox';
import type { Position } from '../components/Position';
import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import type { AABB } from '../types';
import {
  getAABB,
  getOutOfBoundsCorrection,
  isAABBInside,
} from '../utils/collision';

export class CollisionSystem extends System {
  private canvasAABB: AABB;

  constructor(canvasAABB: AABB) {
    super('CollisionSystem');

    this.canvasAABB = canvasAABB;
  }

  update(entityManager: EntityManager): void {
    const entites = entityManager.query(['CollisionBox', 'Position']);

    for (const entity of entites) {
      const collisionBox = entity.get<CollisionBox>('CollisionBox');
      const pos = entity.get<Position>('Position');

      if (!collisionBox || !pos) continue;

      const entityAABB = getAABB(pos, collisionBox);

      const hasLeftCanvasBounds = !isAABBInside(entityAABB, this.canvasAABB);

      if (hasLeftCanvasBounds) {
        const collisionResponse = getOutOfBoundsCorrection(
          entityAABB,
          this.canvasAABB,
        );
        entity.add(collisionResponse);
      }
    }
  }
}
