export type ResourceType = 'food' | 'wood' | 'stone';

export interface Resource {
  readonly type: 'Resource';
  resourceType: ResourceType;
  amount: number;
}

export const createResource = ({
  resourceType = 'food' as ResourceType,
  amount = 100,
}: {
  resourceType: ResourceType;
  amount: number;
}): Resource => ({
  type: 'Resource',
  resourceType,
  amount,
});
