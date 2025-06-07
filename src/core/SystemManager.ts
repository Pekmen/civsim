import type { System, SystemType } from '.';

export class SystemManager {
  systems: System[];

  constructor() {
    this.systems = [];
  }

  add<T extends System>(system: T): void {
    this.systems.push(system);
  }

  remove(type: SystemType): void {
    this.systems.filter((s) => s.type !== type);
  }

  has(systemType: SystemType): boolean {
    return this.systems.some((s) => s.type === systemType);
  }

  getAll(): System[] {
    return this.systems;
  }
}
