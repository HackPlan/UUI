import React from 'react';
import renderer from 'react-test-renderer';
import { UUI } from '../../src/core/uui';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter })

/**
 * UUI Component HOC
 *
 * 测试是否能通过 HOC 工具创建出正确的 Component。
 */
it('UUIComponentHOC', () => {
  const UUITestFunctionComponent = UUI.FunctionComponent({
    name: 'UUITestFunctionComponent',
    nodes: {
      Root: 'div',
      Container: 'div',
      Article: 'article',
      Title: 'h1',
      Paragraph: 'p',
    }
  }, (props: {}, nodes) => {
    const { Root, Container, Article, Title, Paragraph } = nodes
    return (
      <Root>
        <Container>
          <Article>
            <Title>Lorem ipsum</Title>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis magna finibus lorem semper malesuada. Maecenas vel tristique odio. Duis non nisi turpis. Nam malesuada condimentum ultrices. Mauris lectus ante, sollicitudin in odio ac, elementum euismod ipsum. Nulla semper mattis erat, nec sollicitudin turpis gravida ut. Donec aliquet sit amet enim at consequat. Duis lacinia libero ipsum, in faucibus sapien egestas quis. Pellentesque pretium gravida elit sed viverra. Morbi vitae enim at quam cursus dapibus non ac erat. Phasellus ligula lectus, tempor ut ultricies nec, ornare cursus mauris.</Paragraph>
            <Paragraph>Proin mollis, dui in volutpat consectetur, quam sapien eleifend eros, ut consectetur neque mauris vel velit. Aliquam sed ultrices ex. Nam sed augue ligula. Cras et enim lorem. Maecenas eget lacus diam. Praesent nec lectus ut ante suscipit semper. Vestibulum congue justo eu rutrum tempus. Maecenas imperdiet neque sapien, vitae pretium dui aliquam et. Suspendisse potenti. Curabitur euismod nisi a urna auctor, quis viverra tellus euismod. Nulla facilisi. Proin eleifend nunc a nisi venenatis scelerisque. Aliquam erat volutpat. Etiam finibus laoreet ipsum, a rutrum odio venenatis vel.</Paragraph>
          </Article>
        </Container>
      </Root>
    )
  })

  class UUITestClassComponent extends UUI.ClassComponent({
    name: 'UUITestClassComponent',
    nodes: {
      Root: 'div',
      Container: 'div',
      Article: 'article',
      Title: 'h1',
      Paragraph: 'p',
    }
  }) {
    render() {
      const { Root, Container, Article, Title, Paragraph } = this.nodes
      return (
        <Root>
          <Container>
            <Article>
              <Title>Lorem ipsum</Title>
              <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis magna finibus lorem semper malesuada. Maecenas vel tristique odio. Duis non nisi turpis. Nam malesuada condimentum ultrices. Mauris lectus ante, sollicitudin in odio ac, elementum euismod ipsum. Nulla semper mattis erat, nec sollicitudin turpis gravida ut. Donec aliquet sit amet enim at consequat. Duis lacinia libero ipsum, in faucibus sapien egestas quis. Pellentesque pretium gravida elit sed viverra. Morbi vitae enim at quam cursus dapibus non ac erat. Phasellus ligula lectus, tempor ut ultricies nec, ornare cursus mauris.</Paragraph>
              <Paragraph>Proin mollis, dui in volutpat consectetur, quam sapien eleifend eros, ut consectetur neque mauris vel velit. Aliquam sed ultrices ex. Nam sed augue ligula. Cras et enim lorem. Maecenas eget lacus diam. Praesent nec lectus ut ante suscipit semper. Vestibulum congue justo eu rutrum tempus. Maecenas imperdiet neque sapien, vitae pretium dui aliquam et. Suspendisse potenti. Curabitur euismod nisi a urna auctor, quis viverra tellus euismod. Nulla facilisi. Proin eleifend nunc a nisi venenatis scelerisque. Aliquam erat volutpat. Etiam finibus laoreet ipsum, a rutrum odio venenatis vel.</Paragraph>
            </Article>
          </Container>
        </Root>
      )
    }
  }

  const tree1 = renderer
    .create(<UUITestFunctionComponent></UUITestFunctionComponent>)
    .toJSON();

  expect(tree1).toMatchSnapshot();

  const tree2 = renderer
  .create(<UUITestClassComponent></UUITestClassComponent>)
  .toJSON();

  expect(tree2).toMatchSnapshot();

  const UUITestUnionComponent = UUI.FunctionComponent({
    name: 'UUITestUnionComponent',
    nodes: {
      Root: 'div',
      FunctionComponent: UUITestFunctionComponent,
      // TODO: support class component as ndoe
      // ClassComponent: UUITestClassComponent,
    }
  }, (props: {}, nodes) => {
    const { Root, FunctionComponent } = nodes
    return (
      <Root>
        <FunctionComponent />
      </Root>
    )
  })

  const tree3 = renderer
  .create(<UUITestUnionComponent></UUITestUnionComponent>)
  .toJSON();

  expect(tree3).toMatchSnapshot();
});

