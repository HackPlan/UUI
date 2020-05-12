import React, { useState, useRef, useMemo } from 'react';
import { UUI } from '../../utils/uui';
import { Popover } from '../Popover';
import { TextField } from '../Input';
import { pick } from 'lodash';

export interface CascaderOption {
  value: string;
  label?: React.ReactNode;
  children?: CascaderOption[];
}

export interface BaseCascaderProps {
  /**
   *
   */
  options: CascaderOption[];
  /**
   * The value to display in the input field.
   */
  value: string[] | null;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: string[] | null) => void;
}

export const Cascader = UUI.FunctionComponent({
  name: 'Cascader',
  nodes: {
    Root: 'div',
    Dropdown: Popover,
    Input: TextField,
    LevelList: 'div',
    SectionList: 'div',
    ItemList: 'div',
    Item: 'div',
  }
}, (props: BaseCascaderProps, nodes) => {
  const { Root, Dropdown, Input, LevelList, ItemList, Item } = nodes

  const [active, setActive] = useState(false)
  const inputRef = useRef<any>()

  type Levels = (CascaderOption & { selectedOption: Omit<CascaderOption, 'children'>[] })[][]
  const levels = useMemo(() => {
    const dfs = (data: Levels, index: number, selectedOption: CascaderOption[], options: CascaderOption[]) => {
      data.push(options.map((i) => ({ ...i, selectedOption: [...selectedOption, pick(i, 'value', 'label')] })))
      if (props.value && props.value[index]) {
        const value = props.value[index]
        const option = options.find((option) => option.value === value)
        if (option && option.children) {
          dfs(data, index+1, [...selectedOption, pick(option, 'value', 'label')], option.children)
        }
      }
    }
    const data: Levels = []
    dfs(data, 0, [], props.options)
    return data
  }, [props.options, props.value])

  const inputText = useMemo(() => {
    if (!props.value) return null

    return props.value.map((value, index) => {
      if (!levels[index]) return 'N/A'
      const level = levels[index]
      const option = level.find((i) => i.value === value)
      return option ? (option.label || option.value) : 'N/A'
    }).join(' / ')
  }, [props.value, levels])

  return (
    <Root>
      <Dropdown
        active={active}
        placement={'bottom-start'}
        onClickAway={() => { setActive(false) }}
        activator={
          <Input
            value={inputText}
            // TODO: implement this when Cascader support input search option
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
            customize={{
              Root: {
                onClick: () => {
                  setActive(true)
                  inputRef.current && inputRef.current.focus && inputRef.current.focus();
                },
              },
              Input: {
                ref: inputRef,
                readOnly: true,
                // disabled: true,
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
                      key={optionIndex}
                      onClick={() => {
                        props.onChange(option.selectedOption.map((i) => i.value))
                        if (!option.children) {
                          setActive(false)
                        }
                      }}
                    >
                      {option.label}
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
