import { EntityManager, SystemManager } from './core';
import { createHouse, createWorker } from './prefabs';
import {
  BehaviorSystem,
  CollisionSystem,
  MovementSystem,
  RenderSystem,
} from './systems';
import { createCanvasAABB, randomPositionInBounds } from './utils';

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
      initialHouses = 5,
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
      createCanvasAABB(this.canvas.width, this.canvas.height),
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
      const randomPos = randomPositionInBounds({
        left: 0,
        top: 0,
        right: width,
        bottom: height,
      });
      this.entityManager.add(createWorker({ x: randomPos.x, y: randomPos.y }));
    }

    for (let i = 0; i < this.initialHouses; i++) {
      const randomPos = randomPositionInBounds({
        left: 0,
        top: 0,
        right: width,
        bottom: height,
      });
      this.entityManager.add(createHouse({ x: randomPos.x, y: randomPos.y }));
    }

    this.systemManager.add(this.behaviorSystem);
    this.systemManager.add(this.collisionSystem);
    this.systemManager.add(this.movementSystem);
    this.systemManager.add(this.renderSystem);
  }

  private update(deltaTime: number): void {
    for (const system of this.systemManager.getAll()) {
      system.update({ entityManager: this.entityManager, deltaTime });
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
