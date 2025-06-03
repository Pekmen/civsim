import type { System, SystemName } from '.';

export class SystemManager {
  systems: System[];

  constructor() {
    this.systems = [];
  }

  register<T extends System>(system: T): void {
    this.systems.push(system);
  }

  unregister(name: SystemName): void {
    this.systems.filter((s) => s.name !== name);
  }

  isRegistered(systemName: SystemName): boolean {
    return this.systems.some((s) => s.name === systemName);
  }

  getAll() {
    return this.systems;
  }
}
