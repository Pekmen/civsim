export const generateId = () => Math.random().toString(36).slice(2, 9);

export const randomPositionInBounds = (
  left: number,
  top: number,
  right: number,
  bottom: number,
) => ({
  x: Math.floor(Math.random() * (right - left + 1)) + left,
  y: Math.floor(Math.random() * (bottom - top + 1)) + bottom,
});
