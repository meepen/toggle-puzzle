import { StatesManager } from './states-manager.js';
import { describe, expect, it } from 'vitest';

describe('StatesManager', {}, () => {
  it('should allow constructor(number, StateConfig)', () => {
    const statesManager = new StatesManager(3, {
      initialState: 0,
      maxState: 10,
    });
    expect(statesManager.states.length).toBe(3);
    for (const state of statesManager.states) {
      expect(state.state).toBe(0);
      expect(state.maxState).toBe(10);
    }
  });

  it('should allow constructor(StateConfig, IndividualConfig...)', () => {
    const statesManager = new StatesManager(
      { initialState: 0, maxState: 10 },
      { maxState: 5 },
      { initialState: 3 },
    );
    expect(statesManager.states.length).toBe(2);
    expect(statesManager.states[0].state).toBe(0);
    expect(statesManager.states[1].state).toBe(3);
    expect(statesManager.states[0].maxState).toBe(5);
    expect(statesManager.states[1].maxState).toBe(10);
  });
});
