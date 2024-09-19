export interface StateConfig {
  initialState: number;
  maxState: number;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export class State {
  public constructor(config: StateConfig) {
    if (config.maxState < 0) {
      throw new Error('maxState must be a positive number');
    }
    this.state = mod(config.initialState, config.maxState);
    this.maxState = config.maxState;
  }

  /**
   * Changes the state by a given offset.
   * If the offset is negative, the state will be decremented.
   * Will wrap between 0 and maxState - 1 if the offset is large enough.
   * @param offset The offset to change the state by. Negative values will decrement the state.
   * @returns this
   */
  changeBy(offset: number) {
    this.state = mod(this.state + offset, this.maxState);
    return this;
  }

  state: number;
  maxState: number;
}
