import React, { useMemo } from 'react';
import { Checkbox } from './Checkbox';
import { getValidTypeChildren } from '../../utils/componentHelper';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface CheckboxGroupFeatureProps {
  /**
   * The name of a group of checkboxes
   * @default none
   */
  name?: string;
  /**
   * The value of selected checkbox.
   */
  value: string[];
  /**
   * Callback invokes when user change to select checkbox.
   */
  onChange: (value: string[]) => void;
  /**
   * Array of `Checkbox`
   */
  children: React.ReactNode;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const CheckboxGroup = UUIFunctionComponent({
  name: "CheckboxGroup",
  nodes: {
    Root: 'div'
  },
}, (props: CheckboxGroupFeatureProps, nodes) => {
  const { Root } = nodes

  const children = useMemo(() => {
    const elements = getValidTypeChildren(Checkbox, props.children)
    return elements.filter((element) => !!element.props.value).map((element) => {
      if (!element.props.value) return null;
      return React.cloneElement(element, {
        checked: props.value.includes(element.props.value),
        value: element.props.value,
        onChange: (value: boolean) => {
          if (!element.props.value) return;
          let newValue = Array.from(props.value)
          if (value) {
            newValue.push(element.props.value)
          } else {
            const index = newValue.findIndex((i) => i === element.props.value)
            if (index !== -1) newValue.splice(index, 1)
          }
          newValue = Array.from(new Set(newValue))
          props.onChange(newValue)
        },
      })
    })
  }, [props])

  return (
    <Root>
      {children}
    </Root>
  )
})

export type CheckboxGroupProps = UUIFunctionComponentProps<typeof CheckboxGroup>
