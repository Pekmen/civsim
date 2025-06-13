import type { Position, Resource, ResourceGatherer } from '../components';
import type { Entity, EntityManager } from '../core';

export function findNearestResource({
  entity,
  entityManager,
}: {
  entity: Entity;
  entityManager: EntityManager;
}): Entity | null {
  const pos = entity.get<Position>('Position');
  const gatherer = entity.get<ResourceGatherer>('ResourceGatherer');

  if (!pos || !gatherer) return null;
  const resources = entityManager.getByType('ResourceNode');
  let nearest: Entity | null = null;
  let nearestDistance = Infinity;

  for (const resource of resources) {
    const resourcePos = resource.get<Position>('Position');
    const resourceComp = resource.get<Resource>('Resource');

    if (!resourcePos || !resourceComp) continue;
    if (
      gatherer.targetResourceType &&
      resourceComp.resourceType !== gatherer.targetResourceType
    ) {
      continue;
    }

    const distance = Math.hypot(resourcePos.x - pos.x, resourcePos.y - pos.y);
    if (distance < nearestDistance) {
      nearest = resource;
      nearestDistance = distance;
    }
  }

  return nearest;
}
