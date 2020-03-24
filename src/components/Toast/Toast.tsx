import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';

export enum ToastNodeName {
  Toast = "toast",
  Root = "root",
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, StylishProps<ToastNodeName> {
  /** Message to display in the body of the toast. */
  message: React.ReactNode;
  /**
   * Callback invoked when the toast is dismissed, either by the user or by the timeout.
   * The value of the argument indicates whether the toast was closed because the timeout expired.
   */
  onDismiss?: (id: string) => void;

  /**
   * Milliseconds to wait before automatically dismissing toast.
   * Providing a value less than or equal to 0 will disable the timeout (this is discouraged).
   * @default 5000
   */
  timeout?: number;
}
export type IToast = ToastProps & { id: string }


export function Toast(props: IToast) {
  const timeout = props.timeout || 5000

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(ToastNodeName.Toast, props, { prefix: "uui" })
    return [
      stylished.element('div', ToastNodeName.Root),
    ]
  }, [])

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    startTimer()
  }, [])

  const startTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { props.onDismiss && props.onDismiss(props.id) }, timeout)
  }, [timer])

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
  }, [timer])

  return (
    <Root
      {...omit(props, 'message', 'onDismiss')}
      className={"u-p-4 u-mb-4 u-bg-white u-shadow-md u-border u-border-black u-py-1 u-px-2"}
      onBlur={() => { startTimer() }}
      onFocus={() => { clearTimer() }}
      onMouseEnter={() => { clearTimer() }}
      onMouseLeave={() => { startTimer() }}
    >
      {props.message}
    </Root>
  )
}