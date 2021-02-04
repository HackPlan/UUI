import React, { useCallback, useMemo, useRef, useState, useImperativeHandle } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { range, debounce, padStart } from 'lodash-es';

export interface TimeSelectValue {
  hour: number;
  minute: number;
  second: number;
}
export interface TimeSelectFeatureProps {
  value: TimeSelectValue;
  onChange: (value: TimeSelectValue) => void;
}

export const TimeSelectValuePropTypes = PropTypes.shape({
  hour: PropTypes.number.isRequired,
  minute: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
})
export const TimeSelectPropTypes = createComponentPropTypes<TimeSelectFeatureProps>({
  value: TimeSelectValuePropTypes,
  onChange: PropTypes.func.isRequired,
})

export const TimeSelect = UUIFunctionComponent({
  name: 'TimeSelect',
  nodes: {
    Root: 'div',
    SelectZone: 'div',
    Separator: 'div',
    OptionList: 'div',
    Option: 'div',
  },
  propTypes: TimeSelectPropTypes,
}, (props: TimeSelectFeatureProps, { nodes, NodeDataProps, ref }) => {
  const {
    Root, SelectZone, Separator,
    OptionList, Option,
  } = nodes

  const allOptions = useMemo(() => {
    return {
      hour: range(0, 24),
      minute: range(0, 60),
      second: range(0, 60),
    }
  }, [])

  const [disableHandleScroll, setDisableHandleScroll] = useState(false)
  const hourListRef = useRef<HTMLDivElement | null>(null)
  const minuteListRef = useRef<HTMLDivElement | null>(null)
  const secondListRef = useRef<HTMLDivElement | null>(null)

  const getItemHeight = useCallback((target: HTMLElement) => {
    const styles = window.getComputedStyle(target)
    const optionHeightPx = styles.getPropertyValue('--option-height')
    return Number(optionHeightPx.replace('px', ''))
  }, [])
  const scrollToValue = useCallback((type: keyof TimeSelectValue, value: number, animate = true) => {
    const ref = { hour: hourListRef, minute: minuteListRef, second: secondListRef }[type]
    if (ref.current) {
      const target = ref.current as HTMLElement
      const itemHeight = getItemHeight(target)
      target.scrollTo({ top: value * itemHeight, behavior: animate ? "smooth" : "auto" })
    }
  }, [getItemHeight])

  useImperativeHandle(ref, () => {
    return {
      scrollToValue: (value: TimeSelectValue, animate?: boolean) => {
        setDisableHandleScroll(true)
        scrollToValue('hour', value.hour, animate)
        scrollToValue('minute', value.minute, animate)
        scrollToValue('second', value.second, animate)
        setTimeout(() => {
          setDisableHandleScroll(false)
        }, 500)
      }
    }
  })

  const debouncedScrollTo = useRef(debounce((target: HTMLElement, top: number) => {
    target.scrollTo({ top, behavior: "smooth" })
  }, 300))

  const handleScroll = useCallback((type: keyof TimeSelectValue) => {
    if (disableHandleScroll) return;
    const options = allOptions[type]
    return (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLElement
      const itemHeight = getItemHeight(target)
      const scrollTop = target.scrollTop
      const currentIndex = Math.round((scrollTop) / itemHeight)

      const newValue = options[currentIndex];
      if (props.value[type] !== newValue) {
        props.onChange({ ...props.value, [type]: newValue })
      }

      debouncedScrollTo.current(target, currentIndex * itemHeight)
    }
  }, [allOptions, disableHandleScroll, getItemHeight, props])

  return (
    <Root>
      {TimeSelectTypeArray.map((type, index) => {
        return (
          <React.Fragment key={type}>
            {index !== 0 && (
              <Separator>:</Separator>
            )}
            <OptionList
              ref={[hourListRef, minuteListRef, secondListRef][index]}
              key={`option-list-${type}`}
              onScroll={handleScroll(type)}
            >
              {allOptions[type].map((option) => {
                const active = props.value[type] === option;
                return (
                  <Option
                    {...NodeDataProps({
                      'active': active,
                    })}
                    key={option}
                  >{padStart(String(option), 2, '0')}</Option>
                )
              })}
            </OptionList>
          </React.Fragment>
        )
      })}
      <SelectZone />
    </Root>
  )
})

const TimeSelectTypeArray = ['hour', 'minute', 'second'] as const;

export type TimeSelectProps = UUIFunctionComponentProps<typeof TimeSelect>
