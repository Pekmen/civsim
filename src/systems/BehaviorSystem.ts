import type { Behavior } from '../components/Behavior';
import type { MoveIntent } from '../components/MoveIntent';
import type { EntityManager } from '../core/EntityManager';
import { System } from '../core/System';

export class BehaviorSystem extends System {
  constructor() {
    super('BehaviorSystem');
  }

  update(entityManager: EntityManager): void {
    const entities = entityManager.query(['Behavior']);

    for (const entity of entities) {
      const behavior = entity.get<Behavior>('Behavior');
      const moveIntent = entity.get<MoveIntent>('MoveIntent');

      switch (behavior?.current) {
        case 'idle':
          if (moveIntent) {
            moveIntent.dx = 0;
            moveIntent.dy = 0;
          }
          break;
        default:
          break;
      }
    }
  }
}
