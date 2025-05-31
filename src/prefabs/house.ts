import { createBoundingBox } from '../components/BoundingBox';
import { createCollisionBox } from '../components/CollisionBox';
import { createPosition } from '../components/Position';
import { createRenderable } from '../components/Renderable';
import { Entity } from '../core/Entity';
import { createHouseRenderer } from '../graphics/house';

export const createHouse = (x: number, y: number) => {
  return new Entity('House')
    .add(createPosition(x, y))
    .add(createBoundingBox(-30, -20, 60, 40))
    .add(createCollisionBox(-30, 10, 60, 10))
    .add(createRenderable(createHouseRenderer()));
};
