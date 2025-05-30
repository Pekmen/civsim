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
    .add(createCollisionBox(-2, -8, 4, 10))
    .add(createRenderable(createWorkerRenderer()));
};
