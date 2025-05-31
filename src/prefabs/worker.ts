import { createBehavior } from '../components/Behavior';
import { createCollisionBox } from '../components/CollisionBox';
import { createMoveintent } from '../components/MoveIntent';
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
    .add(createCollisionBox(-3, -6, 6, 12))
    .add(createBehavior())
    .add(createMoveintent())
    .add(createRenderable(createWorkerRenderer()));
};
