import React, { useState, useRef, useMemo } from 'react';
import { UUI } from '../../utils/uui';
import { Popover } from '../Popover';
import { TextField } from '../Input';
import { pick } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';

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
  const {
    Root, Dropdown, DropdownIcon, Input,
    LevelList, ItemList, Item, ItemLabel, ItemIcon,
  } = nodes

  const finalProps = {
    expandTriggerType: props.expandTriggerType || 'click',
  }

  const [active, setActive] = useState(false)
  const inputRef = useRef<any>()

  /**
   * Generate tree hierarchy data of cascade options.
   */
  type Levels = (CascaderOption & {
    selectedOption: Omit<CascaderOption, 'children'>[];
    selected: boolean;
  })[][]
  const levels = useMemo(() => {
    const dfs = (data: Levels, index: number, selectedOption: CascaderOption[], options: CascaderOption[]) => {
      const getNewSelectedOption = (option: CascaderOption) => [...selectedOption, pick(option, 'value', 'label')]
      const getSelected = (option: CascaderOption) => props.value ? option.value === props.value[index] : false
      data.push(options.map((i) => ({ ...i, selectedOption: getNewSelectedOption(i), selected: getSelected(i) })))
      if (props.value && props.value[index]) {
        const value = props.value[index]
        const option = options.find((option) => option.value === value)
        if (option && option.children) {
          dfs(data, index+1, getNewSelectedOption(option), option.children)
        }
      }
    }
    const data: Levels = []
    dfs(data, 0, [], props.options)
    return data
  }, [props.options, props.value])

  /**
   * Generate input text string value.
   */
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
    <Root
      className={classNames({
        'Active': active,
      })}
    >
      <Dropdown
        active={active}
        placement={'bottom-start'}
        onClickAway={() => { setActive(false) }}
        activator={
          <Input
            placeholder={props.placeholder}
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
                extendChildrenAfter: (
                  <DropdownIcon>
                    <Icons.ChevronDown width={20} height={20} svgrProps={{ strokeWidth: 1 }}></Icons.ChevronDown>
                  </DropdownIcon>
                )
              },
              Input: {
                ref: inputRef,
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
                        if (!option.children) setActive(false)
                        props.onChange(option.selectedOption.map((i) => i.value))
                      }}
                      onMouseEnter={() => {
                        if (finalProps.expandTriggerType !== 'hover') return
                        if (option.disabled) return
                        if (!option.children) return
                        props.onChange(option.selectedOption.map((i) => i.value))
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
