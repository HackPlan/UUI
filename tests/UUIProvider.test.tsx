import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../src/core';
import { UUIProvider } from '../src/UUIProvider';

Enzyme.configure({ adapter: new Adapter })

const TestComponent = UUIFunctionComponent({
  name: 'TestComponent',
  nodes: {
    Root: 'div',
    Node: 'div',
    ExtendTest: 'div',
  }
}, (props: {}, nodes) => {
  const { Root, Node, ExtendTest } = nodes
  return (
    <Root className="root-base-classname" style={{
      backgroundColor: 'green',
      fontWeight: 300,
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
type TestComponentProps = UUIFunctionComponentProps<typeof TestComponent>

type TestUUIProviderCustomize = {
  TestComponent?: TestComponentProps['customize'];
}

const globalCustomizeConfig: TestUUIProviderCustomize = {
  TestComponent: {
    Root: {
      extendClassName: 'GlobalExtendButtonClassName',
      extendStyle: {
        backgroundColor: 'red',
        color: 'blue',
        fontWeight: 400,
      }
    },
  }
}

/**
 * UUI Provider
 *
 * 测试 UUIProvider 是否正确合并 customize 属性
 */
it('UUIProvider', () => {

  const tree1 = renderer
  .create(
    <UUIProvider
      customize={{
        Button: {
          Root: {
            extendClassName: ''
          }
        }
      }}
    >
      <TestComponent />
    </UUIProvider>
  )
  .toJSON();
  expect(tree1).toMatchSnapshot();

  const tree2 = renderer
  .create(
    <UUIProvider<TestUUIProviderCustomize>
      customize={globalCustomizeConfig}
    >
      <TestComponent />
    </UUIProvider>
  )
  .toJSON();
  expect(tree2).toMatchSnapshot();


  const tree3 = renderer
  .create(
    <UUIProvider<TestUUIProviderCustomize>
      customize={globalCustomizeConfig}
    >
      <TestComponent
        customize={{
          Root: {
            extendStyle: {
              color: 'yellow',
              fontSize: 34,
            },
          }
        }}
      />
      <TestComponent
        customize={{
          Root: {
            extendStyle: {
              color: 'yellow',
              fontSize: 34,
            },
          }
        }}
      />
    </UUIProvider>
  )
  .toJSON();
  expect(tree3).toMatchSnapshot();

})