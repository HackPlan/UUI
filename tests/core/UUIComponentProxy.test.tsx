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
      ExtendTest: 'div',
    }
  }, (props: {}, nodes) => {
    const { Root, Node, ExtendTest } = nodes
    return (
      <Root className="root-base-classname" style={{
        backgroundColor: 'red'
      }}>
        <Node className="node-base-classname" style={{
          width: 200,
          height: 300,
        }} />
        <ExtendTest>
          <div>Original</div>
        </ExtendTest>
      </Root>
    )
  })

  const StyledTestComponent = UUIComponentProxy(BaseTestComponent, {
    Root: {
      extendClassName: 'test-extend',
      extendStyle: {
        backgroundColor: 'blue',
      }
    },
    ExtendTest: {
      extendChildrenAfter: <div>Extend in proxy</div>
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
        },
        Node: {
          extendClassName: 'extend-node-classname',
          extendStyle: {
            width: 500,
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

  const tree3 = renderer
  .create(
    <StyledTestComponent
      customize={{
        Root: {
          overrideClassName: 'override-root-classname',
          overrideStyle: {
            minWidth: 10,
          },
        },
        Node: {
          overrideClassName: 'override-node-classname',
          overrideStyle: {
            minHeight: 1,
          },
        }
      }}
    />
  )
  expect(tree3).toMatchSnapshot();

  const tree4 = renderer
  .create(
    <StyledTestComponent
      customize={{
        Root: {
          overrideStyle: {
            minWidth: 10,
          },
        },
        ExtendTest: {
          extendChildrenAfter: <div>Extend in customize</div>,
        }
      }}
    />
  )
  expect(tree4).toMatchSnapshot();
})