import type { System, SystemName } from '.';

export class SystemManager {
  systems: System[];

  constructor() {
    this.systems = [];
  }

  add<T extends System>(system: T): void {
    this.systems.push(system);
  }

  remove(name: SystemName): void {
    this.systems.filter((s) => s.name !== name);
  }

  has(systemName: SystemName): boolean {
    return this.systems.some((s) => s.name === systemName);
  }

  getAll(): System[] {
    return this.systems;
  }
}
