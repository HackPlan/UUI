import { useEffect, useState } from "react";

/**
 * An useful tool to manage component's inner state.
 */
export function usePendingValue<T>(initialValue: T, onFinalChange: (finalValue: T) => void) {
  const [_innerValue, _setInnerValue] = useState<T>(initialValue)
  useEffect(() => { _setInnerValue(initialValue) }, [initialValue])

  const innerValue = _innerValue
  const setInnerValue = (value: T, confirm = false) => {
    if (confirm) onFinalChange(value)
    else _setInnerValue(value)
  }
  const resetInnerValue = () => { setInnerValue(initialValue) }
  return [innerValue, setInnerValue, resetInnerValue] as const
}