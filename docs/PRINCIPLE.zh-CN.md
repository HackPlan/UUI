# 原理与实现

[English](https://github.com/HackPlan/UUI/blob/master/docs/PRINCIPLE.md) | 简体中文

编写该文档的目的是为了使开发者更易于了解 UUI 的基本设计思路以及 UUI 是如何被实现构建出来的。我们很高兴看到社区的贡献，但我们不太可能会接受违反其中一项或多项原则的提交贡献。然而，由于 UUI 现在处于还处于早期开发的阶段，下文提到的这些内容不一定完全正确，因此我们也非常欢迎您能对这些内容提出意见和建议。

> **注意**
>
> 这篇文档主要着重描述 UUI 的基本设计思路以及 UUI 是如何被实现的，而不是讲解如何去使用它。
> 如需 UUI 的使用入门文档，请查看 README 文档。

## 项目组成

UUI 的开源代码仓库包含很多的内容，包括不限于核心工具文件、UI 组件文件、Storybook 文档文件以及单元测试文件等。不同部分的文件应该分开存放在正确的目录文件夹，不应该随便放置。

* UUI 的功能代码全部存储在项目仓库 `src` 文件夹里，`src` 里的文件会被 rollup 编译打包成 js 文件并发布在 NPM。（storybook 以及其他不相关的文件不应该存放在 `src` 里）
  * `core` 存放核心工具的地方，这些工具用来构建 UUI 的 UI 组件
  * `utils` 通用工具
  * `hooks` React Hooks 工具
  * `styles` 组件的 Sass 样式文件
  * `icons` 图标库
  * `components` UU 组件库
* `stories` 存放 Storybook story 的地方
* `tests` 单元测试文件
* `docs` 存放 UUI 开发实现和使用说明的文档


## 组件工具

UUI 的一大特点是**组件样式自定义功能**。为了让使用 UUI 的开发者能更方便快捷地修改组件的样式，我们在实现的时候遵从了一些设计模式，用来高效地将样式自定义功能应用于所有的 UUI 组件。这些设计模式最后以组件工具的形式被实现出来。

UUI 的 UI 组件有一些共有通用的功能，为了不重复在每个组件内重复实现这些功能，UUI 开发了一套 HOC 工具函数。这里提到的 HOC 工具主要就是指位于 `src/core/UUIComponent.tsx` 的 `UUIFunctionComponent` 和 `UUIClassComponent`。

所有通过 HOC 工具构建实现的组件都包含了以下的功能特性：

* 组件内部的所有 elements 都有类型，在 UUI 里被称为 Node；
* 每种 Node 都有自己的名字，在 DOM 里表现的时候，会有对应的 className；
* 因为组件内部每个 element 都是一种 Node，我们可以通过 NodeName、NodeClassName 准确快速的定位；
* 组件可以传入一个 `props.customize` 属性，用来修改定制这个组件内部 elements 的 `className`、`style`、`children` 等等

同时，使用 HOC 工具也伴随着一些约定和限制：

* 组件在实现业务功能时，只能使用由 HOC 工具提供的 Node
* 定义的第一个 Node 名字必须为 `Root`（目前是有这样的限制，以后考虑去除）
* 定义组件的业务功能 Props，使用 `XxxFeatureProps` 的命名格式（非强制）
* 如果是一些定义组件样式的 Props，使用 `XxxStylingProps` 的命名格式（非强制）
* 使用 `STATE_xxx` 和 `YYY_xxx` 的命名格式在 className 标记组件状态和属性（非强制）

我们以 `按钮 Button` 这个组件作为示例：

```tsx
import classNames from 'classnames';
import { omit } from 'lodash-es';
import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { LoadingSpinner } from '../Loading';

export interface ButtonStylingProps {
  styling?: {
    type?: 'default' | 'primary' | 'text';
  };
}

export interface ButtonFeatureProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
}

export const Button = UUIFunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
}, (props: ButtonFeatureProps & ButtonStylingProps, nodes) => {
  const { Root, LoadingSpinner, Content } = nodes

  return (
    <Root
      role="button"
      {...omit(props, 'customize', 'styling', 'className', 'style', 'loading')}
      className={classNames({
        ...(props.styling?.type ? {
          [`TYPE_${props.styling?.type}`]: true,
        } : {}),
        'STATE_disabled': props.disabled || props.loading,
        'STATE_loading': props.loading,
      })}>
      {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = UUIFunctionComponentProps<typeof Button>
```

首先是我们定义了两个 Props，分别是 `ButtonStylingProps` 和 `ButtonFeatureProps`。这两个 Props 类型是作为 `按钮 Button` 这个组件业务功能参数类型定义，所以它们被定义在了 `src/components/Button/Button.tsx` 文件，而不是 `src/core/UUIComponent.tsx` 文件里。

然后是我们通过 `UUIFunctionComponent` HOC 工具创建了一个 Button Component。

UUI 提供的两个 HOC 方法（`UUIFunctionComponent` 和 `UUIClassComponent`）分别用来创建 `function-based component` 和 `class-based component`。这两个方法第一个参数 `options` 接受相同类型的数据，用来定义一些这个组件的基础信息：

* `prefix` 定义组件节点 className 前缀 （可选参数，默认为 `UUI`）
* `separator` 定义节点 className 前缀、名字和节点名之前的连接字符 （可选参数，默认为 `-`）
* `name` 定义组件的名字
* `nodes` 定义这个组件包含有哪些 Node，包括 Node 的名字和内容。这个参数接受一个 Object：`key` 只能是 string；value 可以是 `div`、`p`、`span` 和 `h1` 等这样的 HTML 内置组件（在 UUI 里被称为 `IntrinsicNode`），也可以是一个 UUI 的组件（在 UUI 里被称为 `ComponentNode`）。HOC 工具根据传入的 `options.nodes` 数据，构建出真正可用的 `IntrinsicNode` 和 `ComponentNode`，提供给组件使用以实现业务功能。


同样地，也可以用 `UUIClassComponent` 来创建 `按钮 Button` 组件：

```tsx
export class Button extends UUIClassComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
})<ButtonFeatureProps & ButtonStylingProps, {}> {
  render() {
    const { Root, LoadingSpinner, Content } = this.state.nodes

    return (
      <Root
        role="button"
        {...omit(props, 'customize', 'styling', 'className', 'style', 'loading')}
        className={classNames({
          ...(props.styling?.type ? {
            [`TYPE_${props.styling?.type}`]: true,
          } : {}),
          'STATE_disabled': props.disabled || props.loading,
          'STATE_loading': props.loading,
        })}>
        {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
        {props.children ? <Content>{props.children}</Content> : null}
      </Root>
    )
  }
}
```

在完成 `按钮 Button` 的功能实现之后，就可以正常地使用它了。一般的使用方式和其他 UI 库的组件差不多：

```tsx
<Button loading styling={{ type: 'primary' }}>Click me!</Button>
```

由于是通过 HOC 工具创建的，这个组件相比于其他一般性按钮组件，多出了三个 Props，分别是 `className`、`style` 和 `customize`：

* `className` 对于 UUI 的组件来说，一个组件包含了多个 elements，这个 className 是插入进 Root Node 的 `className`。
* `style` 同 `className` 一样，这个 style 是合并进 Root Node 的 style。
* `customize` 的类型在不同组件中是不一样的，主要取决于这个组件声明了哪些 Nodes，以及这些 Nodes 是哪些类型的。

`props.customize` 有一个比较复杂的类型：

```tsx
export type UUIComponentCustomizeProps<
  X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT },
> = {
  /**
   * Customize component nodes
   * @default none
   */
  customize?: {
    [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
      ? NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>
      : (
        X[key] extends FunctionComponentNodeT
        ? NonNullable<Parameters<X[key]>[0]['customize']>
        : (
          X[key] extends ClassComponentNodeT
          ? React.ComponentProps<X[key]>['customize']
          : never
        )
      )
  };
}
```

`props.customize` 的第一层 key 接受当前组件的定义的 nodeName，比如 `按钮 Button` 定义了三个 Nodes `Root`、`LoadingSpinner` 和 `Content`，所以 customize 只支持这三个字符串字面量作为key。

```tsx
<Button
  customize={{
    Root: { /* ... */ },
    LoadingSpinner: {
      Root: { /* ... */ },
      Icon: { /* ... */ },
    },
    Content: { /* ... */ },
  }}
>
  Customize Button
</Button>
```

得益于 TypeScript 的类型推断，对于一些复杂的组件（有很多 Node 以及嵌套 Component），可以使用编辑器或 IDE 的补全功能补全 key。

`props.customize` 的第一层 value 可以传入类型 `NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>`，这是一个交叉类型（[Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)），由一组类型共同组成；或者是一个 UUI Component 的 Customize Props（嵌套结构）：

```tsx
export interface NodeCustomizeClassNameProps {
  className?: string;
  overrideClassName?: string;
  extendClassName?: string;
}
export interface NodeCustomizeStyleProps {
  style?: React.CSSProperties;
  overrideStyle?: React.CSSProperties;
  extendStyle?: React.CSSProperties;
}
export interface NodeCustomizeChildrenProps {
  children?: React.ReactNode;
  overrideChildren?: React.ReactNode;
  extendChildrenBefore?: React.ReactNode;
  extendChildrenAfter?: React.ReactNode;
}
export interface NodeCustomizeDataAttributesProps {
  dataAttributes?: {
    [key: string]: any;
  };
}
export interface NodeCustomizeAriaAttributesProps {
  ariaAttributes?: UUICustomizeAriaAttributes;
}
export type NodeCustomizeProps =
  & NodeCustomizeClassNameProps
  & NodeCustomizeStyleProps
  & NodeCustomizeChildrenProps
  & NodeCustomizeDataAttributesProps
  & NodeCustomizeAriaAttributesProps
  & React.RefAttributes<any>
```

从这个类型 `NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>` 中可以看出，`customize[NodeName]` 可以传这些属性：

* `overrideClassName` 覆盖目标 Node className
* `extendClassName` 在目标 Node className 之后附加
* `overrideStyle` 覆盖目标 Node style
* `extendStyle` 合并目标 Node style （相同的 key 覆盖）
* `overrideChildren` 覆盖目标 Node children
* `extendChildrenBefore `在目标 Node children 之前添加
* `extendChildrenAfter` 在目标 Node children 之后添加
* `dataAttributes` 覆盖 `data-*` 属性
* `aria-*` 覆盖 `aria-*` 属性
* `ref` 合并 ref（实现参考 `src/core/utils/mergeRefs.ts`）
* `onXXX` 支持以 `on` 开头的一系列函数属性，HOC 工具会把两个函数属性合并成一个函数执行，内部先执行，外部后执行

> 由于所有的组件都使用 HOC 工具构建的，所以 HOC 工具的代码稳健性和正确性对于 UUI 至关重要。因此，我们对 `src/core/*` 目录下的文件要求 100% 的单元测试覆盖率。更多的单元测试信息请参考 [TESTING.zh-CN.md](https://github.com/HackPlan/UUI/blob/master/docs/TESTING.zh-CN.md)。

## 类型工具

```tsx
export type UUIComponentProps<P, X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT }> = P & UUIConvenienceProps & UUIComponentCustomizeProps<X>
export type UUIFunctionComponentProps<T extends (...args: any) => any> = Parameters<T>[0]
export type UUIClassComponentProps<T extends React.JSXElementConstructor<any>> = React.ComponentProps<T>
```

在使用 HOC 工具实现某个组件时，会遇到各种各样的 Props 类型定义。在使用某个组件的时候，我们根据文本编辑器或者 IDE 查看类型提示，通常能看到这些类型：

* `XXXFeatureProps` 组件的业务功能相关的 Props 类型
* `XXXStylingProps` 组件的样式相关的 Props 类型
* `UUIConvenienceProps` UUI 组件的 className 和 style 类型定义
* `UUIComponentCustomizeProps` 由 TypeScript 推断出来的 customize 类型

如果开发者希望定义一些样式封装 UUI 组件，可以像下面这样的写法：

```tsx
function StyledButton(props: ButtonFeatureProps) {
  return (
    <Button
      customize={{
        Root: {
          backgroundColor: 'red',
          color: 'blue',
        }
      }}
      {...props}
    >
      {props.children}
    </Button>
  )
}

<StyledButton>Click me!</StyledButton>
```

如果希望封装 UUI 组件并且定制样式之后依然支持 customize 参数，可以使用 UUIComponentProxy：

```tsx
export const StyledButton = UUIComponentProxy(Button, {
  Root: {
    extendStyle: {
      backgroundColor: "orange",
      color: "white"
    },
    extendChildrenBefore: <span>🐱</span>,
    extendChildrenAfter: <span>🐰</span>
  }
});

<StyledButton
  customize={{
  	Root: {
      extendStyle: {
        backgroundColor: 'red',
        color: 'white',
      },
    },
  }}
>Click me!</StyledButton>
```

## 组件前缀和分隔符

UUI 的组件支持在开发阶段和使用阶段定义组件的前缀和分隔符。

比如我们可以在开发阶段定义一个组件：

```tsx
const XUIButton = UUIFunctionComponent({
  prefix: "XUI",
  name: "Button",
  separator: "+",
  nodes: { Root: 'button' },
}, (props: {}, nodes) => {
  // ...
  return <Root></Root>
})
```

那么渲染出来的 HTML 大概长这个样子：

```html
<button className="XUI+Button+Root">
</button>
```

这个 options 里的 prefix 和 separator 主要是提供给其他开发者可能需要使用 UUI Core Utils 创建自己的组件时使用

而在使用组件的时候， 使用者可以传入 `props.prefix` 和 `props.separator`：

```tsx
function Demo() {
  return <Test prefix="YUI" separator="#"></Test>
}

// output html
<div className="YUI#Test#Root">
</div>
```

这个主要是给使用者需要完全自定义样式的时候使用，修改了 prefix 或者 separator 之后，UUI 自带的样式就失效了（className 全部改变了，而 UUI 自带的样式根据这些 className 实现）

### Props.customize 数据流合并

UUI 可以在多处传入 customize 定制数据，这些定制数据会以一定规则合并为一份数据并应用到最终网页DOM中。

数据流合并优先级由高到低如下：

1. 使用者对单个组件传入的 customize；
2. 使用者对单个组件传入的 ConniventProps { className, style, id, data-*, aria-* }；
3. 使用者使用 UUIComponentProxy 提供的局部 customize；
4. 使用者使用 UUIProvider 提供的全局 customize；
5. 开发者在 UUI 组件中使用其他 UUI 组件作为子节点（ComponentNode），传入的 customize；
6. 开发者在 UUI 组件中使用的 IntrinsicNode 传入的 className, style, id, data-*, aria-*。

customize 合并细节：

* 对于 `extendClassName`，总是附加在当前 className 之后；
* 对于 `extendStyle`，按优先级进行对象合并；
* 对于 `extendChildrenBefore`，总是附加在当前 ReactNode 之前；
* 对于 `extendChildrenAfter`，总是附加在当前 ReactNode 之后。

## 组件

* 所有组件以受控模式（Controlled Mode）实现，唯一例外，表单相关的组件同时还支持非受控模式（Uncontrolled Mode）。
* UUI 组件的样式代码和功能代码完全分离，组件内部不应该写静态的样式代码。
* 所有的样式代码应该写进独立的样式文件并且放在 `src/styles` 里面。

## 内置图标库

目前 UUI 使用由 [Feather](https://feathericons.com/) 提供的图标，如果需要使用新的图标，优先从 Feather 中选择图标。组件库不应该包含过多的图标文件，也不应该包含一些没有使用的图标文件，图标不应该导出给使用方使用。

