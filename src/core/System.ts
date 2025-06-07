import type { EntityManager } from '.';

export type SystemType = string;
export type SystemUpdateParams = {
  entityManager: EntityManager;
  deltaTime: number;
};

export abstract class System {
  readonly type: SystemType;

  constructor(type: SystemType) {
    this.type = type;
  }

  abstract update({ entityManager, deltaTime }: SystemUpdateParams): void;
}
