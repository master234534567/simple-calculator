export type Operator = "+" | "-" | "*" | "/";

export type CalculatorAction =
  | { type: "digit"; digit: string }
  | { type: "operator"; operator: Operator }
  | { type: "decimal" }
  | { type: "backspace" }
  | { type: "clear" }
  | { type: "enter" };

export interface CalculatorState {
  input: string;
  accumulator: number | null;
  pendingOperator: Operator | null;
  replaceInput: boolean;
  message: "Error" | "Allow pop-ups" | null;
}

export interface CalculatorTransition {
  state: CalculatorState;
  launch: boolean;
}

export const initialCalculatorState: CalculatorState = {
  input: "",
  accumulator: null,
  pendingOperator: null,
  replaceInput: false,
  message: null,
};

const operatorSymbols: Record<Operator, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "Error";
  return String(Number(value.toPrecision(10)));
}

function applyOperator(first: number, second: number, operator: Operator) {
  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  return second === 0 ? Number.NaN : first / second;
}

function calculationError(): CalculatorTransition {
  return {
    state: { ...initialCalculatorState, replaceInput: true, message: "Error" },
    launch: false,
  };
}

export function transitionCalculator(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorTransition {
  if (action.type === "clear") {
    return { state: initialCalculatorState, launch: false };
  }

  if (action.type === "digit") {
    const input = state.replaceInput ? "" : state.input;
    if (input.length >= 14) return { state, launch: false };

    const nextInput = input + action.digit;
    const nextState: CalculatorState = {
      ...state,
      input: nextInput,
      replaceInput: false,
      message: null,
    };

    return {
      state: nextState,
      launch:
        nextState.accumulator === null &&
        nextState.pendingOperator === null &&
        nextInput === "0000",
    };
  }

  if (action.type === "operator") {
    if (state.input === "" && state.accumulator === null) {
      return { state, launch: false };
    }

    let accumulator = state.accumulator;
    if (state.pendingOperator && state.input !== "") {
      accumulator = applyOperator(
        state.accumulator ?? 0,
        Number(state.input),
        state.pendingOperator,
      );
      if (!Number.isFinite(accumulator)) return calculationError();
    } else if (accumulator === null) {
      accumulator = Number(state.input || 0);
    }

    return {
      state: {
        input: "",
        accumulator,
        pendingOperator: action.operator,
        replaceInput: false,
        message: null,
      },
      launch: false,
    };
  }

  if (action.type === "enter") {
    if (state.input === "0000") return { state, launch: true };
    if (state.pendingOperator === null || state.input === "") {
      return { state, launch: false };
    }

    const result = applyOperator(
      state.accumulator ?? 0,
      Number(state.input),
      state.pendingOperator,
    );
    if (!Number.isFinite(result)) return calculationError();

    return {
      state: {
        input: formatNumber(result),
        accumulator: null,
        pendingOperator: null,
        replaceInput: true,
        message: null,
      },
      launch: false,
    };
  }

  if (action.type === "decimal") {
    let input = state.replaceInput ? "" : state.input;
    if (input === "") input = "0";
    if (!input.includes(".")) input += ".";

    return {
      state: { ...state, input, replaceInput: false, message: null },
      launch: false,
    };
  }

  if (state.replaceInput) return { state, launch: false };

  return {
    state: { ...state, input: state.input.slice(0, -1), message: null },
    launch: false,
  };
}

export function formatCalculatorDisplay(state: CalculatorState) {
  if (state.message) return state.message;

  if (state.pendingOperator) {
    return `${formatNumber(state.accumulator ?? 0)} ${operatorSymbols[state.pendingOperator]} ${state.input || "0"}`;
  }

  return state.input ||
    (state.accumulator === null ? "0" : formatNumber(state.accumulator));
}
