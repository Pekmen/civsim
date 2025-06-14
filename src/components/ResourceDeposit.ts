import type { Component } from '../core';

export interface ResourceDeposit extends Component {
  readonly type: 'ResourceDeposit';
  acceptedResourceTypes: string[];
  capacity: number;
  stored: Map<string, number>;
}

export function createResourceDeposit(
  acceptedResourceTypes: string[],
  capacity: number = Infinity,
): ResourceDeposit {
  return {
    type: 'ResourceDeposit',
    acceptedResourceTypes,
    capacity,
    stored: new Map<string, number>(),
  };
}
