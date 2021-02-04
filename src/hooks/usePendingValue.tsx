import { useState, useCallback } from "react";

/**
 * An useful tool to manage component's inner state.
 */
export function usePendingValue<T>(initialValue: T, onFinalChange: (finalValue: T) => void) {
  const [_innerValue, _setInnerValue] = useState<T>(initialValue)

  const innerValue = _innerValue
  const setInnerValue = useCallback((newValue: React.SetStateAction<T>, confirm = false) => {
    _setInnerValue((value) => {
      if (confirm) {
        onFinalChange((typeof newValue === 'function') ? (newValue as any)(value) : newValue)
      }
      return (typeof newValue === 'function') ? (newValue as any)(value) : newValue
    })
  }, [onFinalChange])
  const resetInnerValue = useCallback(() => { setInnerValue(initialValue) }, [initialValue, setInnerValue])
  return [innerValue, setInnerValue, resetInnerValue] as const
}