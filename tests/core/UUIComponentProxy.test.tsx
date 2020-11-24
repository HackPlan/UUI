import React from 'react';
import renderer from 'react-test-renderer';
import { UUIFunctionComponent, UUIComponentProxy } from '../../src/core';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter })

/**
 * UUI Component Proxy
 *
 * 测试 UUIComponentProxy 是否正确合并 customize 属性
 */
it('UUIComponentProxy', () => {

  const BaseTestComponent = UUIFunctionComponent({
    name: 'BaseTestComponent',
    nodes: {
      Root: 'div',
      Node: 'div',
    }
  }, (props: {}, nodes) => {
    const { Root, Node } = nodes
    return (
      <Root className="root-base-classname" style={{
        backgroundColor: 'red'
      }}>
        <Node className="node-base-classname" />
      </Root>
    )
  })

  const StyledTestComponent = UUIComponentProxy(BaseTestComponent, {
    Root: {
      extendClassName: 'test-extend',
      extendStyle: {
        backgroundColor: 'blue',
      }
    }
  })

  const tree1 = renderer
  .create(
    <StyledTestComponent
      className="user-classname"
      style={{ backgroundColor: 'yellow' }}
      customize={{
        Root: {
          extendStyle: {
            backgroundColor: 'green'
          }
        }
      }}
    />
  )
  .toJSON();

  expect(tree1).toMatchSnapshot();

  const tree2 = renderer
  .create(
    <StyledTestComponent />
  )
  .toJSON();

  expect(tree2).toMatchSnapshot();
})