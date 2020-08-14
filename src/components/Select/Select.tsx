import React, { useState, useRef, useCallback, useMemo } from 'react';
import { UUI, UUIComponentProps } from '../../core/uui';
import { Popover as UUIPopover, PopoverPlacement } from '../../components/Popover';
import { TextField } from '../../components/Input';
import { flatMap, cloneDeep } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';
import { LoadingSpinner } from '../Loading/LoadingSpinner';


interface SelectOption<T extends string | number> {
  label: string;
  content?: React.ReactNode;
  value: T;
  /**
   * Whether the option of select is non-interactive.
   * @default false
   */
  disabled?: boolean;
}

interface BaseSelectFeatureProps<T extends string | number> {
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
  searchable?: boolean;
  /**
   * The custom search function, it invoked per option iteration.
   */
  onSearch?: (option: SelectOption<T>, q: string) => boolean;
  /**
   * dropdown placement
   */
  dropdownPlacement?: PopoverPlacement;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
}

interface SelectOptionsFeatureProps<T extends string | number> extends BaseSelectFeatureProps<T> {
  /**
   * Options of Select.
   */
  options: SelectOption<T>[];
}

interface SelectSectionsFeatureProps<T extends string | number> extends BaseSelectFeatureProps<T> {
  /**
   * Sections of Options of Select.
   */
  sections: {
    label: React.ReactNode;
    options: SelectOption<T>[];
  }[];
}

export type SelectFeatureProps<T extends string | number> = SelectSectionsFeatureProps<T> | SelectOptionsFeatureProps<T>

const SelectNodes = {
  Root: 'div',
  Dropdown: UUIPopover,
  DropdownIcon: Icons.ChevronDown,
  Selector: 'div',
  Input: TextField,
  SectionList: 'div',
  Section: 'div',
  SectionHeader: 'div',
  OptionList: 'div',
  Option: 'div',
  SearchMatched: 'span',
  LoadingSpinner: LoadingSpinner,
} as const

const BaseSelect = UUI.FunctionComponent({
  name: 'Select',
  nodes: SelectNodes,
}, (props: SelectFeatureProps<any>, nodes) => {
  const {
    Root, Dropdown, DropdownIcon, Selector, Input,
    SectionList, Section, SectionHeader,
    OptionList, Option, SearchMatched,
    LoadingSpinner,
  } = nodes

  const finalProps = {
    searchable: props.searchable === undefined ? false : props.searchable,
    dropdownPlacement: props.dropdownPlacement === undefined ? 'bottom-start' : props.dropdownPlacement
  }

  const [active, setActive] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | null>(null)
  const inputRef = useRef<any | null>(null)

  const value = useMemo(() => {
    if (active) {
      return inputValue
    } else {
      const option = findSelectedOption(props)
      return option?.label || null
    }
  }, [props, inputValue, active])

  const placeholder = useMemo(() => {
    if (active && !inputValue && props.value) {
      const selectedOption = findSelectedOption(props)
      return selectedOption?.label
    } else {
      return props.placeholder
    }
  }, [active, inputValue, props])

  const finalOptions = useMemo(() => {
    if (!(props as any)['options']) return undefined
    const _props = props as SelectOptionsFeatureProps<any>

    if (!inputValue) return _props.options
    const matchedOptions = searchInOptions(inputValue, _props.options, props.onSearch)
        .map((option) => {
          option.content = (
            <>{highlightKeyword(option.label, inputValue, SearchMatched)}</>
          )
          return option
        })
    return matchedOptions
  }, [SearchMatched, inputValue, props])

  const finalSections = useMemo(() => {
    if (!(props as any)['sections']) return undefined
    const _props = props as SelectSectionsFeatureProps<any>

    if (!inputValue) return _props.sections
    return _props.sections.map((section) => {
      const matchedOptions = searchInOptions(inputValue, section.options, props.onSearch)
        .map((option) => {
          option.content = (
            <>{highlightKeyword(option.label, inputValue, SearchMatched)}</>
          )
          return option
        })
      return {
        ...section,
        options: matchedOptions,
      }
    }).filter((section) => section.options.length > 0)
  }, [SearchMatched, inputValue, props])

  const renderOptionList = useCallback((options: SelectOption<any>[]) => {
    return options.map((option, index) => {
      const selected = option.value === props.value
      return (
        <OptionList key={index}>
          <Option
            role="option"
            aria-selected={selected}
            className={classNames({
              'STATE_selected': selected,
              'STATE_disabled': option.disabled,
            })}
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
      role="select"
      className={classNames({
        'STATE_active': active,
        'STATE_loading': props.loading,
        'STATE_searchable': finalProps.searchable,
      })}
    >
      <Dropdown
        active={active}
        placement={finalProps.dropdownPlacement}
        onClickAway={() => {
          setActive(false)
          const selectedOption = findSelectedOption(props)
          setInputValue(selectedOption?.label || null)
        }}
        activator={
          <Selector
            onClick={() => {
              setActive(true)
              inputRef.current && inputRef.current.focus && inputRef.current.focus();
            }}>
            <Input
              value={value}
              placeholder={placeholder}
              onChange={(value) => {
                setInputValue(value.length > 0 ? value : null)
              }}
              customize={{
                Root: {
                  onClick: () => {
                    setActive((value) => !value)
                    if (!active) {
                      setInputValue('')
                    }
                  },
                  extendChildrenAfter: (
                    <>
                    {props.loading && (
                      <LoadingSpinner width={16} height={16} />
                    )}
                    <DropdownIcon width={20} height={20} svgrProps={{ strokeWidth: 1 }} />
                    </>
                  )
                },
                Input: {
                  ref:  inputRef,
                  readOnly: !finalProps.searchable,
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

function highlightKeyword(text: string, keyword: string, HighlightComponent: any) {
  const data = text.split(keyword).map((node, index) => {
    if (index === 0) return node
    else return <>
      <HighlightComponent key={keyword}>{keyword}</HighlightComponent>
      {node}
    </>
  })
  return data.map((i) => <>{i}</>)
}

function searchInOptions(q: string, options: SelectOption<any>[], predicate?: SelectFeatureProps<any>['onSearch']) {
  return cloneDeep(
    options.filter((i) => predicate
      ? predicate(i, q)
      : i.label.includes(q)
    )
  )
}

const getAllOptions = <T extends string | number>(props: SelectFeatureProps<T>) => {
  if ((props as any)['options']) {
    const _props = props as SelectOptionsFeatureProps<any>
    return _props.options
  } else if ((props as any)['sections']) {
    const _props = props as SelectSectionsFeatureProps<any>
    return flatMap(_props.sections, (i) => i.options)
  } else {
    return []
  }
}

const findSelectedOption = <T extends string | number>(props: SelectFeatureProps<T>) => {
  const allOptions = getAllOptions(props)
  return allOptions.find((i) => i.value === props.value)
}

export function Select<T extends string | number>(props: UUIComponentProps<SelectFeatureProps<T>, typeof SelectNodes>) {
  return <BaseSelect {...props} />
}
Select.displayName = `<UUI> [GenericComponent] Select`
export type SelectProps = Parameters<typeof Select>[0]
