import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import type { Position } from '../components/Position';
import type { Velocity } from '../components/Velocity';
import type { Speed } from '../components/Speed';
import type { MoveTarget } from '../components/MoveTarget';
import type { CollisionResponse } from '../components/CollisionResponse';

const TARGET_PROXIMITY_TRESHOLD = 10;

export class MovementSystem extends System {
  constructor() {
    super('MovementSystem');
  }

  update(entityManager: EntityManager, deltaTime: number): void {
    const entities = entityManager.query(['Position', 'Velocity', 'Speed']);

    for (const entity of entities) {
      const pos = entity.get<Position>('Position');
      const vel = entity.get<Velocity>('Velocity');
      const speed = entity.get<Speed>('Speed');
      const target = entity.get<MoveTarget>('MoveTarget');
      const collisionResponse =
        entity.get<CollisionResponse>('CollisionResponse');

      if (!pos || !vel || !speed) continue;

      // move toward target if present
      if (target) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const distance = Math.hypot(dx, dy);

        if (distance > TARGET_PROXIMITY_TRESHOLD) {
          vel.vx = (dx / distance) * speed.value;
          vel.vy = (dy / distance) * speed.value;
        } else {
          vel.vx = 0;
          vel.vy = 0;
          entity.remove('MoveTarget');
        }
      } else {
        vel.vx = 0;
        vel.vy = 0;
      }

      // update collision velocity
      if (collisionResponse) {
        vel.vx += collisionResponse.velocityCorrectionX;
        vel.vy += collisionResponse.velocityCorrectionY;
      }

      // normalize and calculate next position
      const dt = deltaTime / 1000;
      const length = Math.hypot(vel.vx, vel.vy);

      if (length > 0) {
        pos.x += (vel.vx / length) * dt * speed.value;
        pos.y += (vel.vy / length) * dt * speed.value;
      }

      // override position if there is colision
      if (collisionResponse) {
        pos.x += collisionResponse.positionCorrectionX;
        pos.y += collisionResponse.positionCorrectionY;

        entity.remove('CollisionResponse');
      }
    }
  }
}
