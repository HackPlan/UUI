import React, { useMemo, useState } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { getValidTypeChildren } from '../../utils/componentHelper';
import { Tab } from './Tab';
import { TabsContext } from './TabsContext';
import { KeyCode } from '../../utils/keyboardHelper';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';


export interface TabsFeatureProps {
  /**
   * The id value of currently selected tab.
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
   * only accept \<Tab /\>, other components and elements will not rendered.
   */
  children: React.ReactNode;
  /**
   * Tab postion
   * @default top
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Whether tab should be changed when focused tab changed.
   */
  toggleTabWhenFocusChange?: boolean;
}

export const TabsPropTypes = createComponentPropTypes<TabsFeatureProps>({
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  renderActiveTabOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  toggleTabWhenFocusChange: PropTypes.bool,
})

export const Tabs = UUIFunctionComponent({
  name: 'Tabs',
  nodes: {
    Root: 'div',
    TabBox: 'div',
    ContentBox: 'div',
    Content: 'div',
  },
  propTypes: TabsPropTypes,
}, (props: TabsFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, TabBox, ContentBox, Content } = nodes

  const finalProps = {
    position: props.position || 'top',
    toggleTabWhenFocusChange: props.toggleTabWhenFocusChange === undefined ? true : props.toggleTabWhenFocusChange
  }

  const orientation = useMemo(() => {
    switch (props.position) {
      case 'left':
      case 'right':
        return "vertical"
      case 'top':
      case 'bottom':
      default:
        return "horizontal"
    }
  }, [props.position])

  const tabs = useMemo(() => {
    return getValidTypeChildren(Tab, props.children)
  }, [props.children])

  const tabContents = useMemo(() => {
    return tabs
      .filter((i) => props.renderActiveTabOnly ? i.props.value === props.value : true)
      .map((i) => (
        <Content
          role="tabpanel"
          {...NodeDataProps({
            'active': i.props.value === props.value,
          })}
          key={`tab-${i.props.value}`}
        >{i.props.children}</Content>
      ))
  }, [Content, NodeDataProps, props.renderActiveTabOnly, props.value, tabs])

  const [focusValue, setFocusValue] = useState<string>(tabs[0]?.props.value)

  return (
    <TabsContext.Provider value={{
      value: props.value,
      onChange: (value) => {
        setFocusValue(value)
        props.onChange(value)
      },
      focusValue,
      toggleTabWhenFocusChange: finalProps.toggleTabWhenFocusChange,
    }}>
      <Root
        role="tabs"
        {...NodeDataProps({
          'position': finalProps.position,
        })}
        onKeyDown={(event) => {
          switch (event.keyCode) {
            case KeyCode.Enter:
            case KeyCode.SpaceBar:
              props.onChange(focusValue)
              break
            case KeyCode.ArrowLeft: {
              const focusTabIndex = tabs.findIndex((i) => i.props.value === focusValue)
              const index = (focusTabIndex + tabs.length - 1) % tabs.length
              setFocusValue(tabs[index].props.value)
              break
            }
            case KeyCode.ArrowRight: {
              const focusTabIndex = tabs.findIndex((i) => i.props.value === focusValue)
              const index = (focusTabIndex + tabs.length + 1) % tabs.length
              setFocusValue(tabs[index].props.value)
              break
            }
            case KeyCode.Home: {
              if (tabs.length > 0 && tabs[0]) {
                setFocusValue(tabs[0].props.value)
              }
              break
            }
            case KeyCode.End: {
              if (tabs.length > 0 && tabs[tabs.length-1]) {
                setFocusValue(tabs[tabs.length-1].props.value)
              }
              break
            }
            default:
              // do nothing
          }
        }}
      >
        <TabBox role="tablist" aria-orientation={orientation}>
          {tabs}
        </TabBox>
        <ContentBox>
          {tabContents}
        </ContentBox>
      </Root>
    </TabsContext.Provider>
  )
})

export type TabsProps = UUIFunctionComponentProps<typeof Tabs>
