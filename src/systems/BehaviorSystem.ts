import {
  type Behavior,
  type BoundingBox,
  createDepositTarget,
  createGatherTarget,
  createMoveTarget,
  type DepositTarget,
  type GatherTarget,
  type MoveTarget,
  type Position,
  type Resource,
  type ResourceGatherer,
  type ResourceInventory,
  type Speed,
} from '../components';
import { System, type SystemUpdateParams } from '../core';
import {
  findNearestDeposit,
  findNearestResource,
  randomPositionInBounds,
} from '../utils';

export class BehaviorSystem extends System {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super('BehaviorSystem');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update({ entityManager }: SystemUpdateParams): void {
    const entities = entityManager.query(['Behavior']);

    for (const entity of entities) {
      const behavior = entity.get<Behavior>('Behavior');
      const pos = entity.get<Position>('Position');
      const speed = entity.get<Speed>('Speed');
      const moveTarget = entity.get<MoveTarget>('MoveTarget');
      const boundingBox = entity.get<BoundingBox>('BoundingBox');
      const gatherTarget = entity.get<GatherTarget>('GatherTarget');
      const depositTarget = entity.get<DepositTarget>('DepositTarget');
      const inventory = entity.get<ResourceInventory>('ResourceInventory');

      switch (behavior?.current) {
        case 'idle':
          entity.remove('MoveTarget');
          break;

        case 'wandering':
          if (!moveTarget && boundingBox && pos && speed) {
            const { width, height } = boundingBox;
            const randomPos = randomPositionInBounds({
              left: width,
              top: height,
              right: this.canvasWidth - width,
              bottom: this.canvasHeight - height,
            });
            entity.add(createMoveTarget({ x: randomPos.x, y: randomPos.y }));
          }
          break;

        case 'seeking_resource':
          if (!gatherTarget) {
            const nearestResource = findNearestResource({
              entity,
              entityManager,
            });

            if (nearestResource && pos) {
              const resource = nearestResource.get<Resource>('Resource');
              if (resource) {
                entity.add(
                  createGatherTarget(nearestResource.id, resource.resourceType),
                );

                const resourcePos = nearestResource.get<Position>('Position');
                if (resourcePos) {
                  entity.add(
                    createMoveTarget({ x: resourcePos.x, y: resourcePos.y }),
                  );
                }
              }
            } else {
              const behaviour = entity.get<Behavior>('Behavior');
              if (behaviour) {
                behaviour.current = 'wandering';
              }
            }
          } else {
            const targetEntity = entityManager
              .getAll()
              .find((e) => e.id === gatherTarget.targetEntityId);
            if (targetEntity) {
              const targetPos = targetEntity.get<Position>('Position');
              const gatherer = entity.get<ResourceGatherer>('ResourceGatherer');

              if (targetPos && gatherer && pos) {
                const distance = Math.hypot(
                  targetPos.x - pos.x,
                  targetPos.y - pos.y,
                );

                if (distance > gatherer.gatherRange) {
                  entity.add(
                    createMoveTarget({ x: targetPos.x, y: targetPos.y }),
                  );
                } else {
                  const behaviour = entity.get<Behavior>('Behavior');
                  if (behaviour) {
                    behaviour.current = 'gathering';
                  }
                  entity.remove('MoveTarget');
                }
              }
            } else {
              entity.remove('GatherTarget');
            }
          }
          break;

        case 'gathering':
          entity.remove('MoveTarget');

          if (!gatherTarget) {
            // Check if inventory has resources to deposit
            if (inventory && this.hasResourcesToDeposit(inventory)) {
              const behaviour = entity.get<Behavior>('Behavior');
              if (behaviour) {
                behaviour.current = 'seeking_deposit';
              }
            } else {
              const behaviour = entity.get<Behavior>('Behavior');
              if (behaviour) {
                behaviour.current = 'wandering';
              }
            }
          }
          break;

        case 'seeking_deposit':
          if (!depositTarget && inventory) {
            // Find a resource type to deposit
            const resourceToDeposit = this.getFirstAvailableResource(inventory);

            if (resourceToDeposit) {
              const nearestDeposit = findNearestDeposit({
                entity,
                entityManager,
                resourceType: resourceToDeposit,
              });

              if (nearestDeposit && pos) {
                entity.add(
                  createDepositTarget(nearestDeposit.id, resourceToDeposit),
                );

                const depositPos = nearestDeposit.get<Position>('Position');
                if (depositPos) {
                  entity.add(
                    createMoveTarget({ x: depositPos.x, y: depositPos.y }),
                  );
                }
              } else {
                const behaviour = entity.get<Behavior>('Behavior');
                if (behaviour) {
                  behaviour.current = 'wandering';
                }
              }
            } else {
              const behaviour = entity.get<Behavior>('Behavior');
              if (behaviour) {
                behaviour.current = 'wandering';
              }
            }
          } else if (depositTarget) {
            const targetEntity = entityManager
              .getAll()
              .find((e) => e.id === depositTarget.targetEntityId);

            if (targetEntity) {
              const targetPos = targetEntity.get<Position>('Position');
              const gatherer = entity.get<ResourceGatherer>('ResourceGatherer');

              if (targetPos && gatherer && pos) {
                const distance = Math.hypot(
                  targetPos.x - pos.x,
                  targetPos.y - pos.y,
                );

                if (distance > gatherer.gatherRange) {
                  entity.add(
                    createMoveTarget({ x: targetPos.x, y: targetPos.y }),
                  );
                } else {
                  const behaviour = entity.get<Behavior>('Behavior');
                  if (behaviour) {
                    behaviour.current = 'depositing';
                  }
                  entity.remove('MoveTarget');
                }
              }
            } else {
              entity.remove('DepositTarget');
            }
          }
          break;

        case 'depositing':
          entity.remove('MoveTarget');

          if (!depositTarget) {
            // Check if we still have resources to deposit
            if (inventory && this.hasResourcesToDeposit(inventory)) {
              const behaviour = entity.get<Behavior>('Behavior');
              if (behaviour) {
                behaviour.current = 'seeking_deposit';
              }
            } else {
              const behaviour = entity.get<Behavior>('Behavior');
              if (behaviour) {
                behaviour.current = 'seeking_resource';
              }
            }
          }
          break;

        default:
          break;
      }
    }
  }

  private hasResourcesToDeposit(inventory: ResourceInventory): boolean {
    return Array.from(inventory.resources.values()).some(
      (amount) => amount > 0,
    );
  }

  private getFirstAvailableResource(
    inventory: ResourceInventory,
  ): string | null {
    for (const [resourceType, amount] of inventory.resources.entries()) {
      if (amount > 0) {
        return resourceType;
      }
    }
    return null;
  }
}
