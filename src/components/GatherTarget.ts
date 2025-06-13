import type { Component } from '../core';
import type { ResourceType } from '.';

export interface GatherTarget extends Component {
  readonly type: 'GatherTarget';
  targetEntityId: string;
  resourceType: ResourceType;
}

export const createGatherTarget = (
  targetEntityId: string,
  resourceType: ResourceType,
): GatherTarget => ({
  type: 'GatherTarget',
  targetEntityId,
  resourceType,
});
