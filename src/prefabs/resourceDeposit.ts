import {
  createBoundingBox,
  createCollisionBox,
  createPosition,
  createRenderable,
  createResource,
  type ResourceType,
} from '../components';
import { Entity } from '../core';
import { createResourceDepositRenderer } from '../graphics';

interface CreateResourceDepositParams {
  type: ResourceType;
  amount?: number;
  x: number;
  y: number;
}

export const createResourceDeposit = ({
  type,
  amount = 100,
  x = 0,
  y = 0,
}: CreateResourceDepositParams): Entity => {
  return new Entity('ResourceDeposit')
    .add(createPosition({ x, y }))
    .add(createBoundingBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createCollisionBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createResource({ type, amount }))
    .add(createRenderable(createResourceDepositRenderer()));
};
