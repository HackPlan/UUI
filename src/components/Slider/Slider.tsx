
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { UUI } from '../../utils/uui';
import './Slider.scss';
import { useEvent } from 'react-use';
import { clamp, clone } from 'lodash';
import classNames from 'classnames';

export interface BaseSliderProps {
  /**
   * The value to display in the input field.
   */
  value: [number, number] | number
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: [number, number] | number) => void
  /**
   * The minimum value of the input.
   */
  min: number
  /**
   * The maximum value of the input.
   */
  max: number
  /**
   * The step sets the stepping interval when clicking up and down spinner buttons.
   */
  step: number
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean
}

export const Slider = UUI.FunctionComponent({
  name: 'Slider',
  nodes: {
    Root: 'div',
    Container: 'div',
    ActiveLine: 'div',
    InactiveLine: 'div',
    Thumb: 'div',
  }
}, (props: BaseSliderProps, nodes) => {
  const { Root, Container, ActiveLine, InactiveLine, Thumb } = nodes

  /**
   * Due to Slider supports the selection of a value or a range of values,
   * a unified interface is needed to handle what type of data the component should return.
   */
  const finalValue = useMemo(() => {
    const thumb1  = typeof props.value === 'number' ? 0 : props.value[0]
    const thumb2 = typeof props.value === 'number' ? props.value : props.value[1]
    return [thumb1, thumb2] as const
  }, [props.value])
  const onFinalChange = useCallback((value: [number, number]) => {
    if (typeof props.value === 'number') {
      props.onChange(value[1])
    } else {
      props.onChange(value)
    }
  }, [props.value, props.onChange])

  /**
   * Handle thumbs position
   */
  const [thumbDragging, setThumbDragging] = useState<0 | 1 | null>(null)
  const [finalPosition, setFinalPosition] = useState<[number, number]>([
    (finalValue[0]-props.min) / (props.max-props.min),
    (finalValue[1]-props.min) / (props.max-props.min),
  ])
  useEffect(() => {
    setFinalPosition([
      (finalValue[0]-props.min) / (props.max-props.min),
      (finalValue[1]-props.min) / (props.max-props.min),
    ])
  }, [finalValue])
  const containerRef = useRef<any>()
  const getPositionFromEvent = (event: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const leadingPosition = containerRect.left
    const trailingPosition = containerRect.right
    const currentPosition = (() => {
      switch (event.type) {
        case 'mousedown':
        case 'mousemove':
          return (event as MouseEvent).clientX
        case 'touchstart':
        case 'touchmove':
          return (event as TouchEvent).touches[0].clientX
        default:
          return null
      }
    })();
    if (!currentPosition) return null
    let newPosition = (currentPosition - leadingPosition) / (trailingPosition - leadingPosition)
    newPosition = clamp(newPosition, 0.00, 1.00)
    return newPosition
  }
  const onMouseDownOrTouchStart = (thumb: 0 | 1) => () => { !props.disabled && setThumbDragging(thumb) }
  const onMouseUpOrTouchEnd = () => { !props.disabled && setThumbDragging(null) }
  const onMouseOrTouchMove = (event: MouseEvent | TouchEvent) => {
    if (props.disabled) return
    if (thumbDragging === null) return
    const newPosition = getPositionFromEvent(event)
    if (newPosition === null) return
    const newValue = Math.round((props.max-props.min) / props.step * newPosition) * props.step
    setFinalPosition((value) => {
      value[thumbDragging] = newPosition
      return value
    })
    if (newValue !== props.value) {
      const newFinalValue: [number, number] = [finalValue[0], finalValue[1]]
      newFinalValue[thumbDragging] = newValue
      onFinalChange(newFinalValue)
    }
  }
  useEvent('mousemove', onMouseOrTouchMove as any, window, { capture: !props.disabled && !!thumbDragging })
  useEvent('touchmove', onMouseOrTouchMove as any, window, { capture: !props.disabled && !!thumbDragging })
  useEvent('mouseup', onMouseUpOrTouchEnd as any, window, { capture: !props.disabled && !!thumbDragging })
  useEvent('touchend', onMouseUpOrTouchEnd as any, window, { capture: !props.disabled && !!thumbDragging })

  /**
   * Calculate the position and size of lines and thumbs.
   */
  const styles = useMemo((): { [key: string]: React.CSSProperties } => {
    const sortPosition = clone(finalPosition).sort()
    return {
      LeadingInactiveLine: {
        width: toPercentage(sortPosition[0]),
        display: typeof props.value === 'number' ? 'none' : undefined,
      },
      ActiveLine: {
        width: toPercentage(sortPosition[1]-sortPosition[0]),
      },
      TrailingInactiveLine: {
        width: toPercentage(1-sortPosition[1]),
      },
      LeadingThumb: {
        left: toPercentage(finalPosition[0]),
        display: typeof props.value === 'number' ? 'none' : undefined,
      },
      TrailingThumb: {
        left: toPercentage(finalPosition[1]),
      }
    }
  }, [finalPosition])

  return (
    <Root className={classNames({ 'disabled': props.disabled })}>
      <Container ref={containerRef}>
        <InactiveLine style={{ ...styles.LeadingInactiveLine }} />
        <ActiveLine style={{ ...styles.ActiveLine }} />
        <InactiveLine style={{ ...styles.TrailingInactiveLine }} />
        <Thumb
          style={{ ...styles.LeadingThumb }}
          onMouseDown={onMouseDownOrTouchStart(0) as any}
        />
        <Thumb
          style={{ ...styles.TrailingThumb }}
          onMouseDown={onMouseDownOrTouchStart(1) as any}
        />
      </Container>
    </Root>
  )
})

export type SliderProps = Parameters<typeof Slider>[0]

const toPercentage = (n: number) => `${(n * 100).toFixed(4)}%`
