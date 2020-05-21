import React, { useState, useRef, useCallback, useMemo } from 'react';
import { UUI, UUIComponentProps } from '../../utils/uui';
import { Popover as UUIPopover, TextField } from '../..';
import { flatMap } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';


interface SelectOption<T extends string | number> {
  label: string;
  content?: React.ReactNode;
  value: T;
  disabled?: boolean;
}

interface BaseCommonSelectProps<T extends string | number> {
  /**
   * Selected item.
   */
  value: T | null;
  /**
   * Callback invoked when an item is selected.
   */
  onChange: (value: T | null) => void;
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
    /**
   * enable inputting text to search options.
   */
  enableSearch?: boolean;
  /**
   * The custom search function, it invoked per option iteration.
   */
  onSearch?: (option: SelectOption<T>, q: string) => boolean;
}

interface SelectOptionsProps<T extends string | number> extends BaseCommonSelectProps<T> {
  /**
   * Options of Select.
   */
  options: SelectOption<T>[];
}

interface SelectSectionsProps<T extends string | number> extends BaseCommonSelectProps<T> {
  /**
   * Sections of Options of Select.
   */
  sections: {
    label: React.ReactNode;
    options: SelectOption<T>[];
  }[];
}

export type BaseSelectProps<T extends string | number> = SelectSectionsProps<T> | SelectOptionsProps<T>

const SelectNodes = {
  Root: 'div',
  Dropdown: UUIPopover,
  DropdownIcon: 'div',
  Selector: 'div',
  Input: TextField,
  SectionList: 'div',
  Section: 'div',
  SectionHeader: 'div',
  OptionList: 'div',
  Option: 'div',
} as const

const BaseSelect = UUI.FunctionComponent({
  name: 'Select',
  nodes: SelectNodes,
}, (props: BaseSelectProps<any>, nodes) => {
  const { Root, Dropdown, DropdownIcon, Selector, Input, SectionList, Section, SectionHeader, OptionList, Option } = nodes

  const finalProps = {
    enableSearch: props.enableSearch === undefined ? false : props.enableSearch,
  }

  const [active, setActive] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | null>(null)
  const inputRef = useRef<any | null>(null)

  const getAllOptions = useCallback(() => {
    if ((props as any)['options']) {
      const _props = props as SelectOptionsProps<any>
      return _props.options
    } else if ((props as any)['sections']) {
      const _props = props as SelectSectionsProps<any>
      return flatMap(_props.sections, (i) => i.options)
    } else {
      return []
    }
  }, [props])

  const findSelectedOption = useCallback(() => {
    const allOptions = getAllOptions()
    return allOptions.find((i) => i.value === props.value)
  }, [props, getAllOptions])

  const placeholder = useMemo(() => {
    if (active && !inputValue && props.value) {
      const selectedOption = findSelectedOption()
      return selectedOption?.label
    } else {
      return props.placeholder
    }
  }, [active, inputValue, props.value, props.placeholder, findSelectedOption])

  const finalOptions = useMemo(() => {
    if (!(props as any)['options']) return undefined
    const _props = props as SelectOptionsProps<any>

    if (!inputValue) return _props.options
    return _props.options.filter((i) => props.onSearch
      ? props.onSearch(i, inputValue)
      : i.label.includes(inputValue)
    )
  }, [inputValue, props])

  const finalSections = useMemo(() => {
    if (!(props as any)['sections']) return undefined
    const _props = props as SelectSectionsProps<any>

    if (!inputValue) return _props.sections
    return _props.sections.map((section) => {
      return {
        ...section,
        options: section.options.filter((i) => props.onSearch
          ? props.onSearch(i, inputValue)
          : i.label.includes(inputValue)
        )
      }
    }).filter((section) => section.options.length > 0)
  }, [inputValue, props])

  const renderOptionList = useCallback((options: SelectOption<any>[]) => {
    return options.map((option, index) => {
      return (
        <OptionList key={index}>
          <Option
            onClick={() => {
              if (option.disabled) return
              setActive(false)
              setInputValue(option.label)
              props.onChange(option.value)
            }}
          >
            {option.content || option.label}
          </Option>
        </OptionList>
      )
    })
  }, [props])

  const renderSection = useCallback(() => {
    if (finalOptions) {
      return renderOptionList(finalOptions)
    } else if (finalSections) {
      return finalSections.map((section, index) => {
        return (
          <Section key={index}>
            <SectionHeader>{section.label}</SectionHeader>
            {renderOptionList(section.options)}
          </Section>
        )
      })
    } else {
      return null
    }
  }, [finalOptions, finalSections, renderOptionList])

  return (
    <Root
      className={classNames({
        'Active': active,
        'Searchable': finalProps.enableSearch,
      })}
    >
      <Dropdown
        active={active}
        placement={'bottom-start'}
        onClickAway={() => {
          setActive(false)
          const selectedOption = findSelectedOption()
          setInputValue(selectedOption?.label || null)
        }}
        activator={
          <Selector
            onClick={() => {
              setActive(true)
              inputRef.current && inputRef.current.focus && inputRef.current.focus();
            }}>
            <Input
              value={inputValue}
              placeholder={placeholder}
              onChange={(value) => {
                setInputValue(value.length > 0 ? value : null)
              }}
              customize={{
                Root: {
                  onFocus: () => {
                    setActive(true)
                    setInputValue('')
                  },
                  extendChildrenAfter: (
                    <DropdownIcon>
                      <Icons.ChevronDown width={20} height={20} svgrProps={{ strokeWidth: 1 }}></Icons.ChevronDown>
                    </DropdownIcon>
                  )
                },
                Input: {
                  ref:  inputRef,
                  readOnly: !finalProps.enableSearch,
                },
              }}
            />
          </Selector>
        }
      >
        <SectionList>
          {renderSection()}
        </SectionList>
      </Dropdown>
    </Root>
  )
})

export function Select<T extends string | number>(props: UUIComponentProps<BaseSelectProps<T>, typeof SelectNodes>) {
  return <BaseSelect {...props} />
}
export type SelectProps = Parameters<typeof Select>[0]
