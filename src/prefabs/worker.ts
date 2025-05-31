import { createBehavior } from '../components/Behavior';
import { createBoundingBox } from '../components/BoundingBox';
import { createCollisionBox } from '../components/CollisionBox';
import { createPosition } from '../components/Position';
import { createRenderable } from '../components/Renderable';
import { createSpeed } from '../components/Speed';
import { createVelocity } from '../components/Velocity';
import { Entity } from '../core/Entity';
import { createWorkerRenderer } from '../graphics/worker';

export const createWorker = (x: number, y: number) => {
  return new Entity('Worker')
    .add(createPosition(x, y))
    .add(createVelocity(0, 0))
    .add(createSpeed(50))
    .add(createBoundingBox(-3, -6, 6, 12))
    .add(createCollisionBox(-3, -6, 6, 12))
    .add(createBehavior('wandering'))
    .add(createRenderable(createWorkerRenderer()));
};
