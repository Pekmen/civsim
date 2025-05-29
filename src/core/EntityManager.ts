import type { Entity, EntityType } from './Entity';

export class EntityManager {
  private entities: Entity[] = [];

  add(entity: Entity): void {
    this.entities.push(entity);
  }

  remove(entity: Entity): void {
    this.entities = this.entities.filter((e) => e.id !== entity.id);
  }

  getAll() {
    return this.entities;
  }

  getByType(type: EntityType): Entity[] {
    return this.entities.filter((e) => e.type === type);
  }

  getWithComponent(componentName: string): Entity[] {
    return this.entities.filter((e) => e.has(componentName));
  }

  clear(): void {
    this.entities = [];
  }

  count(): number {
    return this.entities.length;
  }
}
