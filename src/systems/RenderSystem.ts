import { colors } from '../colors';
import type { BoundingBox, Position, Renderable } from '../components';
import { Entity, System, type SystemUpdateParams } from '../core';
import { getAABB } from '../utils';

export class RenderSystem extends System {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    super('RenderSystem');
    this.context = context;
  }

  update({ entityManager }: SystemUpdateParams): void {
    const entities = entityManager.query(['Renderable']);

    const entitiesByRenderDepth = entities.sort((a, b) => {
      const posA = a.get<Position>('Position');
      const boxA = a.get<BoundingBox>('BoundingBox');
      const posB = b.get<Position>('Position');
      const boxB = b.get<BoundingBox>('BoundingBox');

      if (!posA || !boxA || !posB || !boxB) return 0;

      const bottomA = getAABB(posA, boxA).bottom;
      const bottomB = getAABB(posB, boxB).bottom;

      return bottomA - bottomB;
    });

    this.clearCanvas();
    this.renderBackground();
    this.renderEntities(entitiesByRenderDepth);
  }

  renderEntities(entities: Entity[]): void {
    for (const entity of entities) {
      const pos = entity.get<Position>('Position');
      const renderable = entity.get<Renderable>('Renderable');

      if (!renderable) continue;

      if (pos) {
        renderable.render({ context: this.context, position: pos });
      }
    }
  }

  private renderBackground(): void {
    this.context.save();

    this.context.fillStyle = colors.base.lightGray;
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    this.context.restore();
  }

  private clearCanvas(): void {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }
}
