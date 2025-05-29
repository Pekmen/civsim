import type { Position } from '../components/Position';
import type { Renderable } from '../components/Renderable';
import { System } from '../core/System';
import type { Entity } from '../core/Entity';
import type { EntityManager } from '../core/EntityManager';
import type { Size } from '../components/Size';

export class RenderSystem extends System {
  context: CanvasRenderingContext2D;
  showFPS: boolean;

  constructor(context: CanvasRenderingContext2D, showFPS: boolean) {
    super('RenderSystem');
    this.context = context;
    this.showFPS = showFPS;
  }

  update(entityManager: EntityManager, delta: number): void {
    const entities = entityManager.query(['Renderable', 'Position', 'Size']);

    this.render(entities);
    if (this.showFPS) {
      this.renderFPS(delta);
    }
  }

  render(entities: Entity[]): void {
    this.clearCanvas();

    for (const entity of entities) {
      this.context.save();
      const pos = entity.get<Position>('Position');
      const size = entity.get<Size>('Size');
      const renderable = entity.get<Renderable>('Renderable');

      if (pos && size && renderable) {
        renderable.render(this.context, pos, size);
        this.renderPosition(pos);
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
    const fps = Math.round(1000 / delta);

    if (this.context) {
      this.context.fillStyle = 'lightgrey';
      this.context.fillRect(0, 0, 70, 50);
      this.context.font = '12px Arial';
      this.context.fillStyle = 'black';
      this.context.fillText(`FPS: ${fps}`, 10, 30);
    }
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
