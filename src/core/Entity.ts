import { generateId } from '../utils';
import type { Component, ComponentType } from '.';

export type Entityid = string;
export type EntityType = string;

export class Entity {
  readonly id: Entityid;
  readonly type: EntityType;
  private components: Map<ComponentType, Component> = new Map();

  constructor(type: EntityType) {
    this.id = generateId();
    this.type = type;
  }

  add<T extends Component>(component: T): this {
    this.components.set(component.type, component);
    return this;
  }

  remove(type: ComponentType): this {
    this.components.delete(type);
    return this;
  }

  get<T extends Component>(type: ComponentType): T | undefined {
    return this.components.get(type) as T | undefined;
  }

  has(type: ComponentType): boolean {
    return this.components.has(type);
  }

  getAll(): Component[] {
    return Array.from(this.components.values());
  }
}
