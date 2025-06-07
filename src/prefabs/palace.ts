import {
  createBoundingBox,
  createCollisionBox,
  createPosition,
  createRenderable,
} from '../components';
import { Entity } from '../core';
import { createPalaceRenderer } from '../graphics';

export const createPalace = ({ x, y }: { x: number; y: number }): Entity => {
  return new Entity('Palace')
    .add(createPosition({ x, y }))
    .add(
      createBoundingBox({
        offsetX: -30,
        offsetY: -20,
        width: 60,
        height: 40,
      }),
    )
    .add(
      createCollisionBox({
        offsetX: -30,
        offsetY: 10,
        width: 60,
        height: 10,
      }),
    )
    .add(createRenderable(createPalaceRenderer()));
};
