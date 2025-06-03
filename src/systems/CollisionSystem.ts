import {
  type Behavior,
  type CollisionBox,
  createCollisionCorrection,
  type Position,
} from '../components';
import { System, type SystemUpdateParams } from '../core';
import type { AABB } from '../types';
import {
  aabbIntersects,
  getAABB,
  getOutOfBoundsCorrection,
  isAABBInside,
} from '../utils';

export class CollisionSystem extends System {
  private canvasAABB: AABB;

  constructor(canvasAABB: AABB) {
    super('CollisionSystem');

    this.canvasAABB = canvasAABB;
  }

  update({ entityManager }: SystemUpdateParams): void {
    const entities = entityManager.query(['CollisionBox', 'Position']);

    for (const entity of entities) {
      const collisionBox = entity.get<CollisionBox>('CollisionBox');
      const pos = entity.get<Position>('Position');
      const behavior = entity.get<Behavior>('Behavior');

      if (!collisionBox || !pos) continue;

      const entityAABB = getAABB(pos, collisionBox);

      // entities collision
      // initial bruteforce implementation
      for (const otherEntity of entities) {
        if (entity.id === otherEntity.id) continue;

        const otherEntityPos = otherEntity.get<Position>('Position');
        const otherEntityCollisionBox =
          otherEntity.get<CollisionBox>('CollisionBox');

        if (otherEntityPos && otherEntityCollisionBox) {
          const otherEntityAABB = getAABB(
            otherEntityPos,
            otherEntityCollisionBox,
          );

          const isColliding = aabbIntersects(entityAABB, otherEntityAABB);

          // basic avoidance, will be improved
          if (isColliding && behavior?.current !== 'idle') {
            // Calculate direction from obstacle to entity

            const dx = pos.x - otherEntityPos.x;
            const dy = pos.y - otherEntityPos.y;
            const distance = Math.hypot(dx, dy);

            if (distance > 0) {
              // Push away from obstacle
              const pushStrength = 0.5;
              const pushX = (dx / distance) * pushStrength;
              const pushY = (dy / distance) * pushStrength;

              entity.add(
                createCollisionCorrection({
                  positionCorrectionX: pushX,
                  positionCorrectionY: pushY,
                }),
              );
            }
          }
        }
      }

      const isOutOfCanvasBounds = !isAABBInside(entityAABB, this.canvasAABB);

      // Canvas bounds collision
      if (isOutOfCanvasBounds) {
        const collisionCorrection = getOutOfBoundsCorrection(
          entityAABB,
          this.canvasAABB,
        );
        entity.add(collisionCorrection);
      }
    }
  }
}
