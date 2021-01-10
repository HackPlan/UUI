import React, { useContext, useEffect, useRef } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { TabsContext } from './TabsContext';

export interface TabFeatureProps {
  /**
   * The label text to display in the tab node.
   */
  label: React.ReactNode;
  /**
   * Value of tab
   */
  value: string;
  /**
   * Content of tab
   */
  children: React.ReactNode;
}

export const Tab = UUIFunctionComponent({
  name: 'Tab',
  nodes: {
    Root: 'div',
  },
}, (props: TabFeatureProps, { nodes, NodeDataProps }) => {
  const { Root } = nodes

  const context = useContext(TabsContext)
  if (!context) {
    console.warn('[UUI] please use <Tab> in <Tabs>')
    return <></>
  }
  const { value, onChange } = context
  const isActive = value === props.value

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (context.focusValue === props.value) {
      ref.current?.focus()
      if (context.toggleTabWhenFocusChange) {
        context.onChange(props.value)
      }
    }
  }, [context, props.value])

  return (
    <Root
      ref={ref}
      role="tab"
      tabIndex={context.focusValue === props.value ? 0 : -1}
      aria-selected={isActive}
      {...NodeDataProps({
        'active': !!isActive,
      })}
      onClick={() => { onChange(props.value) }}
    >
      {props.label}
    </Root>
  )
})

export type TabProps = UUIFunctionComponentProps<typeof Tab>
