import React from 'react';
import { UUI } from '../../utils/uui';
import { Popover as UUIPopover, TextField } from '../..';
import { flatMap } from 'lodash';


interface SelectItem<T extends string | number> {
  label: string;
  content?: React.ReactNode;
  value: T;
}

interface BaseSelectProps<T extends string | number> {
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
}

interface SelectItemsProps<T extends string | number> extends BaseSelectProps<T> {
  /**
   * Option items of Select.
   */
  items: SelectItem<T>[];
}

interface SelectSectionsProps<T extends string | number> extends BaseSelectProps<T> {
  /**
   * Option items of Select.
   */
  sections: {
    label: React.ReactNode;
    items: SelectItem<T>[];
  }[];
}

export type SelectProps<T extends string | number> = SelectSectionsProps<T> | SelectItemsProps<T>

export interface SelectState<T> {
  active: boolean;
  text: string;
  textPlaceholder?: string;
}

const SelectNodes = {
  Root: 'div',
  Dropdown: UUIPopover,
  Selector: 'div',
  Input: TextField,
  SectionList: 'div',
  Section: 'div',
  SectionHeader: 'div',
  ItemList: 'div',
  Item: 'div',
} as const

export class Select<T extends string | number> extends UUI.ClassComponent({
  name: 'Select',
  nodes: SelectNodes,
})<SelectProps<T>, SelectState<T>> {

  state: SelectState<T> = {
    active: false,
    text: '',
    textPlaceholder: undefined,
  }

  constructor(props: SelectProps<T>) {
    super(props)
    const allItems = this.getAllItems()
    const text = this.props.value && allItems.find((i) => i.value === this.props.value)?.label || ''
    const textPlaceholder = props.placeholder
    this.state = {
      active: false,
      text,
      textPlaceholder,
    }
  }

  render() {
    const { Root, Dropdown, Selector, Input, SectionList } = this.nodes

    return (
      <Root>
        <Dropdown
          active={this.state.active}
          placement={'bottom-start'}
          onClickAway={() => { this.setState({ active: false }) }}
          activator={
            <Selector onClick={() => { this.setState({ active: true }) }}>
              <Input
                value={this.state.text}
                onChange={(value) => {
                  this.setState({ text: value })
                  if (value === '') {
                    this.props.onChange(null)
                  }
                }}
                placeholder={this.state.textPlaceholder}
                customize={{
                  Input: {
                    onFocus: () => {
                      const allItems = this.getAllItems()
                      const text = this.props.value && allItems.find((i) => i.value === this.props.value)?.label || ''
                      this.setState({ text: '', textPlaceholder: text })
                    },
                    onBlur: () => {
                      const allItems = this.getAllItems()
                      const text = this.props.value && allItems.find((i) => i.value === this.props.value)?.label || ''
                      this.setState({ text, textPlaceholder: this.props.placeholder })
                    }
                  }
                }}
              />
            </Selector>
          }
        >
          <SectionList>
            {this.renderSection()}
          </SectionList>
        </Dropdown>
      </Root>
    )
  }

  private getAllItems(): SelectItem<T>[] {
    if ((this.props as any)['items']) {
      const props = this.props as SelectItemsProps<T>
      return props.items
    } else if ((this.props as any)['sections']) {
      const props = this.props as SelectSectionsProps<T>
      return flatMap(props.sections, (i) => i.items)
    } else {
      return []
    }
  }

  private renderItemList(items: SelectItem<T>[]) {
    const { ItemList, Item } = this.nodes
    return items.map((item, index) => {
      return (
        <ItemList key={index}>
          <Item
            onClick={() => {
              this.props.onChange(item.value)
              this.setState({ active: false, text: item.label })
            }}
          >
            {item.content || item.label}
          </Item>
        </ItemList>
      )
    })
  }

  private renderSection() {
    const { Section, SectionHeader } = this.nodes
    if ((this.props as any)['items']) {
      const props = this.props as SelectItemsProps<T>
      return this.renderItemList(props.items)
    } else if ((this.props as any)['sections']) {
      const props = this.props as SelectSectionsProps<T>
      return props.sections.map((section, index) => {
        return (
          <Section key={index}>
            <SectionHeader>{section.label}</SectionHeader>
            {this.renderItemList(section.items)}
          </Section>
        )
      })
    }
  }
}
