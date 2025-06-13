import type { Component } from '../core';
import type { ResourceType } from './Resource';

export interface ResourceDeposit extends Component {
  readonly type: 'ResourceDeposit';
  resources: Map<ResourceType, number>;
  capacity: number;
}

export const createResourceDeposit = (
  capacity: number = 100,
): ResourceDeposit => ({
  type: 'ResourceDeposit',
  resources: new Map(),
  capacity,
});
