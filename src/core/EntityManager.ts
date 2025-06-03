import type { ComponentName, Entity, EntityType } from '.';

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
  query<T extends readonly ComponentName[]>(componentNames: T): Entity[] {
    return this.entities.filter((entity) =>
      componentNames.every((name) => entity.has(name)),
    );
  }

  clear(): void {
    this.entities = [];
  }

  count(): number {
    return this.entities.length;
  }
}
