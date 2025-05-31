import { createCollisionBox } from '../components/CollisionBox';
import { createPosition } from '../components/Position';
import { createRenderable } from '../components/Renderable';
import { Entity } from '../core/Entity';
import { createHouseRenderer } from '../graphics/house';

export const createHouse = (x: number, y: number) => {
  return new Entity('House')
    .add(createPosition(x, y))
    .add(createCollisionBox(-30, 10, 60, 10))
    .add(createRenderable(createHouseRenderer()));
};
