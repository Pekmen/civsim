import type {
  GatherTarget,
  Position,
  Resource,
  ResourceGatherer,
  ResourceInventory,
} from '../components';
import {
  Entity,
  EntityManager,
  System,
  type SystemUpdateParams,
} from '../core';

export class ResourceGatheringSystem extends System {
  constructor() {
    super('ResourceGatheringSystem');
  }

  update({ entityManager, deltaTime }: SystemUpdateParams): void {
    const entities = entityManager.query([
      'ResourceGatherer',
      'Position',
      'ResourceInventory',
    ]);

    for (const entity of entities) {
      const gatherer = entity.get<ResourceGatherer>('ResourceGatherer');
      const position = entity.get<Position>('Position');
      const inventory = entity.get<ResourceInventory>('ResourceInventory');
      const gatherTarget = entity.get<GatherTarget>('GatherTarget');

      if (!gatherer || !position || !inventory) continue;

      if (gatherTarget) {
        this.gatherResource({
          entity,
          gatherTarget,
          entityManager,
          deltaTime,
        });
      }
    }
  }

  private gatherResource({
    entity,
    gatherTarget,
    entityManager,
    deltaTime,
  }: {
    entity: Entity;
    gatherTarget: GatherTarget;
    entityManager: EntityManager;
    deltaTime: number;
  }): void {
    const targetEntity = entityManager
      .getAll()
      .find((e) => e.id === gatherTarget.targetEntityId);
    if (!targetEntity) {
      entity.remove('GatherTarget');
      return;
    }

    const gathererPos = entity.get<Position>('Position');
    const targetPos = targetEntity.get<Position>('Position');
    const gatherer = entity.get<ResourceGatherer>('ResourceGatherer');
    const inventory = entity.get<ResourceInventory>('ResourceInventory');
    const targetResource = targetEntity.get<Resource>('Resource');

    if (
      !gathererPos ||
      !targetPos ||
      !gatherer ||
      !inventory ||
      !targetResource
    )
      return;

    const distance = Math.hypot(
      targetPos.x - gathererPos.x,
      targetPos.y - gathererPos.y,
    );

    if (distance <= gatherer.gatherRange) {
      const gatherAmount = (gatherer.gatherRate * deltaTime) / 1000;
      const actualGathered = Math.min(gatherAmount, targetResource.amount);

      const currentAmount =
        inventory.resources.get(targetResource.resourceType) ?? 0;
      const spaceAvailable =
        inventory.capacity -
        Array.from(inventory.resources.values()).reduce(
          (sum, amount) => sum + amount,
          0,
        );
      const canGather = Math.min(actualGathered, spaceAvailable);

      if (canGather > 0) {
        inventory.resources.set(
          targetResource.resourceType,
          currentAmount + canGather,
        );

        targetResource.amount -= canGather;

        if (targetResource.amount <= 0) {
          entityManager.remove(targetEntity);
          entity.remove('GatherTarget');
        }
      } else {
        entity.remove('GatherTarget');
      }
    }
  }
}
