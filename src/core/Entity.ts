import type { Component, ComponentName } from '.';
import { generateId } from '../utils';

export type Entityid = string;
export type EntityType = string;

export class Entity {
  readonly id: Entityid;
  readonly type: EntityType;
  private components: Map<ComponentName, Component> = new Map();

  constructor(type: EntityType) {
    this.id = generateId();
    this.type = type;
  }

  add<T extends Component>(component: T): this {
    this.components.set(component.name, component);
    return this;
  }

  remove(name: ComponentName): this {
    this.components.delete(name);
    return this;
  }

  get<T extends Component>(name: ComponentName): T | undefined {
    return this.components.get(name) as T | undefined;
  }

  has(name: ComponentName): boolean {
    return this.components.has(name);
  }

  getAll(): Component[] {
    return Array.from(this.components.values());
  }
}
