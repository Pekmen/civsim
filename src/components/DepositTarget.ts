import type { Component } from '../core';

export interface DepositTarget extends Component {
  readonly type: 'DepositTarget';
  targetEntityId: string;
  resourceType: string;
}

export function createDepositTarget(
  targetEntityId: string,
  resourceType: string,
): DepositTarget {
  return {
    type: 'DepositTarget',
    targetEntityId,
    resourceType,
  };
}
