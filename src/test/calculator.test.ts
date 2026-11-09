import { describe, expect, it } from "vitest";

import {
  formatCalculatorDisplay,
  initialCalculatorState,
  transitionCalculator,
  type CalculatorAction,
  type CalculatorState,
} from "@/lib/calculator";

function run(actions: CalculatorAction[]): CalculatorState {
  return actions.reduce(
    (state, action) => transitionCalculator(state, action).state,
    initialCalculatorState,
  );
}

const digit = (value: string): CalculatorAction => ({ type: "digit", digit: value });
const operator = (value: "+" | "-" | "*" | "/"): CalculatorAction => ({
  type: "operator",
  operator: value,
});
const enter: CalculatorAction = { type: "enter" };

describe("calculator behavior", () => {
  it("adds 12 and 3 to display 15", () => {
    const state = run([digit("1"), digit("2"), operator("+"), digit("3"), enter]);
    expect(formatCalculatorDisplay(state)).toBe("15");
  });

  it("subtracts 8 from 5 to display -3", () => {
    const state = run([digit("5"), operator("-"), digit("8"), enter]);
    expect(formatCalculatorDisplay(state)).toBe("-3");
  });

  it("multiplies 7 by 8 to display 56", () => {
    const state = run([digit("7"), operator("*"), digit("8"), enter]);
    expect(formatCalculatorDisplay(state)).toBe("56");
  });

  it("divides 9 by 2 to display 4.5", () => {
    const state = run([digit("9"), operator("/"), digit("2"), enter]);
    expect(formatCalculatorDisplay(state)).toBe("4.5");
  });

  it("adds decimal values 1.2 and 3.4 to display 4.6", () => {
    const state = run([
      digit("1"),
      { type: "decimal" },
      digit("2"),
      operator("+"),
      digit("3"),
      { type: "decimal" },
      digit("4"),
      enter,
    ]);
    expect(formatCalculatorDisplay(state)).toBe("4.6");
  });

  it("removes the final digit with backspace", () => {
    const state = run([digit("1"), digit("2"), digit("3"), { type: "backspace" }]);
    expect(formatCalculatorDisplay(state)).toBe("12");
  });

  it("clears entered digits back to zero", () => {
    const state = run([digit("1"), { type: "clear" }]);
    expect(formatCalculatorDisplay(state)).toBe("0");
  });

  it("shows Error when dividing by zero", () => {
    const state = run([digit("8"), operator("/"), digit("0"), enter]);
    expect(formatCalculatorDisplay(state)).toBe("Error");
  });

  it("requests the library when the fourth zero is entered", () => {
    const transition = transitionCalculator(
      run([digit("0"), digit("0"), digit("0")]),
      digit("0"),
    );
    expect(transition.launch).toBe(true);
    expect(formatCalculatorDisplay(transition.state)).toBe("0000");
  });
});
