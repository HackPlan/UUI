# Notes

UUI 是一个尝试给使用者提供可高度定制化的 UI 框架。

它给使用者提供了一组常用的 UI 组件，并且这些组件能通过传入一些特殊的属性来修改组件内部的样式和结构。

## 基础组件 UUI Component Util

UUI 提供了一个基础的构建 UUI 风格的组件的工具类：

```typescript
class UUI {
  static FunctionComponent(options, WrappedComponent) =>
    (props) => JSX.Element

  static ClassComponent(options) =>
    class WrappedComponent extends React.Component { /* ... */ }
}
```

这个工具类主要包含两个方法，分别用来创建 `Function Component` 和 `Class Component`，它们都算是一种 HOC 实现。

#### Function Component 的简单用法

```tsx
Function EmptyDemo(props: {}) {
  return <div>empty</div>
}

interface DemoAProps {
  children?: React.ReactNode
}

export const DemoA = UUI.FunctionComponent({
  prefix: 'UUI',
  separator: '-',
  name: 'DemoA',
  nodes: {
    Root: 'div',
    Content: 'p',
    Empty: EmptyDemo,
  }
}, (props: DemoAProps, nodes) => {
  const { Root, Content, Empty } = nodes

  // ... Component Feature Code

  return (
    <Root>
      <Content>{props.children}</Content>
      <Empty></Empty>
    </Root>
  )
})

```

我们通过 `UUI.FunctionComponent` 创建了一个名叫 DemoA 的组件。

FunctionComponent 方法接受两个参数，第一个参数 options 用来定义一些这个组件的基础信息

* `prefix` 定义组件节点 className 前缀 （可选参数，默认为 UUI）
* `separator` 定义节点 className 前缀、名字和节点名之前的连接字符 （可选参数，默认为 - ）
* `name` 定义组件的名字
* `nodes` 定义这个组件包含有哪些 Node，包括 Node 的名字和内容。这个参数接受一个 Object：`key` 只能是 string；value 可以是 `div`、`p`、`span` 和 `h1` 等这样的内置组件（其实就是一系列 HTML 标签名），也可以是一个 UUI 风格 的 Function Component。

> Node 在 UUI 是一个特有的概念，表示一个组件内部某一部分节点，这些 Node 都有自己的名字。理论上，一个 UUI 风格的组件内部只允许 Node 存在。（例如上面的示例代码，我们不应该在 Root 里直接加上 <div> 或者 <p> 这样的 Element）
>
> 在 UUI 里的 Node 分为两类：`IntrinsicNode` 和 `ComponentNode`。

第二个参数 WrappedComponent 接收真正实现组件功能业务的 render 函数。这个函数有两个参数：第一个参数是开发的目标组件的 props；第二个参数 nodes 是根据 UUI.FunctionComponent 传入的nodes信息生成的 Node Component，这些组件可以直接在 JSX 里使用。

#### Class Component 的简单用法

`UUI.ClassComponent` 的用法类似，只不过不需要传第二个参数 `WrappedComponent`。

```tsx
export class DemoB extends UUI.ClassComponent({
  name: 'DemoB',
  nodes: {
    Root: 'div',
    Content: 'p',
    DemoA: DemoA,
  },
})<DemoBProps, DemoBState> {
  constructor(props: ToasterProps) {
    super(props)
  }

  // ... Component Feature Code

  render() {
    // extend 自 UUI.ClassComponent 的组件 this 里会有一个 nodes 变量
    const { Root, Content } = this.nodes
    return (
      <Root>
        <Content>{props.children}</Content>
      </Root>
    )
  }
}
```

#### Customize Props

通过 UUI Component Util 创建的组件，会自带一个 customize 的 props，这个 props 用来提供给组件使用者自定义组件样式。

```tsx
function DemoC() {
  return (
    <DemoB
      customize={{
        Root: {
          extendClassName: "extend-class-a"
        },
        DemoA: {
          Root: {
            extendStyle: {
              backgroundColor: 'red'
            }
          }
        }
      }}
    ></DemoA>
  )
}
```

customize 的 type 同样是根据 `options.nodes` 提供的信息生成的。对于一个 `IntrinsicNode` customize props 可以传这些参数：

* `overrideClassName` 覆盖 Node className
* `extendClassName` 在 Node className 之后附加
* `overrideStyle` 覆盖 Node style
* `extendStyle` 合并 Node style （相同的 key value 覆盖）
* `overrideChildren` 覆盖 Node children
* `extendChildrenBefore `在 Node children 之前添加
* `extendChildrenAfter` 在 Node children 之后添加'

#### Types

`UUIComponentCustomizeProps` 和 `UUIComponentNodes` 是两个类型工具，分别用来根据 options.nodes 获取 customize props 和 nodes 的类型。

##### 存在的一些问题

* UUI.FunctionComponent 和 UUI.ClassComponent 目前还不能很好的支持 Generic Props，所以目前采用了一种很别扭的方式实现，具体可以看 Select 和 RadioGroup 组件。
* UUI Component Util 的类型定义存在一些不正确不准确的地方，需要改进。

#### 旧版工具

UUI 的基础工具总共写了三次，UUI Component Util 之前有 `initStylish` 和 `initStylished` 两个方法。

`initStylish` 是项目创建初始第一个版本的工具，主要的实现思路是根据提供的 NodeName 和组件 root props 里的 extendClassName extendStyle...等等属性来生成适合当前这个 Node 的 props，这个工具调用之后会直接返回一个 props object，需要我们自己手动的管理如何传入 node element props。

`initStylished` 是在前一个方法的基础上做的一个优化升级。相比前一个方法返回 props，这个方法直接返回了一个生成 component 的工具，可以直接使用 `stylished.element` 和 `stylished.component` 生成我们需要的 node component，再在 jsx 里直接使用。



## 目前已有的组件

| 组件名             | 描述               | 备注                                          |
| ------------------ | ------------------ | --------------------------------------------- |
| Button             | 按钮               |                                               |
| Checkbox           | 多选框             |                                               |
| Dialog             | 对话框             |                                               |
| NumberField        | 数字输入框         | 优化数字输入                                  |
| TextField          | 文本输入框         | 针对文本输入                                  |
| DateLabel          | 日期格式化显示     | 提供 Excel 推荐的格式化                       |
| TimeLabel          | 时间格式化显示     | 提供 Excel 推荐的格式化                       |
| MoneyLabel         | 货币金额格式化显示 | 提供 Excel 推荐的格式化                       |
| Pagination         | 分页控制           |                                               |
| Radio / RadioGroup | 单选框             |                                               |
| Select             | 选择框             |                                               |
| Skeleton           | 骨架               |                                               |
| Switch             | 开关               | 基于 rc-switch 实现，暂不支持 customize props |
| Table              | 表格               | 有基础功能，部分高级功能还未实现              |
| Tag                | 标签               |                                               |
| Toast              | 提示弹框           |                                               |

