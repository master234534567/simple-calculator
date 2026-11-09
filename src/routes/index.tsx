import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import capturedCSS from "../styles/site.css?raw";
import {
  formatCalculatorDisplay,
  initialCalculatorState,
  transitionCalculator,
  type CalculatorAction,
} from "@/lib/calculator";

const libraryPath = "/calc/library.html";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calculator Launcher" },
      {
        name: "description",
        content: "A calculator with four basic operations, decimal input, and keyboard controls.",
      },
      { property: "og:title", content: "Calculator Launcher" },
      {
        property: "og:description",
        content: "A calculator with four basic operations, decimal input, and keyboard controls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  staticData: { importedDocument: { html: { lang: "en" }, body: {} } },
  component: Index,
});

const buttonClasses =
  "border-current rounded-[14px] border-none cursor-pointer text-[1.2rem] font-bold [border-image:none] [border-width:medium] [transition:transform_0.12s,background_0.12s] [&:active]:[transform:scale(0.98)]";

function Index() {
  const [calculator, setCalculator] = useState(initialCalculatorState);

  const dispatch = useCallback(
    (action: CalculatorAction) => {
      const transition = transitionCalculator(calculator, action);
      setCalculator(transition.state);

      if (!transition.launch) return;

      const libraryTab = window.open("about:blank", "_blank");
      if (!libraryTab) {
        setCalculator({
          ...transition.state,
          input: "",
          message: "Allow pop-ups",
        });
        return;
      }

      libraryTab.document.open();
      libraryTab.document.write(
        "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Loading...</title></head><body>Loading...</body></html>",
      );
      libraryTab.document.close();

      void fetch(libraryPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Could not load the library (${response.status})`);
          }
          return response.text();
        })
        .then((html) => {
          if (libraryTab.closed) return;

          const libraryDocument = new DOMParser().parseFromString(html, "text/html");
          if (!libraryDocument.querySelector("base")) {
            const base = libraryDocument.createElement("base");
            base.href = new URL("/calc/", window.location.origin).href;
            libraryDocument.head.prepend(base);
          }

          libraryTab.document.open();
          libraryTab.document.write(
            `<!DOCTYPE html>${libraryDocument.documentElement.outerHTML}`,
          );
          libraryTab.document.close();
        })
        .catch((error: unknown) => {
          if (libraryTab.closed) return;
          const message = error instanceof Error ? error.message : "Unknown error";
          libraryTab.document.body.textContent = `Could not load the library: ${message}`;
        });
    },
    [calculator],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let action: CalculatorAction | null = null;

      if (/^[0-9]$/.test(event.key)) {
        action = { type: "digit", digit: event.key };
      } else if (["+", "-", "*", "/"].includes(event.key)) {
        action = {
          type: "operator",
          operator: event.key as "+" | "-" | "*" | "/",
        };
      } else if (event.key === "Enter" || event.key === "=") {
        action = { type: "enter" };
      } else if (event.key === ".") {
        action = { type: "decimal" };
      } else if (event.key === "Backspace") {
        action = { type: "backspace" };
      } else if (event.key === "Escape" || event.key === "Delete") {
        action = { type: "clear" };
      }

      if (!action) return;
      event.preventDefault();
      dispatch(action);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <>
      <style>{capturedCSS}</style>
      <div
        className="bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-(--panel) border border-solid border-[#ffffff14] rounded-[22px] [box-shadow:rgba(0,0,0,0.45)_0px_30px_60px] w-[min(90vw,380px)]"
        id="calculator"
        aria-live="polite"
      >
        <div
          className="display items-center bg-none [background-position:0%_0%] [background-size:auto_auto] [background-repeat:repeat] [background-origin:padding-box] [background-clip:border-box] [background-attachment:scroll] bg-[#0a0f18e6] border border-solid border-[#7dd3fc38] rounded-[16px] text-(--primary) flex text-[clamp(2.2rem,6vw,3.5rem)] font-bold h-[110px] justify-end tracking-[0.08em] mb-[18px] overflow-hidden py-0 px-[18px] w-full"
          id="display"
        >
          {formatCalculatorDisplay(calculator)}
        </div>
        <div className="keypad grid gap-[12px] grid-cols-[repeat(4,1fr)]">
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="7" onClick={() => dispatch({ type: "digit", digit: "7" })}>7</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="8" onClick={() => dispatch({ type: "digit", digit: "8" })}>8</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="9" onClick={() => dispatch({ type: "digit", digit: "9" })}>9</button>
          <button className={`operator ${buttonClasses} text-(--primary)`} type="button" data-operator="/" onClick={() => dispatch({ type: "operator", operator: "/" })}>÷</button>

          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="4" onClick={() => dispatch({ type: "digit", digit: "4" })}>4</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="5" onClick={() => dispatch({ type: "digit", digit: "5" })}>5</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="6" onClick={() => dispatch({ type: "digit", digit: "6" })}>6</button>
          <button className={`operator ${buttonClasses} text-(--primary)`} type="button" data-operator="*" onClick={() => dispatch({ type: "operator", operator: "*" })}>×</button>

          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="1" onClick={() => dispatch({ type: "digit", digit: "1" })}>1</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="2" onClick={() => dispatch({ type: "digit", digit: "2" })}>2</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="3" onClick={() => dispatch({ type: "digit", digit: "3" })}>3</button>
          <button className={`operator ${buttonClasses} text-(--primary)`} type="button" data-operator="-" onClick={() => dispatch({ type: "operator", operator: "-" })}>−</button>

          <button className={`danger ${buttonClasses} text-[#fecaca]`} type="button" data-action="clear" onClick={() => dispatch({ type: "clear" })}>C</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-digit="0" onClick={() => dispatch({ type: "digit", digit: "0" })}>0</button>
          <button className={`${buttonClasses} text-(--text)`} type="button" data-action="decimal" onClick={() => dispatch({ type: "decimal" })}>.</button>
          <button className={`operator ${buttonClasses} text-(--primary)`} type="button" data-operator="+" onClick={() => dispatch({ type: "operator", operator: "+" })}>+</button>

          <button className={`action ${buttonClasses} text-(--accent)`} type="button" data-action="backspace" aria-label="Backspace" onClick={() => dispatch({ type: "backspace" })}>⌫</button>
          <button className={`action equals ${buttonClasses} col-span-3 text-(--accent)`} type="button" data-action="enter" onClick={() => dispatch({ type: "enter" })}>=</button>
        </div>
      </div>
    </>
  );
}
