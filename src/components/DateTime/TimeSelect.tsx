import React, { useCallback, useMemo, useRef, useState, useImperativeHandle } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { range, debounce, padStart } from 'lodash-es';
import { set } from 'date-fns';

const TimeSelectTypeArray = ['hours', 'minutes', 'seconds'] as const;
type TimeSelectType = typeof TimeSelectTypeArray[number]

export interface TimeSelectFeatureProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const TimeSelectPropTypes = createComponentPropTypes<TimeSelectFeatureProps>({
  value: PropTypes.instanceOf(Date).isRequired,
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
      hours: range(0, 24),
      minutes: range(0, 60),
      seconds: range(0, 60),
    }
  }, [])

  const activeOptionValue = {
    hours: props.value.getHours(),
    minutes: props.value.getMinutes(),
    seconds: props.value.getSeconds(),
  }

  const [disableHandleScroll, setDisableHandleScroll] = useState(false)
  const hourListRef = useRef<HTMLDivElement | null>(null)
  const minuteListRef = useRef<HTMLDivElement | null>(null)
  const secondListRef = useRef<HTMLDivElement | null>(null)

  const getItemHeight = useCallback((target: HTMLElement) => {
    const styles = window.getComputedStyle(target)
    const optionHeightPx = styles.getPropertyValue('--option-height')
    return Number(optionHeightPx.replace('px', ''))
  }, [])
  const scrollToValue = useCallback((value: Date, animate?: boolean) => {
    setDisableHandleScroll(true)
    const targetScrollTo = (ref: React.MutableRefObject<HTMLDivElement | null>, value: number, animate?: boolean) => {
      const target = ref.current as HTMLElement
      const itemHeight = getItemHeight(target)
      target.scrollTo({ top: value * itemHeight, behavior: animate ? "smooth" : "auto" })
    }
    if (props.value && props.value.getHours() !== value.getHours()) {
      targetScrollTo(hourListRef, value.getHours(), animate)
    }
    if (props.value && props.value.getMinutes() !== value.getMinutes()) {
      targetScrollTo(minuteListRef, value.getMinutes(), animate)
    }
    if (props.value && props.value.getSeconds() !== value.getSeconds()) {
      targetScrollTo(secondListRef, value.getSeconds(), animate)
    }
    setTimeout(() => {
      setDisableHandleScroll(false)
    }, 500)
  }, [getItemHeight, props.value])

  useImperativeHandle(ref, () => {
    return {
      scrollToValue: scrollToValue,
    }
  })

  const scrollTo = useCallback((target: HTMLElement, top: number) => {
    target.scrollTo({ top, behavior: "smooth" })
  }, [])

  const debouncedScrollOnChange = useRef({
    hours: debounce(scrollTo, 300),
    minutes: debounce(scrollTo, 300),
    seconds: debounce(scrollTo, 300),
  })

  const handleScroll = useCallback((type: TimeSelectType) => {
    if (disableHandleScroll) return;
    const options = allOptions[type]
    return (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLElement
      const itemHeight = getItemHeight(target)
      const scrollTop = target.scrollTop
      const currentIndex = Math.round((scrollTop) / itemHeight)

      const newValue = options[currentIndex];
      props.onChange(set(props.value, { [type]: newValue }))
      debouncedScrollOnChange.current[type](target, currentIndex * itemHeight)
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
                const active = activeOptionValue[type] === option
                return (
                  <Option
                    {...NodeDataProps({
                      'active': active,
                    })}
                    key={`${type}-${option}`}
                    onClick={() => {
                      const newValue = set(props.value, { [type]: option })
                      props.onChange(newValue)
                      scrollToValue(newValue)
                    }}
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

export type TimeSelectProps = UUIFunctionComponentProps<typeof TimeSelect>
