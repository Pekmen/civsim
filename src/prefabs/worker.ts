import { createBehavior, type BehaviorType } from '../components/Behavior';
import { createBoundingBox } from '../components/BoundingBox';
import { createCollisionBox } from '../components/CollisionBox';
import { createPosition } from '../components/Position';
import { createRenderable } from '../components/Renderable';
import { createSpeed } from '../components/Speed';
import { createVelocity } from '../components/Velocity';
import { Entity } from '../core/Entity';
import { createWorkerRenderer } from '../graphics/worker';

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
