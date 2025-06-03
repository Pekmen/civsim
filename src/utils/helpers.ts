import type { Bounds, Vec2 } from '../types';

export const generateId = (): string => Math.random().toString(36).slice(2, 9);

export const randomPositionInBounds = ({
  left,
  top,
  right,
  bottom,
}: Bounds): Vec2 => ({
  x: Math.floor(Math.random() * (right - left + 1)) + left,
  y: Math.floor(Math.random() * (bottom - top + 1)) + top,
});
