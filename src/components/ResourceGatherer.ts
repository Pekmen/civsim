import type { Component } from '../core';
import type { ResourceType } from '.';

export interface ResourceGatherer extends Component {
  readonly type: 'ResourceGatherer';
  gatherRate: number;
  gatherRange: number;
  targetResourceType?: ResourceType;
}

export const createResourceGatherer = ({
  gatherRate = 10,
  gatherRange = 20,
  targetResourceType,
}: {
  gatherRate?: number;
  gatherRange?: number;
  targetResourceType?: ResourceType;
} = {}): ResourceGatherer => ({
  type: 'ResourceGatherer',
  gatherRate,
  gatherRange,
  targetResourceType,
});
