import { EntityManager } from './core/EntityManager';
import { SystemManager } from './core/SystemManager';
import { MovementSystem } from './systems/MovementSystem';
import { RenderSystem } from './systems/RenderSystem';
import { CollisionSystem } from './systems/CollisionSystem';
import { createWorker } from './prefabs/worker';
import { randomPositionInBounds } from './utils/helpers';
import { BehaviorSystem } from './systems/BehaviorSystem';
import { createHouse } from './prefabs/house';

const MAX_DELTA_TIME = 50;

interface CivSimulationConfig {
  showFPS?: boolean;
  initialWorkers?: number;
  initialHouses?: number;
}

export class CivSimulation {
  private isRunning = false;
  private context: CanvasRenderingContext2D | null;
  private canvas: HTMLCanvasElement;
  private lastUpdateTime = 0;
  private animationFrameId: number | null = null;

  private showFPS: boolean | undefined;
  private initialWorkers: number;
  private initialHouses: number;

  private entityManager: EntityManager;
  private systemManager: SystemManager;

  private behaviorSystem: BehaviorSystem;
  private renderSystem: RenderSystem;
  private movementSystem: MovementSystem;
  private collisionSystem: CollisionSystem;

  constructor(
    canvas: HTMLCanvasElement,
    {
      showFPS = false,
      initialWorkers = 5,
      initialHouses = 3,
    }: CivSimulationConfig = {},
  ) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    if (!this.context) {
      throw new Error(
        '2D rendering context could not be retrieved from canvas.',
      );
    }

    this.showFPS = showFPS;
    this.initialWorkers = initialWorkers;
    this.initialHouses = initialHouses;

    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager();

    this.behaviorSystem = new BehaviorSystem(
      this.canvas.width,
      this.canvas.height,
    );
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
    const { width, height } = this.canvas;

    for (let i = 0; i < this.initialWorkers; i++) {
      const randomPos = randomPositionInBounds(0, 0, width, height);
      this.entityManager.add(createWorker(randomPos.x, randomPos.y));
    }

    for (let i = 0; i < this.initialHouses; i++) {
      const randomPos = randomPositionInBounds(0, 0, width, height);
      this.entityManager.add(createHouse(randomPos.x, randomPos.y));
    }

    this.systemManager.register(this.behaviorSystem);
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

    let delta = timeStamp - this.lastUpdateTime;
    if (delta > MAX_DELTA_TIME) delta = MAX_DELTA_TIME;

    this.lastUpdateTime = timeStamp;

    this.update(delta);

    this.animationFrameId = requestAnimationFrame(this.run);
  };
}
