import type {
  Position,
  Resource,
  ResourceDeposit,
  ResourceGatherer,
} from '../components';
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

export function findNearestDeposit({
  entity,
  entityManager,
  resourceType,
}: {
  entity: Entity;
  entityManager: EntityManager;
  resourceType: string;
}): Entity | null {
  const pos = entity.get<Position>('Position');
  if (!pos) return null;

  const deposits = entityManager.query(['ResourceDeposit', 'Position']);
  let nearest: Entity | null = null;
  let nearestDistance = Infinity;

  for (const deposit of deposits) {
    const depositPos = deposit.get<Position>('Position');
    const depositComp = deposit.get<ResourceDeposit>('ResourceDeposit');

    if (!depositPos || !depositComp) continue;

    if (!depositComp.acceptedResourceTypes.includes(resourceType)) continue;

    const totalStored = Array.from(depositComp.stored.values()).reduce(
      (sum, amount) => sum + amount,
      0,
    );
    if (totalStored >= depositComp.capacity) continue;

    const distance = Math.hypot(depositPos.x - pos.x, depositPos.y - pos.y);
    if (distance < nearestDistance) {
      nearest = deposit;
      nearestDistance = distance;
    }
  }

  return nearest;
}
