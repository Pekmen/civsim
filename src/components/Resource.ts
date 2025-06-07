export type ResourceType = 'food' | 'wood' | 'stone';

export interface Resource {
  readonly type: ResourceType;
  amount: number;
}

export const createResource = ({ type, amount = 100 }: Resource): Resource => ({
  type,
  amount,
});
