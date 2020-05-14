import React, { useState, useRef, useMemo } from 'react';
import { UUI } from '../../utils/uui';
import { Popover } from '../Popover';
import { TextField } from '../Input';
import { pick, isEqual } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';

export interface CascaderOption {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface BaseCascaderProps {
  /**
   * Option items of Cascader.
   */
  options: CascaderOption[];
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
  /**
   * The value to display in the input field.
   */
  value: string[] | null;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: string[] | null) => void;
  /**
   * Indicate which type to trigger expand item list.
   * @default click
   */
  expandTriggerType: 'click' | 'hover';
  /**
   * only invoke onChange when the final level option item select.
   * @default true
   */
  changeOnFinalSelect: boolean;
}

export const Cascader = UUI.FunctionComponent({
  name: 'Cascader',
  nodes: {
    Root: 'div',
    Dropdown: Popover,
    DropdownIcon: 'div',
    Input: TextField,
    LevelList: 'div',
    SectionList: 'div',
    ItemList: 'div',
    Item: 'div',
    ItemLabel: 'div',
    ItemIcon: 'div',
  }
}, (props: BaseCascaderProps, nodes) => {
  /**
   * Component Nodes Spread
   */
  const {
    Root, Dropdown, DropdownIcon, Input,
    LevelList, ItemList, Item, ItemLabel, ItemIcon,
  } = nodes

  /**
   * Default props value
   */
  const finalProps = {
    expandTriggerType: props.expandTriggerType || 'click',
    changeOnFinalSelect: props.changeOnFinalSelect === undefined ? true : props.changeOnFinalSelect,
  }

  /**
   * Component Inner States
   */
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue(props.value, (finalValue) => { props.onChange(finalValue) })
  const [popoverActive, setPopoverActive] = useState(false)
  const [inputValue, setInputValue] = useState<string | null>(null)

  /**
   * Generate tree hierarchy data of cascade options for rendering.
   */
  type Levels = (CascaderOption & {
    selectedOption: Omit<CascaderOption, 'children'>[];
    selected: boolean;
  })[][]
  const levels = useMemo(() => {
    const dfs = (data: Levels, index: number, selectedOption: CascaderOption[], options: CascaderOption[]) => {
      const getNewSelectedOption = (option: CascaderOption) => [...selectedOption, pick(option, 'value', 'label')]
      const getSelected = (option: CascaderOption) => innerValue ? option.value === innerValue[index] : false
      data.push(options.map((i) => ({ ...i, selectedOption: getNewSelectedOption(i), selected: getSelected(i) })))
      if (innerValue && innerValue[index]) {
        const value = innerValue[index]
        const option = options.find((option) => option.value === value)
        if (option && option.children) {
          dfs(data, index+1, getNewSelectedOption(option), option.children)
        }
      }
    }
    const data: Levels = []
    dfs(data, 0, [], props.options)
    return data
  }, [props.options, innerValue])

  const value = useMemo(() => {
    if (isEqual(innerValue, props.value)) {
      const selectedOptions = findSelectedOptions(props.value, props.options)
      return generateLabel(selectedOptions)
    } else {
      return null
    }
  }, [innerValue, props.value, props.options])
  const placeholder = useMemo(() => {
    if (isEqual(innerValue, props.value)) {
      return props.placeholder
    } else {
      const selectedOptions = findSelectedOptions(props.value, props.options)
      return generateLabel(selectedOptions) || props.placeholder
    }
  }, [innerValue, props.value, props.options, props.placeholder])

  return (
    <Root
      className={classNames({
        'Active': popoverActive,
      })}
    >
      <Dropdown
        active={popoverActive}
        placement={'bottom-start'}
        onClickAway={() => {
          setPopoverActive(false)
          resetInnerValue()
        }}
        activator={
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(value) => {
              setInputValue(value.length > 0 ? value : null)
            }}
            customize={{
              Root: {
                onFocus: () => {
                  setPopoverActive(true)
                  setInputValue('')
                },
                extendChildrenAfter: (
                  <DropdownIcon>
                    <Icons.ChevronDown width={20} height={20} svgrProps={{ strokeWidth: 1 }}></Icons.ChevronDown>
                  </DropdownIcon>
                )
              },
              Input: {
                readOnly: true,
              },
            }}
          />
        }
      >
        <LevelList>
          {levels.map((options, levelIndex) => {
            return (
              <ItemList key={levelIndex}>
                {options.map((option, optionIndex) => {
                  return (
                    <Item
                      className={classNames({
                        'Selected': option.selected,
                        'Disabled': option.disabled,
                      })}
                      key={optionIndex}
                      onClick={() => {
                        if (option.disabled) return

                        if (option.children) {
                          console.log('AAA', !finalProps.changeOnFinalSelect)
                          setInnerValue(option.selectedOption.map((i) => i.value), !finalProps.changeOnFinalSelect)
                        } else if (!option.children) {
                          setPopoverActive(false)
                          setInnerValue(option.selectedOption.map((i) => i.value), true)
                        }
                      }}
                      onMouseEnter={() => {
                        if (finalProps.expandTriggerType !== 'hover') return
                        if (option.disabled) return
                        if (!option.children) return
                        setInnerValue(option.selectedOption.map((i) => i.value))
                      }}
                    >
                      <ItemLabel>{option.label}</ItemLabel>
                      <ItemIcon>
                        <Icons.ChevronRight
                          className={classNames({
                            'Hidden': !option.children,
                          })}
                          svgrProps={{ strokeWidth: 1 }}
                        />
                      </ItemIcon>
                    </Item>
                  )
                })}
              </ItemList>
            )
          })}
        </LevelList>
      </Dropdown>
    </Root>
  )
})

export type CascaderProps = Parameters<typeof Cascader>[0]


function findSelectedOptions(value: string[] | null, options: CascaderOption[]) {
  if (!value || value.length === 0) return []
  const dfs = (data: CascaderOption[], index: number, options: CascaderOption[]) => {
    if (!value[index]) return
    const option = options.find((option) => option.value === value[index])
    if (!option) return
    data.push(option)
    if (option.children) {
      dfs(data, index+1, option.children)
    }
  }
  const data: CascaderOption[] = []
  dfs(data, 0, options)
  return data
}

function generateLabel(options: CascaderOption[]) {
  return options.map((i) => i.label || i.value).join(' / ')
}
