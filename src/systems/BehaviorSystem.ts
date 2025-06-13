import {
  type Behavior,
  type BoundingBox,
  createGatherTarget,
  createMoveTarget,
  type GatherTarget,
  type MoveTarget,
  type Position,
  type Resource,
  type ResourceGatherer,
  type Speed,
} from '../components';
import { System, type SystemUpdateParams } from '../core';
import { findNearestResource, randomPositionInBounds } from '../utils';

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
              const behaviorComp = entity.get<Behavior>('Behavior');
              if (behaviorComp) {
                behaviorComp.current = 'wandering';
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
                  const behaviorComp = entity.get<Behavior>('Behavior');
                  if (behaviorComp) {
                    behaviorComp.current = 'gathering';
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
            const behaviorComp = entity.get<Behavior>('Behavior');

            if (behaviorComp) {
              behaviorComp.current = 'wandering';
            }
          }
          break;
        default:
          break;
      }
    }
  }
}
