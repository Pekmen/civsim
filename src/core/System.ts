import type { EntityManager } from './EntityManager';

export type SystemName = string;

export abstract class System {
  readonly name: SystemName;

  constructor(name: SystemName) {
    this.name = name;
  }

  abstract update(entityManager: EntityManager, deltaTime: number): void;
}
