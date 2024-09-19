import { State, StateConfig } from './state.js';
import { TogglePuzzle } from './toggle-puzzle.js';
import { describe, expect, it } from 'vitest';

describe('TogglePuzzle', {}, () => {
  const stateConfig: StateConfig = {
    initialState: 0,
    maxState: 10,
  };

  describe('addButton', {}, () => {
    it('should add a button to the puzzle', () => {
      const puzzle = new TogglePuzzle({ states: [new State(stateConfig)] });
      puzzle.addButton({
        name: 'Change state #0',
        modifications: [{ state: 0, offset: 1 }],
      });
      expect(puzzle.buttons.length).toBe(1);
    });
    it('should return the button', () => {
      const puzzle = new TogglePuzzle({ states: [new State(stateConfig)] });
      const buttonObject = {
        name: 'Change state #0',
        modifications: [{ state: 0, offset: 1 }],
      };
      const button = puzzle.addButton(buttonObject);
      expect(button).toEqual(buttonObject);
    });

    it('should throw an error if the state index is out of bounds', () => {
      const puzzle = new TogglePuzzle({ states: [] });
      expect(() =>
        puzzle.addButton({
          name: 'Change state #0',
          modifications: [{ state: 1, offset: 1 }],
        }),
      ).toThrow(new Error('State index out of bounds: 1'));
    });
  });

  describe('pressButton', {}, () => {
    it('should accept a button index', () => {
      const puzzle = new TogglePuzzle({ states: [new State(stateConfig)] });
      puzzle.addButton({
        name: 'Change state #0',
        modifications: [{ state: 0, offset: 1 }],
      });
      puzzle.pressButton(0);
    });

    it('should accept a button name', () => {
      const puzzle = new TogglePuzzle({ states: [new State(stateConfig)] });
      const button = {
        name: 'Change state #0',
        modifications: [{ state: 0, offset: 1 }],
      };
      puzzle.addButton(button);
      puzzle.pressButton(button.name);
    });

    it('should accept a button object', () => {
      const puzzle = new TogglePuzzle({ states: [new State(stateConfig)] });
      const button = puzzle.addButton({
        name: 'Change state #0',
        modifications: [{ state: 0, offset: 1 }],
      });
      puzzle.pressButton(button);
    });

    it('should a single modification on the states', () => {
      const puzzle = new TogglePuzzle({ states: [new State(stateConfig)] });
      puzzle.addButton({
        name: 'Change state #0',
        modifications: [{ state: 0, offset: 1 }],
      });
      puzzle.pressButton(0);
      expect(puzzle.getStates()).toEqual([1]);
    });

    it('should apply multiple modifications on the states', () => {
      const puzzle = new TogglePuzzle({
        states: [new State(stateConfig), new State(stateConfig)],
      });
      puzzle.addButton({
        name: 'Change state #0 and #1',
        modifications: [
          { state: 0, offset: 1 },
          { state: 1, offset: 1 },
        ],
      });
      puzzle.pressButton(0);
      expect(puzzle.getStates()).toEqual([1, 1]);
    });
  });
});
