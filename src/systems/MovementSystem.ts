import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import type { Position } from '../components/Position';
import type { Velocity } from '../components/Velocity';
import type { Speed } from '../components/Speed';

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

      if (!pos || !vel || !speed) continue;

      const length = Math.hypot(vel.vx, vel.vy);
      if (length === 0) continue;

      const dt = deltaTime / 1000;

      pos.x += (vel.vx / length) * dt * speed.value;
      pos.y += (vel.vy / length) * dt * speed.value;
    }
  }
}
