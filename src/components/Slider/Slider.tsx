
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { UUI } from '../../core/uui';
import { useEvent } from 'react-use';
import { clamp, clone, inRange, isArray } from 'lodash';
import classNames from 'classnames';

export interface SliderRemark {
  value: number;
  label: React.ReactNode;
}

export interface SliderFeatureProps {
  /**
   * The value to display in the input field.
   */
  value: [number, number] | number;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: [number, number] | number) => void;
  /**
   * The minimum value of the input.
   */
  min: number;
  /**
   * The maximum value of the input.
   */
  max: number;
  /**
   * The step sets the stepping interval when clicking up and down spinner buttons.
   */
  step: number;
  /**
   * Tick mark, the value is in the closed interval [min, max].
   * @default []
   */
  remarks?: SliderRemark[];
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to render the Slider vertically. Defaults to rendering horizontal.
   * @default false
   */
  vertical?: boolean;
}

export const Slider = UUI.FunctionComponent({
  name: 'Slider',
  nodes: {
    Root: 'div',
    Container: 'div',
    ActiveLine: 'div',
    InactiveLine: 'div',
    Thumb: 'div',
    Remark: 'div',
    RemarkLabel: 'div',
  }
}, (props: SliderFeatureProps, nodes) => {
  const { Root, Container, ActiveLine, InactiveLine, Thumb, Remark, RemarkLabel } = nodes

  const finalProps = {
    remarks: props.remarks || [],
  }

  /**
   * Due to Slider supports the selection of a value or a range of values,
   * a unified interface is needed to handle what type of data the component should return.
   */
  const finalValue = useMemo(() => {
    return [
      typeof props.value === 'number' ? props.min : props.value[0],
      typeof props.value === 'number' ? props.value : props.value[1],
    ] as const
  }, [props.min, props.value])
  const onFinalChange = useCallback((value: [number, number]) => {
    const newValue: [number, number] = [Number(value[0].toFixed(8)), Number(value[1].toFixed(8))]
    if (typeof props.value === 'number') {
      props.onChange.call(undefined, newValue[1])
    } else {
      props.onChange.call(undefined, newValue)
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
  }, [finalValue, props.min, props.max])
  const containerRef = useRef<any>()
  const getPositionFromEvent = (event: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const leadingPosition = props.vertical ? containerRect.bottom : containerRect.left
    const trailingPosition = props.vertical ? containerRect.top : containerRect.right

    const currentPosition = (() => {
      switch (event.type) {
        case 'mousedown':
        case 'mousemove':
        case 'click':
            return props.vertical ? (event as MouseEvent).clientY : (event as MouseEvent).clientX
        case 'touchstart':
        case 'touchmove':
          return props.vertical ? (event as TouchEvent).touches[0].clientY :(event as TouchEvent).touches[0].clientX
        default:
          return null
      }
    })();
    if (!currentPosition) return null
    let newPosition = (currentPosition - leadingPosition) / (trailingPosition - leadingPosition)
    newPosition = clamp(newPosition, 0.00, 1.00)
    return newPosition
  }
  const onMouseDownOrTouchStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (props.disabled) return;
    const newPosition = getPositionFromEvent(event as any)
    if (!newPosition) return;

    const targetIndex = isArray(props.value)
      ? (Math.abs(finalPosition[0] - newPosition) < Math.abs(finalPosition[1] - newPosition) ? 0 : 1)
      : 1;
    !props.disabled && setThumbDragging(targetIndex)

    const newValue = Math.round((props.max-props.min) / props.step * newPosition) * props.step + props.min
    setFinalPosition((value) => {
      value[targetIndex] = newPosition
      return value
    })
    if (newValue !== props.value) {
      const newFinalValue: [number, number] = [finalValue[0], finalValue[1]]
      newFinalValue[targetIndex] = newValue
      onFinalChange(newFinalValue)
    }
  }
  const onMouseUpOrTouchEnd = () => { !props.disabled && setThumbDragging(null) }
  const onMouseOrTouchMove = (event: MouseEvent | TouchEvent) => {
    if (props.disabled) return;
    if (thumbDragging === null) return;
    const newPosition = getPositionFromEvent(event)
    if (newPosition === null) return;

    const newValue = Math.round((props.max-props.min) / props.step * newPosition) * props.step + props.min
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
   * Calculate the position and size of thumbs, remarks and lines.
   */
  const styles = useMemo(() => {
    const sortPosition = clone(finalPosition).sort()
    switch (props.vertical) {
      case false:
      case undefined:
        return {
          LeadingInactiveLine: {
            width: toPercentage(sortPosition[0]),
            display: typeof props.value === 'number' ? 'none' : undefined,
          },
          ActiveLine: {
            width: toPercentage(sortPosition[1] - sortPosition[0]),
          },
          TrailingInactiveLine: {
            width: toPercentage(1 - sortPosition[1]),
          },
          LeadingThumb: {
            left: toPercentage(finalPosition[0]),
            display: typeof props.value === 'number' ? 'none' : undefined,
            transform: 'translateX(-50%)',
          },
          TrailingThumb: {
            left: toPercentage(finalPosition[1]),
            transform: 'translateX(-50%)',
          },
          Remark: finalProps.remarks.map((remark) => {
            const position = (remark.value - props.min) / (props.max - props.min)
            return {
              left: toPercentage(position),
              transform: 'translateX(-50%)',
            }
          })
        }
      case true:
        return {
          TrailingInactiveLine: {
            height: toPercentage(sortPosition[0]),
            display: typeof props.value === 'number' ? 'none' : undefined,
          },
          ActiveLine: {
            height: toPercentage(sortPosition[1] - sortPosition[0]),
          },
          LeadingInactiveLine: {
            height: toPercentage(1 - sortPosition[1]),
          },
          LeadingThumb: {
            bottom: toPercentage(finalPosition[0]),
            display: typeof props.value === 'number' ? 'none' : undefined,
            transform: 'translateY(50%)',
          },
          TrailingThumb: {
            bottom: toPercentage(finalPosition[1]),
            transform: 'translateY(50%)',
          },
          Remark: finalProps.remarks.map((remark) => {
            const position = (remark.value - props.min) / (props.max - props.min)
            return {
              bottom: toPercentage(position),
              transform: 'translateY(50%)',
            }
          })
        }
    }
  }, [finalPosition, props.value, props.max, props.min, props.vertical, finalProps.remarks])

  return (
    <Root
      className={classNames({
        'STATE_disabled': props.disabled,
        'STATE_vertical': props.vertical,
      })}
      onMouseDown={onMouseDownOrTouchStart}
      onTouchStart={onMouseDownOrTouchStart}
    >
      <Container ref={containerRef}>
        <InactiveLine style={{ ...styles.LeadingInactiveLine }} />
        <ActiveLine style={{ ...styles.ActiveLine }} />
        <InactiveLine style={{ ...styles.TrailingInactiveLine }} />
        {finalProps.remarks.map((remark, index) => {
          const isActive = inRange(remark.value, finalValue[0], finalValue[1])
          return (
            <Remark
              key={index}
              className={classNames({ 'STATE_active': isActive })}
              style={{ ...styles.Remark[index] }}
            >
              <RemarkLabel>{remark.label}</RemarkLabel>
            </Remark>
          )
        })}
        <Thumb style={{ ...styles.LeadingThumb }} />
        <Thumb style={{ ...styles.TrailingThumb }} />

      </Container>
    </Root>
  )
})

export type SliderProps = Parameters<typeof Slider>[0]

const toPercentage = (n: number) => `${(n * 100).toFixed(4)}%`
