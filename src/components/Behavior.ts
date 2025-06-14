import type { Component } from '../core';

export type BehaviorType =
  | 'idle'
  | 'wandering'
  | 'testing'
  | 'seeking_resource'
  | 'seeking_deposit'
  | 'depositing'
  | 'gathering';

export interface Behavior extends Component {
  readonly type: 'Behavior';
  current: BehaviorType;
}

export const createBehavior = (beahavior: BehaviorType = 'idle'): Behavior => ({
  type: 'Behavior',
  current: beahavior,
});