it('UUIComponentHOC [more options]', () => {
  const XUITestFunctionComponent = UUI.FunctionComponent({
    name: 'XUITestFunctionComponent',
    prefix: 'XUI',
    separator: '=',
    nodes: {
      Root: 'div',
      Container: 'div',
      Article: 'article',
      Title: 'h1',
      Paragraph: 'p',
    }
  }, (props: {}, nodes) => {
    const { Root, Container, Article, Title, Paragraph } = nodes
    return (
      <Root>
        <Container>
          <Article>
            <Title>Lorem ipsum</Title>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis magna finibus lorem semper malesuada. Maecenas vel tristique odio. Duis non nisi turpis. Nam malesuada condimentum ultrices. Mauris lectus ante, sollicitudin in odio ac, elementum euismod ipsum. Nulla semper mattis erat, nec sollicitudin turpis gravida ut. Donec aliquet sit amet enim at consequat. Duis lacinia libero ipsum, in faucibus sapien egestas quis. Pellentesque pretium gravida elit sed viverra. Morbi vitae enim at quam cursus dapibus non ac erat. Phasellus ligula lectus, tempor ut ultricies nec, ornare cursus mauris.</Paragraph>
            <Paragraph>Proin mollis, dui in volutpat consectetur, quam sapien eleifend eros, ut consectetur neque mauris vel velit. Aliquam sed ultrices ex. Nam sed augue ligula. Cras et enim lorem. Maecenas eget lacus diam. Praesent nec lectus ut ante suscipit semper. Vestibulum congue justo eu rutrum tempus. Maecenas imperdiet neque sapien, vitae pretium dui aliquam et. Suspendisse potenti. Curabitur euismod nisi a urna auctor, quis viverra tellus euismod. Nulla facilisi. Proin eleifend nunc a nisi venenatis scelerisque. Aliquam erat volutpat. Etiam finibus laoreet ipsum, a rutrum odio venenatis vel.</Paragraph>
          </Article>
        </Container>
      </Root>
    )
  })

  const tree1 = renderer
    .create(<XUITestFunctionComponent></XUITestFunctionComponent>)
    .toJSON();

  expect(tree1).toMatchSnapshot();
});

it('UUIComponentHOC [no Root node]', () => {
  const UUITestComponent = UUI.FunctionComponent({
    name: 'UUITestComponent',
    nodes: {
      Container: 'div',
    }
  }, (props: {}, nodes) => {
    const { Container } = nodes
    return (
      <Container>
      </Container>
    )
  })

  const tree1 = renderer
    .create((
      <UUITestComponent
        customize={{
          Container: {
            extendClassName: 'TestingClassName',
            extendStyle: {
              width: 100,
            }
          }
        }}
      ></UUITestComponent>
    ))
    .toJSON();

  expect(tree1).toMatchSnapshot();
});

/**
 * UUI Component customize [className, style, children]
 * 测试 customize.extendClassName、customize.overrideClassName 是否能拼接出正确的 className string；
 * 测试 customize.extendStyle, customize.overrideStyle 是否能合并出正确的 style object；
 * 测试 customize.extendChildrenBefore, customize.extendChildrenAfter, customize.overrideChildren 是否能渲染出正确的 children React.ReactNode[]。
 */
