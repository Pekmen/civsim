import type { Position } from '../components/Position';
import type { Renderable } from '../components/Renderable';
import { System } from '../core/System';
import type { Entity } from '../core/Entity';
import type { EntityManager } from '../core/EntityManager';
import type { CollisionBox } from '../components/CollisionBox';
import { getAABB } from '../utils/collision';

export class RenderSystem extends System {
  context: CanvasRenderingContext2D;
  showFPS: boolean;

  constructor(context: CanvasRenderingContext2D, showFPS: boolean) {
    super('RenderSystem');
    this.context = context;
    this.showFPS = showFPS;
  }

  update(entityManager: EntityManager, delta: number): void {
    const entities = entityManager.query(['Renderable']);

    this.render(entities);
    if (this.showFPS) {
      this.renderFPS(delta);
    }
  }

  render(entities: Entity[]): void {
    this.clearCanvas();

    for (const entity of entities) {
      const pos = entity.get<Position>('Position');
      const renderable = entity.get<Renderable>('Renderable');
      const collisionBox = entity.get<CollisionBox>('CollisionBox');

      if (!renderable) continue;

      if (pos) {
        renderable.render(this.context, pos);
        this.renderPosition(pos);
      }

      if (pos && collisionBox) {
        const { left, top, width, height } = getAABB(pos, collisionBox);
        this.renderBox(left, top, width, height, 'green');
      }
    }
  }

  private renderPosition(pos: Position) {
    this.context.save();

    this.context.fillStyle = 'black';
    this.context.fillRect(pos.x, pos.y, 1, 1);

    this.context.restore();
  }

  private renderFPS(delta: number): void {
    this.context.save();
    const fps = Math.round(1000 / delta);

    this.context.fillStyle = 'lightgrey';
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
