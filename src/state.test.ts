import { State } from './state.js';
import { describe, expect, it } from 'vitest';

describe('State', {}, () => {
  it('should create a state with a given initial state and max state', () => {
    const state = new State({ initialState: 0, maxState: 10 });
    expect(state.state).toBe(0);
    expect(state.maxState).toBe(10);
  });

  it('should throw an error if maxState is negative', () => {
    expect(() => new State({ initialState: 0, maxState: -1 })).toThrow(
      new Error('maxState must be a positive number'),
    );
  });

  it('should wrap the initialState between 0 and maxState - 1', () => {
    const state = new State({ initialState: 10, maxState: 10 });
    expect(state.state).toBe(0);
  });

  describe('changeBy', {}, () => {
    it('should change the state by a given offset', () => {
      const state = new State({ initialState: 0, maxState: 10 });
      state.changeBy(1);
      expect(state.state).toBe(1);
    });

    it('should decrement the state if the offset is negative', () => {
      const state = new State({ initialState: 1, maxState: 10 });
      state.changeBy(-1);
      expect(state.state).toBe(0);
    });

    it('should wrap between 0 and maxState - 1 if the offset is large enough', () => {
      const state = new State({ initialState: 0, maxState: 10 });
      state.changeBy(10);
      expect(state.state).toBe(0);
    });

    it('should wrap between 0 and maxState - 1 if the offset is negative and large enough', () => {
      const state = new State({ initialState: 0, maxState: 10 });
      state.changeBy(-1);
      expect(state.state).toBe(9);
    });
  });
});
