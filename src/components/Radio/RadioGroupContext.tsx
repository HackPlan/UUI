import React from "react";

export interface RadioGroupContextValue {
  value: string | number;
  onChange: (value: string | number) => void;
  focusValue: string | number;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)