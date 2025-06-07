import type { ComponentType, Entity, EntityType } from '.';

export class EntityManager {
  private entities: Entity[] = [];

  add(entity: Entity): void {
    this.entities.push(entity);
  }

  remove(entity: Entity): void {
    this.entities = this.entities.filter((e) => e.id !== entity.id);
  }

  getAll(): Entity[] {
    return this.entities;
  }

  getByType(type: EntityType): Entity[] {
    return this.entities.filter((e) => e.type === type);
  }

  // @TODO: Find a way to type query so it guaranties it will contain
  // entities with correct queried types or an empty list
  query<T extends readonly ComponentType[]>(componentTypes: T): Entity[] {
    return this.entities.filter((entity) =>
      componentTypes.every((type) => entity.has(type)),
    );
  }

  clear(): void {
    this.entities = [];
  }

  count(): number {
    return this.entities.length;
  }
}
