import { createPosition } from './components/Position';
import { createRenderable } from './components/Renderable';
import { Entity } from './core/Entity';
import { EntityManager } from './core/EntityManager';
import { SystemManager } from './core/SystemManager';
import {
  createCircleRenderer,
  createRectRenderer,
} from './graphics/basicShapes';
import { RenderSystem } from './systems/RenderSystem';

interface CivSimulationOptions {
  showFPS?: boolean;
}

export class CivSimulation {
  private isRunning = false;
  private canvas: HTMLCanvasElement;
  private lastUpdateTime = 0;
  private animationFrameId: number | null = null;
  private showFPS: boolean | undefined;
  private entityManager: EntityManager;
  private renderSystem: RenderSystem;
  private context: CanvasRenderingContext2D | null;
  systemManager: SystemManager;

  constructor(
    canvas: HTMLCanvasElement,
    { showFPS = false }: CivSimulationOptions = {},
  ) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    if (!this.context) {
      throw new Error(
        '2D rendering context could not be retrieved from canvas.',
      );
    }

    this.showFPS = showFPS;

    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager();
    this.renderSystem = new RenderSystem(this.context, this.showFPS);

    this.init();
  }

  start(): void {
    this.isRunning = true;
    this.lastUpdateTime = performance.now();

    this.animationFrameId = requestAnimationFrame(this.run);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private init(): void {
    this.entityManager.add(
      new Entity('unit')
        .add(createPosition(300, 150))
        .add(createRenderable(createCircleRenderer(30, '#4ecdc4'))),
    );
    this.entityManager.add(
      new Entity('building')
        .add(createPosition(100, 200))
        .add(createRenderable(createRectRenderer(100, 100, '#ff6b6b'))),
    );

    this.systemManager.register(this.renderSystem);
  }

  private update(delta: number): void {
    for (const system of this.systemManager.getAll()) {
      system.update(this.entityManager, delta);
    }
  }

  private run = (timeStamp: number): void => {
    if (!this.isRunning) return;

    const delta = timeStamp - this.lastUpdateTime;
    this.lastUpdateTime = timeStamp;

    this.update(delta);

    this.animationFrameId = requestAnimationFrame(this.run);
  };
}