it('UUIComponent customize [className, style, children]', () => {
  const UUITestChild = UUI.FunctionComponent({
    name: 'UUITestChild',
    nodes: {
      Root: 'div',
    }
  }, (props: {}, nodes) => {
    const { Root } = nodes
    return (
      <Root
        className="InnerChildRootClassName"
        style={{
          color: 'red',
          backgroundColor: 'blue',
        }}
      >
        <div>Mio</div>
      </Root>
    )
  })

  const UUITestComponent = UUI.FunctionComponent({
    name: 'UUITestComponent',
    nodes: {
      Root: 'div',
      Extra: 'div',
      Child: UUITestChild,
    }
  }, (props: {}, nodes) => {
    const { Root, Child, Extra } = nodes
    return (
      <Root
        className="InnerRootClassName"
        style={{
          color: 'red',
          backgroundColor: 'blue',
        }}
      >
        <Extra></Extra>
        <div>Shinji</div>
        <Child />
      </Root>
    )
  })

  const tree1 = renderer
    .create(
      <UUITestComponent
        customize={{
          Root: {
            extendClassName: 'OutterRootClassName',
            extendStyle: {
              width: 100,
              color: 'green',
            },
            extendChildrenBefore: <div>Asuka</div>,
            extendChildrenAfter: <div>Rei</div>,
          },
          Extra: {
          },
          Child: {
            Root: {
              extendClassName: 'OutterChildRootClassName',
              extendStyle: {
                width: 100,
                color: 'green',
              },
              extendChildrenBefore: <div>Yūko</div>,
              extendChildrenAfter: <div>Mai</div>,
            },
          },
        }}
      />
    )
    .toJSON();

  expect(tree1).toMatchSnapshot();

  const tree2 = renderer
    .create(
      <UUITestComponent
        customize={{
          Root: {
            extendClassName: 'OutterRootClassName',
            overrideClassName: 'OutterOverridedRootClassName',
            extendStyle: {
              width: 100,
              color: 'green',
            },
            overrideStyle: {
              display: 'flex',
            },
            extendChildrenBefore: <div>Yūko</div>,
            extendChildrenAfter: <div>Mai</div>,
            overrideChildren: <div>Neon Genesis Evangelion</div>
          },
          Child: {
            Root: {
              extendClassName: 'OutterChildRootClassName',
              overrideClassName: 'OutterOverridedChildRootClassName',
              extendStyle: {
                width: 100,
                color: 'green',
              },
              extendChildrenBefore: <div>Yūko</div>,
              extendChildrenAfter: <div>Mai</div>,
              overrideChildren: <div>Nichijo</div>
            }
          },
        }}
      />
    )
    .toJSON();

  expect(tree2).toMatchSnapshot();
});

/**
 * UUI Component [convenience][className, style]
 * 测试 props.className, props.style 会不会被拼接合并到 Root 节点。
 */
it('UUIComponent customize [convenience][className, style]', () => {
  const UUITestComponent = UUI.FunctionComponent({
    name: 'UUITestComponent',
    nodes: {
      Root: 'div',
      Child: 'div',
    }
  }, (props: {}, nodes) => {
    const { Root, Child } = nodes
    return (
      <Root
        className="InnerRootClassName"
        style={{
          color: 'red',
          backgroundColor: 'blue',
          borderRadius: 4,
        }}
      >
        <Child className="ChildInnerClassName">Child</Child>
      </Root>
    )
  })

  const tree1 = renderer
    .create(
      <UUITestComponent
        className="ConvenienceClassName"
        style={{
          color: 'black',
          backgroundColor: 'orange',
        }}
        customize={{
          Root: {
            extendClassName: 'ExtendClassName',
            extendStyle: {
              borderWidth: 1,
              color: 'pink',
            },
          },
        }}
      />
    )
    .toJSON();

  expect(tree1).toMatchSnapshot();

})

/**
 * UUI Component special IntrinsicNodes children
 *
 * 有一部分 IntrinsicNode 不能够传入 children，做了特殊处理，
 * 如果 customize 传入了相关的 children，应该屏蔽掉这些自定义改动。
 */
