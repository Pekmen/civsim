import type { Component } from '../core/Component';

export type BehaviorType = 'idle' | 'wandering' | 'testing';

export interface Behavior extends Component {
  readonly name: 'Behavior';
  current: BehaviorType;
}

export const createBehavior = (beahavior: BehaviorType = 'idle'): Behavior => ({
  name: 'Behavior',
  current: beahavior,
});
