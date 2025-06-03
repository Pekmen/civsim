import type { EntityManager } from '.';

export type SystemName = string;
export type SystemUpdateParams = {
  entityManager: EntityManager;
  deltaTime: number;
};

export abstract class System {
  readonly name: SystemName;

  constructor(name: SystemName) {
    this.name = name;
  }

  abstract update({ entityManager, deltaTime }: SystemUpdateParams): void;
}
