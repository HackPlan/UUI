import React from "react";

export interface RadioGroupContextValue {
  value: string | number;
  onChange: (value: string | number) => void;
  focusValue: string | number;
}
export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)