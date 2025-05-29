import { EntityManager } from './core/EntityManager';
import { SystemManager } from './core/SystemManager';
import { MovementSystem } from './systems/MovementSystem';
import { RenderSystem } from './systems/RenderSystem';
import { CollisionSystem } from './systems/CollisionSystem';
import { createWorker } from './prefabs/worker';

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
  private systemManager: SystemManager;
  private movementSystem: MovementSystem;
  private collisionSystem: CollisionSystem;

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

    this.movementSystem = new MovementSystem();
    this.collisionSystem = new CollisionSystem(
      this.canvas.width,
      this.canvas.height,
    );
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
    this.entityManager.add(createWorker(10, 20));
    this.entityManager.add(createWorker(100, 50));

    this.systemManager.register(this.movementSystem);
    this.systemManager.register(this.collisionSystem);
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
