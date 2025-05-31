import type { Box } from '../components/Box';
import type { Position } from '../components/Position';
import type { AABB } from '../types';

export const getAABB = <T extends Box>(position: Position, box: T): AABB => {
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
