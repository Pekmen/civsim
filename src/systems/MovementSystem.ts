import type {
  Position,
  Velocity,
  Speed,
  MoveTarget,
  CollisionCorrection,
} from '../components';
import { System, EntityManager } from '../core';

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
      const collisionCorrection = entity.get<CollisionCorrection>(
        'CollisionCorrection',
      );

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
      if (collisionCorrection) {
        vel.vx += collisionCorrection.velocityCorrectionX;
        vel.vy += collisionCorrection.velocityCorrectionY;
      }

      // normalize and calculate next position
      const dt = deltaTime / 1000;
      const length = Math.hypot(vel.vx, vel.vy);

      if (length > 0) {
        pos.x += (vel.vx / length) * dt * speed.value;
        pos.y += (vel.vy / length) * dt * speed.value;
      }

      // override position if there is colision
      if (collisionCorrection) {
        pos.x += collisionCorrection.positionCorrectionX;
        pos.y += collisionCorrection.positionCorrectionY;

        entity.remove('CollisionCorrection');
      }
    }
  }
}
