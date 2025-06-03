import {
  type BehaviorType,
  createBehavior,
  createBoundingBox,
  createCollisionBox,
  createPosition,
  createRenderable,
  createSpeed,
  createVelocity,
} from '../components';
import { Entity } from '../core';
import { createWorkerRenderer } from '../graphics';

export interface createWorkerOptions {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  speed?: number;
  behavior?: BehaviorType;
}

export const createWorker = ({
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
  speed = 50,
  behavior = 'wandering' as BehaviorType,
}): Entity => {
  return new Entity('Worker')
    .add(createPosition({ x, y }))
    .add(createVelocity({ vx, vy }))
    .add(createSpeed(speed))
    .add(createBoundingBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createCollisionBox({ offsetX: -3, offsetY: -6, width: 6, height: 12 }))
    .add(createBehavior(behavior))
    .add(createRenderable(createWorkerRenderer()));
};
