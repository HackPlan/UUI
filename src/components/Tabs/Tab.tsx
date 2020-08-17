import React, { useContext } from 'react';
import { UUI } from '../../core/uui';
import { TabsContext } from './TabsContext';
import classNames from 'classnames';

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

export const Tab = UUI.FunctionComponent({
  name: 'Tab',
  nodes: {
    Root: 'div',
  },
}, (props: TabFeatureProps, nodes) => {
  const { Root } = nodes

  const context = useContext(TabsContext)
  if (!context) {
    console.warn('[UUI] please use <Tab> in <Tabs>')
    return <></>
  }
  const { value, onChange } = context
  const isActive = value === props.value

  return (
    <Root
      role="tab"
      aria-selected={isActive}
      className={classNames({
        'STATE_active': isActive,
      })}
      onClick={() => { onChange(props.value) }}
    >
      {props.label}
    </Root>
  )
})

export type TabProps = Parameters<typeof Tab>[0]
