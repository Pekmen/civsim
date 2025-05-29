import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';
import type { Position } from '../components/Position';
import type { Velocity } from '../components/Velocity';

export class MovementSystem extends System {
  constructor() {
    super('MovementSystem');
  }

  update(entityManager: EntityManager, deltaTime: number): void {
    const entities = entityManager.query(['Position', 'Velocity']);

    for (const entity of entities) {
      const pos = entity.get<Position>('Position');
      const vel = entity.get<Velocity>('Velocity');

      pos.x += vel.vx * (deltaTime / 1000);
      pos.y += vel.vy * (deltaTime / 1000);
    }
  }
}
