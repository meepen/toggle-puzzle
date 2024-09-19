import { State, StateConfig } from './state.js';

export interface States {
  states: State[];
}

/**
 * Manages the states of a puzzle.
 * @template Config The global configuration for all states.
 * @template InidividualConfig The individual configuration for each state.
 * @param globalStateConfig The global configuration for all states.
 * @param individualStates The individual configuration for each state.
 * @param stateCount The number of states to manage.
 * @param stateConfig The configuration for each individual state.
 * @example
 * const statesManager = new StatesManager({ initialState: 0, maxState: 10 }, { maxState: 5 }, { initialState: 3 });
 * statesManages.states.length; // 2
 * statesManager.states[0].state; // 0
 * statesManager.states[1].state; // 3
 * statesManager.states[0].maxState; // 5
 * statesManager.states[1].maxState; // 10
 * @example
 * const statesManager = new StatesManager(3, { initialState: 0, maxState: 10 });
 * statesManages.states.length; // 3
 * statesManager.states[0].state; // 0
 * statesManager.states[1].state; // 0
 * statesManager.states[2].state; // 0
 * statesManager.states[0].maxState; // 10
 * statesManager.states[1].maxState; // 10
 * statesManager.states[2].maxState; // 10
 */
export class StatesManager<
  Config extends Partial<StateConfig> = StateConfig,
  InidividualConfig extends Partial<StateConfig> &
    Omit<StateConfig, keyof Config> = Omit<StateConfig, keyof Config>,
> implements States
{
  public constructor(
    globalStateConfig: Config,
    ...individualStates: InidividualConfig[]
  );
  public constructor(stateCount: number, stateConfig: StateConfig);
  constructor(
    ...args: [Config, ...InidividualConfig[]] | [number, StateConfig]
  ) {
    const config = (typeof args[0] === 'number' ? args[1] : args[0]) as Config;
    const stateCount = typeof args[0] === 'number' ? args[0] : args.length - 1;

    this.states = new Array(stateCount).fill(null).map((_, i) => {
      const individualConfig =
        typeof args[0] === 'number' ? null : (args[i + 1] as InidividualConfig);
      return this.loadState(config, individualConfig);
    });
  }

  private loadState(
    globalConfig: Config,
    individualConfig: InidividualConfig | null,
  ): State {
    const stateConfig = {
      ...globalConfig,
      ...(individualConfig ?? {}),
    } as StateConfig;
    return new State(stateConfig);
  }

  states: State[];
}
