import { States } from './states-manager.js';

interface Button {
  name?: string;
  modifications: { state: number; offset: number }[];
}

/**
 * Creates a puzzle with a given number of states and allows setting up buttons to change the states.
 * @param states The states to manage.
 * @example
 * const puzzle = new TogglePuzzle(new StatesManager(3, { initialState: 0, maxState: 10 }))
 * puzzle.addButton({ name: 'Change state #0', modifications: [ { state: 0, offset: 1 } ] })
 * puzzle.addButton({ name: 'Change state #0 and #1', modifications: [ { state: 0, offset: 1 }, { state: 1, offset: 1 } ] })
 * const button = puzzle.addButton({ name: 'Change state #1 by -1 and #2 by 2', modifications: [ { state: 1, offset: -1 }, { state: 2, offset: 2 } ] });
 * puzzle.pressButton(0), puzzle.getStates(); // [1, 0, 0]
 * puzzle.pressButton('Change state #0 and #1'), puzzle.getStates(); // [2, 1, 0]
 * puzzle.pressButton(button), puzzle.getStates(); // [2, 0, 2]
 * puzzle.pressButton(button), puzzle.getStates(); // [2, 9, 4]
 */
export class TogglePuzzle {
  constructor(public states: States) {}
  public readonly buttons: Button[] = [];

  /**
   * Adds a button to the puzzle.
   * @param button The button to add.
   * @returns this
   */
  addButton(button: Button) {
    // Validate Button.modifications[].state
    for (const modification of button.modifications) {
      if (
        modification.state < 0 ||
        modification.state >= this.states.states.length
      ) {
        throw new Error(`State index out of bounds: ${modification.state}`);
      }
    }

    this.buttons.push(button);
    return button;
  }

  /**
   * Finds a button by its name.
   * @param name The name of the button.
   * @returns The button with the given name or undefined if not found.
   */
  private findButtonByName(name: string) {
    return this.buttons.find((button) => button.name === name);
  }

  /**
   * Presses a button by its index or name, or by the button object itself.
   * @param button The index, name or button
   * @returns this
   */
  pressButton(button: number | string | Button) {
    const buttonObject =
      button instanceof Object
        ? button
        : typeof button === 'number'
        ? this.buttons[button]
        : this.findButtonByName(button);
    if (!buttonObject) {
      throw new Error('Button not found');
    }

    for (const modification of buttonObject.modifications) {
      this.states.states[modification.state].changeBy(modification.offset);
    }
  }

  /**
   * Returns the states of the puzzle.
   * @returns The states of the puzzle.
   */
  getStates(): number[] {
    return this.states.states.map((state) => state.state);
  }
}
