import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import type { Position } from '../components/Position';
import type { Velocity } from '../components/Velocity';
import type { Speed } from '../components/Speed';
import type { MoveTarget } from '../components/MoveTarget';

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

      if (!pos || !vel || !speed) continue;

      if (target) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;

        const distance = Math.hypot(dx, dy);

        if (distance > TARGET_PROXIMITY_TRESHOLD) {
          vel.vx = (dx / distance) * speed.value;
          vel.vy = (dy / distance) * speed.value;
        } else {
          // target reached
          vel.vx = 0;
          vel.vy = 0;
          entity.remove('MoveTarget');
        }
      } else {
        // no target, stay in place
        vel.vx = 0;
        vel.vy = 0;
      }

      const dt = deltaTime / 1000;
      const length = Math.hypot(vel.vx, vel.vy);

      if (length > 0) {
        pos.x += (vel.vx / length) * dt * speed.value;
        pos.y += (vel.vy / length) * dt * speed.value;
      }
    }
  }
}
