import {
  type BehaviorType,
  createPosition,
  createVelocity,
  createSpeed,
  createBoundingBox,
  createCollisionBox,
  createBehavior,
  createRenderable,
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
}) => {
  return new Entity('Worker')
    .add(createPosition(x, y))
    .add(createVelocity(vx, vy))
    .add(createSpeed(speed))
    .add(createBoundingBox(-3, -6, 6, 12))
    .add(createCollisionBox(-3, -6, 6, 12))
    .add(createBehavior(behavior))
    .add(createRenderable(createWorkerRenderer()));
};
