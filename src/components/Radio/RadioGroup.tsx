import React, { useMemo, useState } from 'react';
import { RadioFeatureProps, Radio } from './Radio';
import { UUI, UUIComponentProps } from '../../core/uui';
import { KeyCode } from '../../utils/keyboardHelper';
import { getValidTypeChildren } from '../../utils/componentHelper';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioGroupFeatureProps<T extends string | number> {
  /**
   * The name of a group of radios
   * @default none
   */
  name?: string;
  /**
   * The value of selected radio.
   *
   * T should be string or number.
   */
  value: T;
  /**
   * Callback invokes when user change to select radio.
   */
  onChange: (value: T) => void;
  /**
   * Array of `Radio`
   */
  children: React.ReactElement<RadioFeatureProps<T>>[] | React.ReactElement<RadioFeatureProps<T>>;
}

const RadioGroupNodes = {
  Root: 'div'
} as const

const BaseRadioGroup = UUI.FunctionComponent({
  name: "RadioGroup",
  nodes: RadioGroupNodes,
}, (props: RadioGroupFeatureProps<any>, nodes) => {
  const { Root } = nodes

  const radios = useMemo(() => {
    return getValidTypeChildren(Radio, props.children)
  }, [props.children])

  const [focusValue, setFocusValue] = useState<string | number>(radios[0]?.props.value)

  return (
    <RadioGroupContext.Provider value={{
      value: props.value,
      onChange: (value) => {
        setFocusValue(value)
        props.onChange(value)
      },
      focusValue,
    }}>
      <Root
        role="radiogroup"
        onKeyDown={(event) => {
          switch (event.keyCode) {
            case KeyCode.ArrowUp:
            case KeyCode.ArrowLeft: {
              const focusTabIndex = radios.findIndex((i) => i.props.value === props.value)
              const index = (focusTabIndex + radios.length - 1) % radios.length
              setFocusValue(radios[index].props.value)
              break
            }
            case KeyCode.ArrowDown:
            case KeyCode.ArrowRight: {
              const focusTabIndex = radios.findIndex((i) => i.props.value === props.value)
              const index = (focusTabIndex + radios.length + 1) % radios.length
              setFocusValue(radios[index].props.value)
              break
            }
            case KeyCode.Home: {
              if (radios.length > 0 && radios[0]) {
                setFocusValue(radios[0].props.value)
              }
              break
            }
            case KeyCode.End: {
              if (radios.length > 0 && radios[radios.length-1]) {
                setFocusValue(radios[radios.length-1].props.value)
              }
              break
            }
            default:
              // do nothing
          }
        }}
      >
        {radios}
      </Root>
    </RadioGroupContext.Provider>
  )
})

export function RadioGroup<T extends string | number>(props: UUIComponentProps<RadioGroupFeatureProps<T>, typeof RadioGroupNodes>) {
  return <BaseRadioGroup {...props} />
}
RadioGroup.displayName = `<UUI> [GenericComponent] RadioGroup`
export type RadioGroupProps = Parameters<typeof RadioGroup>[0]
