import type {
  Position,
  BoundingBox,
  Renderable,
  CollisionBox,
} from '../components';
import { System, Entity, type SystemUpdateParams } from '../core';
import { getAABB } from '../utils';

export class RenderSystem extends System {
  private context: CanvasRenderingContext2D;
  private showFPS: boolean;

  constructor(context: CanvasRenderingContext2D, showFPS: boolean) {
    super('RenderSystem');
    this.context = context;
    this.showFPS = showFPS;
  }

  update({ entityManager, deltaTime }: SystemUpdateParams): void {
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

    if (this.showFPS) {
      this.renderFPS(deltaTime);
    }
  }

  renderEntities(entities: Entity[]): void {
    for (const entity of entities) {
      const pos = entity.get<Position>('Position');
      const renderable = entity.get<Renderable>('Renderable');
      const collisionBox = entity.get<CollisionBox>('CollisionBox');

      if (!renderable) continue;

      if (pos) {
        renderable.render({ context: this.context, position: pos });
        this.renderPixel(pos);
      }

      if (pos && collisionBox) {
        const { left, top, width, height } = getAABB(pos, collisionBox);
        this.renderBox(left, top, width, height, 'green');
      }
    }
  }

  private renderBackground() {
    this.context.save();

    this.context.fillStyle = 'lightgrey';
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    this.context.restore();
  }

  private renderPixel(pos: Position) {
    this.context.save();

    this.context.fillStyle = 'black';
    this.context.fillRect(pos.x, pos.y, 1, 1);

    this.context.restore();
  }

  private renderFPS(delta: number): void {
    this.context.save();
    const fps = Math.round(1000 / delta);

    this.context.strokeStyle = 'black';
    this.context.fillStyle = 'lightgrey';
    this.context.strokeRect(0, 0, 70, 50);
    this.context.fillRect(0, 0, 70, 50);
    this.context.font = '12px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(`FPS: ${fps}`, 10, 30);
    this.context.restore();
  }

  private renderBox(
    x: number,
    y: number,
    width: number,
    height: number,
    color = 'red',
  ): void {
    this.context.save();
    this.context.strokeStyle = color;
    this.context.strokeRect(x, y, width, height);
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
