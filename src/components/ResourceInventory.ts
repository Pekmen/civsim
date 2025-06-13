import type { Component } from '../core';
import type { ResourceType } from './Resource';

export interface ResourceInventory extends Component {
  readonly type: 'ResourceInventory';
  resources: Map<ResourceType, number>;
  capacity: number;
}

export const createResourceInventory = (
  capacity: number = 100,
): ResourceInventory => ({
  type: 'ResourceInventory',
  resources: new Map(),
  capacity,
});
