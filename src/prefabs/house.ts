import {
  createPosition,
  createBoundingBox,
  createCollisionBox,
  createRenderable,
} from '../components';
import { Entity } from '../core';
import { createHouseRenderer } from '../graphics';

export const createHouse = (x: number, y: number) => {
  return new Entity('House')
    .add(createPosition(x, y))
    .add(createBoundingBox(-30, -20, 60, 40))
    .add(createCollisionBox(-30, 10, 60, 10))
    .add(createRenderable(createHouseRenderer()));
};
