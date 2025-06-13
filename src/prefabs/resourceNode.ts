import {
  createBoundingBox,
  createCollisionBox,
  createPosition,
  createRenderable,
  createResource,
  type ResourceType,
} from '../components';
import { Entity } from '../core';
import { createResourceNodeRenderer } from '../graphics';

interface CreateResourceNodeParams {
  resourceType: ResourceType;
  amount?: number;
  x: number;
  y: number;
}

export const createResourceNode = ({
  resourceType,
  amount = 100,
  x = 0,
  y = 0,
}: CreateResourceNodeParams): Entity => {
  return new Entity('ResourceNode')
    .add(createPosition({ x, y }))
    .add(createBoundingBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createCollisionBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createResource({ resourceType, amount }))
    .add(createRenderable(createResourceNodeRenderer()));
};
