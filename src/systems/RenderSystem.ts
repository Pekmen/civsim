import type { Position } from '../components/Position';
import type { Renderable } from '../components/Renderable';
import { System } from '../core/System';
import type { Entity } from '../core/Entity';
import type { EntityManager } from '../core/EntityManager';

export class RenderSystem extends System {
  context: CanvasRenderingContext2D;
  showFPS: boolean;

  constructor(context: CanvasRenderingContext2D, showFPS: boolean) {
    super('RenderSystem');
    this.context = context;
    this.showFPS = showFPS;
  }

  update(entityManager: EntityManager, delta: number): void {
    this.clearCanvas();
    this.render(entityManager.getAll());
    if (this.showFPS) {
      this.renderFPS(delta);
    }
  }

  render(entities: Entity[]): void {
    for (const entity of entities) {
      const position = entity.get<Position>('position');
      const renderable = entity.get<Renderable>('renderable');

      if (renderable && position) {
        renderable.render(this.context, position);
      }
    }
  }

  private renderFPS(delta: number): void {
    const fps = Math.round(1000 / delta);

    if (this.context) {
      this.context.save();

      this.context.fillStyle = 'lightgrey';
      this.context.fillRect(0, 0, 70, 50);
      this.context.font = '12px Arial';
      this.context.fillStyle = 'black';
      this.context.fillText(`FPS: ${fps}`, 10, 30);

      this.context.restore();
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
