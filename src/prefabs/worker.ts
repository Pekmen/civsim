import { createCollisionBox } from '../components/CollisionBox';
import { createPosition } from '../components/Position';
import { createRenderable } from '../components/Renderable';
import { createSize } from '../components/Size';
import { createSpeed } from '../components/Speed';
import { createVelocity } from '../components/Velocity';
import { Entity } from '../core/Entity';
import { createRectRenderer } from '../graphics/basicShapes';

export const createWorker = (x: number, y: number) => {
  return new Entity('Worker')
    .add(createPosition(x, y))
    .add(createVelocity(10, 10))
    .add(createSize(30, 30))
    .add(createSpeed(50))
    .add(createCollisionBox(-15, -15, 30, 30))
    .add(createRenderable(createRectRenderer('#ff6b6b')));
};