it('UUIComponent [special IntrinsicNodes children]', () => {
  const UUITestComponent = UUI.FunctionComponent({
    name: 'UUITestComponent',
    nodes: {
      Root: 'div',
      Input: 'input',
      Textarea: 'textarea',
      Hr: 'hr',
      Select: 'select',
      Option: 'option',
    }
  }, (props: {}, nodes) => {
    const { Root, Input, Textarea, Hr, Select, Option } = nodes
    return (
      <Root>
        <Input />
        <Textarea />
        <Hr />
        <Select>
          <Option>option 1</Option>
          <Option>option 2</Option>
        </Select>
      </Root>
    )
  })

  const tree1 = renderer
    .create(
      <UUITestComponent
        customize={{
          Input: {
            extendChildrenBefore: <div>Asuka</div>,
          },
          Textarea: {
            extendChildrenAfter: <div>Rei</div>,
          },
          Hr: {
            overrideChildren: <div>Shinji</div>,
          },
          Option: {
            overrideChildren: <div>EVA</div>
          }
        }}
      />
    )
    .toJSON();

  expect(tree1).toMatchSnapshot();

})

/**
 * UUI Component onXXX calback function customize props
 *
 * 测试 onXXX 回掉函数类型的 customize 参数是否按正常顺序被调用。
 */
it('UUIComponent [customize onXXX callback function]', () => {
  const mockOnClick1 = jest.fn((name: string) => {});
  const mockOnClick2 = jest.fn((name: string) => {});
  const mockOnClick3 = jest.fn((name: string) => {});

  const UUITestComponent = UUI.FunctionComponent({
    name: 'UUITestComponent',
    nodes: {
      Root: 'div',
      Trigger1: 'div',
      Trigger2: 'div',
      Trigger3: 'div',
    }
  }, (props: {}, nodes) => {
    const { Root, Trigger1, Trigger2, Trigger3 } = nodes
    return (
      <Root>
        <Trigger1 id="UUITestComponentTrigger1" onClick={() => { mockOnClick1('FirstCall Inner') }} />
        <Trigger2 id="UUITestComponentTrigger2" onClick={() => { mockOnClick2('FirstCall Inner') }} />
        <Trigger3 id="UUITestComponentTrigger3" />
      </Root>
    )
  })

  const wrapper = mount((
    <UUITestComponent
      customize={{
        Trigger1: {
          onClick: () => { mockOnClick1('SecondCall Customize') },
        },
        Trigger3: {
          onClick: () => { mockOnClick3('SecondCall Customize') },
        },
      }}
    />
  ));

  wrapper.find('#UUITestComponentTrigger1').at(0).simulate('click')
  wrapper.find('#UUITestComponentTrigger2').at(0).simulate('click')
  wrapper.find('#UUITestComponentTrigger3').at(0).simulate('click')

  expect(mockOnClick1.mock.calls.length).toBe(2);
  expect(mockOnClick1.mock.calls[0][0]).toBe('FirstCall Inner');
  expect(mockOnClick1.mock.calls[1][0]).toBe('SecondCall Customize');

  expect(mockOnClick2.mock.calls.length).toBe(1);
  expect(mockOnClick2.mock.calls[0][0]).toBe('FirstCall Inner');

  expect(mockOnClick3.mock.calls.length).toBe(1);
  expect(mockOnClick3.mock.calls[0][0]).toBe('SecondCall Customize');
})

/**
 * UUI Component refs
 *
 * 测试 refs 类型的 customize 参数是否正常有效。
 */
it('UUIComponent [refs]', () => {
  const ref1 = React.createRef<any>();
  const ref2 = React.createRef<any>();
  const ref3 = React.createRef<any>();
  const ref4: { current: any } = { current: null };

  const UUITestComponent = UUI.FunctionComponent({
    name: 'UUITestComponent',
    nodes: {
      Root: 'div',
      Child1: 'div',
      Child2: 'div',
      Child3: 'div',
    }
  }, (props: {}, nodes) => {
    const { Root, Child1, Child2, Child3 } = nodes
    return (
      <Root>
        <Child1 ref={ref1} />
        <Child2 ref={ref3} />
        <Child3 />
      </Root>
    )
  })

  mount((
    <UUITestComponent
      customize={{
        Child1: {
          ref: ref2,
        },
        Child2: {
          ref: (ref: any) => { ref4.current = ref }
        },
        Child3: {
          ref: 123 as any,
        }
      }}
    />
  ));

  expect(ref1.current).toBe(ref2.current);
  expect(ref3.current).toBe(ref4.current);
})