import classNames from 'classnames';
import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { getValidTypeChildren } from '../../utils/componentHelper';
import { Tab } from './Tab';
import { TabsContext } from './TabsContext';


export interface TabsFeatureProps {
  value: string;
  onChange: (value: string) => void;
  renderActiveTabPanelOnly?: boolean;
  children: React.ReactNode;
  /**
   * Tab postion
   * @default top
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tabs = UUI.FunctionComponent({
  name: 'Tabs',
  nodes: {
    Root: 'div',
    TabBox: 'div',
    ContentBox: 'div',
    Content: 'div',
  },
}, (props: TabsFeatureProps, nodes) => {
  const { Root, TabBox, ContentBox, Content } = nodes

  const finalProps = {
    position: props.position || 'top',
  }

  const tabs = useMemo(() => {
    return getValidTypeChildren(Tab, props.children)
  }, [props.children])

  const tabContents = useMemo(() => {
    return tabs
      .filter((i) => props.renderActiveTabPanelOnly ? i.props.value === props.value : true)
      .map((i) => (
        <Content
          className={classNames({
            'STATE_active': i.props.value === props.value,
          })}
          key={`tab-${i.props.value}`}
        >{i.props.children}</Content>
      ))
  }, [props.renderActiveTabPanelOnly, props.value, tabs])

  return (
    <TabsContext.Provider value={{ value: props.value, onChange: props.onChange }}>
      <Root
        className={classNames([`POSITION_${finalProps.position}`])}
      >
        <TabBox>
          {tabs}
        </TabBox>
        <ContentBox>
          {tabContents}
        </ContentBox>
      </Root>
    </TabsContext.Provider>
  )
})

export type TabsProps = Parameters<typeof Tabs>[0]
