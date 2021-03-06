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
}, (props: {}, { nodes }) => {
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

const TestUnionComponent = UUIFunctionComponent({
  name: 'TestUnionComponent',
  nodes: {
    Root: 'div',
    TestComponent: TestComponent,
  }
}, (props: {}, { nodes }) => {
  const { Root, TestComponent } = nodes
  return (
    <Root>
      <TestComponent />
    </Root>
  )
})
type TestUnionComponentProps = UUIFunctionComponentProps<typeof TestUnionComponent>

type TestUUIProviderCustomize = {
  TestComponent?: TestComponentProps['customize'];
  TestUnionComponent?: TestUnionComponentProps['customize'];
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
  },
  TestUnionComponent: {
    Root: {
      extendStyle: {
        display: 'flex',
      },
    },
    TestComponent: {
      Root: {
        extendStyle: {
          color: 'pink',
        },
      }
    }
  }
}

/**
 * UUI Provider
 *
 * 测试 UUIProvider 是否正确合并 customize 属性
 */
it('UUIProvider - customize', () => {

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
      <TestUnionComponent />
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
      <TestUnionComponent />
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
      <TestUnionComponent
        customize={{
          TestComponent: {
            Root: {
              extendStyle: {
                color: 'aliceblue',
              }
            }
          }
        }}
      />
      <TestUnionComponent
        customize={{
          TestComponent: {
            Root: {
              extendStyle: {
                color: 'cornsilk',
              }
            }
          }
        }}
      />
    </UUIProvider>
  )
  .toJSON();
  expect(tree3).toMatchSnapshot();

})


const globalOptionsConfig = {
  prefix: 'XUI',
  separator: '=',
}

/**
 * UUI Provider
 *
 * 测试 UUIProvider 是否正确合并 options 属性
 */
it('UUIProvider - options', () => {

  const tree1 = renderer
  .create(
    <UUIProvider options={globalOptionsConfig}>
      <TestComponent />
      <TestComponent />
    </UUIProvider>
  )
  .toJSON();
  expect(tree1).toMatchSnapshot();

  const tree2 = renderer
  .create(
    <UUIProvider options={globalOptionsConfig}>
      <TestComponent />
      <TestComponent
        prefix={"YUI"}
        separator={"+"}
      />
    </UUIProvider>
  )
  .toJSON();
  expect(tree2).toMatchSnapshot();

})