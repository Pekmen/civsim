import type { Box } from '../components/Box';
import {
  createCollisionCorrection,
  type CollisionCorrection,
} from '../components/CollisionCorrection';
import type { Position } from '../components/Position';
import type { AABB } from '../types';

export const getAABB = (position: Position, box: Box): AABB => {
  const left = position.x + box.offsetX;
  const top = position.y + box.offsetY;

  return {
    left,
    top,
    right: left + box.width,
    bottom: top + box.height,
    width: box.width,
    height: box.height,
  };
};

export const aabbIntersects = (a: AABB, b: AABB): boolean => {
  return (
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
  );
};

export const isAABBInside = (a: AABB, b: AABB): boolean => {
  return (
    a.left >= b.left &&
    a.right <= b.right &&
    a.top >= b.top &&
    a.bottom <= b.bottom
  );
};

export const isAABBOutside = (a: AABB, b: AABB): boolean => {
  return (
    a.left >= b.right ||
    a.right <= b.left ||
    a.top >= b.bottom ||
    a.bottom <= b.top
  );
};

export const createCanvasAABB = (width: number, height: number): AABB => ({
  left: 0,
  top: 0,
  right: width,
  bottom: height,
  width,
  height,
});

export const getOutOfBoundsCorrection = (
  aabb: AABB,
  bounds: AABB,
): CollisionCorrection => {
  let positionCorrectionX = 0;
  let positionCorrectionY = 0;

  if (aabb.right > bounds.right) {
    positionCorrectionX = bounds.right - aabb.right;
  } else if (aabb.left < bounds.left) {
    positionCorrectionX = bounds.left - aabb.left;
  }

  if (aabb.bottom > bounds.bottom) {
    positionCorrectionY = bounds.bottom - aabb.bottom;
  } else if (aabb.top < bounds.top) {
    positionCorrectionY = bounds.top - aabb.top;
  }

  return createCollisionCorrection(positionCorrectionX, positionCorrectionY);
};
