import { colors } from '../colors';
import type {
  BoundingBox,
  CollisionBox,
  MoveTarget,
  Position,
  Speed,
  Velocity,
} from '../components';
import { Entity, System, type SystemUpdateParams } from '../core';
import { getAABB } from '../utils';

export type DebugConfig = {
  enabled: boolean;
  showFPS?: boolean;
  showCollisionBox?: boolean;
  showBoundingBox?: boolean;
  showPosition?: boolean;
  showVelocityVector?: boolean;
  showTargetVector?: boolean;
};

export type ArrowheadParams = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
};

const DEFAULT_DEBUG_CONFIG = {
  enabled: false,
  showFPS: true,
  showCollisionBox: false,
  showBoundingBox: false,
  showPosition: false,
  showVelocityVector: false,
  showTargetVector: false,
};

export class DebugSystem extends System {
  private context: CanvasRenderingContext2D;
  private debugConfig: DebugConfig;

  constructor(
    context: CanvasRenderingContext2D,
    debugConfig: DebugConfig = DEFAULT_DEBUG_CONFIG,
  ) {
    super('RenderSystem');
    this.context = context;
    this.debugConfig = debugConfig;
  }

  update({ entityManager, deltaTime }: SystemUpdateParams): void {
    const {
      enabled,
      showBoundingBox,
      showPosition,
      showCollisionBox,
      showVelocityVector,
      showTargetVector,
      showFPS,
    } = this.debugConfig;

    if (!enabled) return;

    const entities = entityManager.getAll();

    for (const entity of entities) {
      if (showCollisionBox) this.renderCollisionBox(entity);
      if (showPosition) this.renderPosition(entity);
      if (showBoundingBox) this.renderBoundingBox(entity);
      if (showVelocityVector) this.renderVelocityVector(entity);
      if (showTargetVector) this.renderTargetVector(entity);
    }

    if (showFPS) this.renderFPS(deltaTime);
  }

  private renderCollisionBox(entity: Entity): void {
    const pos = entity.get<Position>('Position');
    const collisionBox = entity.get<CollisionBox>('CollisionBox');

    if (!pos || !collisionBox) return;

    const { left, top, width, height } = getAABB(pos, collisionBox);

    this.context.save();
    this.context.strokeStyle = colors.debug.collisionBox;
    this.context.strokeRect(left, top, width, height);
    this.context.restore();
  }

  private renderBoundingBox(entity: Entity): void {
    const pos = entity.get<Position>('Position');
    const collisionBox = entity.get<BoundingBox>('BoundingBox');

    if (!pos || !collisionBox) return;

    const { left, top, width, height } = getAABB(pos, collisionBox);

    this.context.save();
    this.context.strokeStyle = colors.debug.boundingBox;
    this.context.strokeRect(left, top, width, height);
    this.context.restore();
  }

  private renderFPS(deltaTime: number): void {
    const fps = Math.round(1000 / deltaTime);

    this.context.save();
    this.context.strokeStyle = colors.base.black;
    this.context.fillStyle = colors.base.lightGray;
    this.context.strokeRect(0, 0, 70, 50);
    this.context.fillRect(0, 0, 70, 50);
    this.context.font = '12px Arial';
    this.context.fillStyle = colors.base.black;
    this.context.fillText(`FPS: ${fps}`, 10, 30);
    this.context.restore();
  }

  private renderPosition(entity: Entity): void {
    const pos = entity.get<Position>('Position');

    if (!pos) return;

    this.context.save();
    this.context.fillStyle = colors.debug.position;
    this.context.fillRect(pos.x, pos.y, 1, 1);
    this.context.restore();
  }

  private renderVelocityVector(entity: Entity): void {
    const pos = entity.get<Position>('Position');
    const velocity = entity.get<Velocity>('Velocity');
    const speed = entity.get<Speed>('Speed');

    if (!pos || !velocity || !speed) return;

    const length = Math.hypot(velocity.vx, velocity.vy);

    const endX = pos.x + (velocity.vx / length) * speed.value;
    const endY = pos.y + (velocity.vy / length) * speed.value;

    this.context.save();
    this.context.strokeStyle = colors.debug.velocity;
    this.context.beginPath();
    this.context.moveTo(pos.x, pos.y);
    this.context.lineTo(endX, endY);
    this.context.stroke();
    this.context.restore();

    this.renderArrowHead({
      fromX: pos.x,
      fromY: pos.y,
      toX: endX,
      toY: endY,
      color: colors.debug.velocity,
    });
  }

  private renderTargetVector(entity: Entity): void {
    const position = entity.get<Position>('Position');
    const target = entity.get<MoveTarget>('MoveTarget');
    if (!target || !position) return;

    this.context.save();
    this.context.strokeStyle = '#ff00ff';
    this.context.lineWidth = 1;
    this.context.setLineDash([3, 3]);
    this.context.beginPath();
    this.context.moveTo(position.x, position.y);
    this.context.lineTo(target.x, target.y);
    this.context.stroke();
    this.context.setLineDash([]);

    this.context.fillStyle = '#ff00ff';
    this.context.beginPath();
    this.context.arc(target.x, target.y, 3, 0, Math.PI * 2);
    this.context.fill();
    this.context.restore();
  }

  private renderArrowHead({
    fromX,
    fromY,
    toX,
    toY,
    color,
  }: ArrowheadParams): void {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowLength = 8;
    const arrowAngle = Math.PI / 6;

    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(toX, toY);
    this.context.lineTo(
      toX - arrowLength * Math.cos(angle - arrowAngle),
      toY - arrowLength * Math.sin(angle - arrowAngle),
    );
    this.context.lineTo(
      toX - arrowLength * Math.cos(angle + arrowAngle),
      toY - arrowLength * Math.sin(angle + arrowAngle),
    );
    this.context.closePath();
    this.context.fill();
  }
}
