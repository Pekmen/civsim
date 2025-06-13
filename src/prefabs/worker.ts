import {
  type BehaviorType,
  createBehavior,
  createBoundingBox,
  createCollisionBox,
  createPosition,
  createRenderable,
  createResourceGatherer,
  createResourceInventory,
  createSpeed,
  createVelocity,
} from '../components';
import { Entity } from '../core';
import { createWorkerRenderer } from '../graphics';

export const createWorker = ({
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
  speed = 50,
  behavior = 'seeking_resource' as BehaviorType, // Changed default
}): Entity => {
  return new Entity('Worker')
    .add(createPosition({ x, y }))
    .add(createVelocity({ vx, vy }))
    .add(createSpeed(speed))
    .add(createBoundingBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createCollisionBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createBehavior(behavior))
    .add(createResourceGatherer())
    .add(createResourceInventory(50))
    .add(createRenderable(createWorkerRenderer()));
};
