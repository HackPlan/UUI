import classNames from 'classnames';
import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { getValidTypeChildren } from '../../utils/componentHelper';
import { Tab } from './Tab';
import { TabsContext } from './TabsContext';


export interface TabsFeatureProps {
  /**
   * The value of currently selected tab.
   */
  value: string;
  /**
   * Event handler invoked when tab is selected.
   */
  onChange: (value: string) => void;
  /**
   * Whether inactive tab panels should be removed from the DOM and unmounted in React.
   * This can be a performance enhancement when rendering many complex panels, but requires
   * careful support for unmounting and remounting.
   * @default false
   */
  renderActiveTabOnly?: boolean;
  /**
   * only accept <Tab />, other components and elements will not rendered.
   */
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
      .filter((i) => props.renderActiveTabOnly ? i.props.value === props.value : true)
      .map((i) => (
        <Content
          className={classNames({
            'STATE_active': i.props.value === props.value,
          })}
          key={`tab-${i.props.value}`}
        >{i.props.children}</Content>
      ))
  }, [props.renderActiveTabOnly, props.value, tabs])

  return (
    <TabsContext.Provider value={{ value: props.value, onChange: props.onChange }}>
      <Root
        role="tabpanel"
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
