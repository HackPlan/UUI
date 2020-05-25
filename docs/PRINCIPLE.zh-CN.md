# 原理与实现

[English](https://github.com/HackPlan/UUI/blob/master/docs/PRINCIPLE.md) | 简体中文

编写该文档的目的是为了使开发者更易于了解 UUI 的基本设计思路以及 UUI 是如何被实现构建出来的。我们很高兴看到社区的贡献，但我们不太可能会接受违反其中一项或多项原则的提交贡献。然而，由于 UUI 现在处于还处于早期开发的阶段，下文提到的这些内容不一定完全正确，因此我们也非常欢迎您能对这些内容提出意见和建议。

> **注意**
>
> 这篇文档主要着重描述 UUI 的基本设计思路以及 UUI 是如何被实现的，而不是讲解如何去使用它。
> 如需 UUI 的使用入门文档，请查看 README 文档。

## 项目组成

UUI 的核心功能代码全部存储在项目仓库 `src` 文件夹里，`src` 里的文件会被 tsc 编译成 js 文件并打包发布在 npm，所以 storybook 以及其他不相关的文件不应该存放在 `src` 里。

`src` 里，主要有这么几个模块：

* `core` 存放 UUI 核心工具的地方，这些工具用来构建 UUI 的组件
* `utils` 实现 UUI 组件部分功能需要的通用工具
* `hooks` 实现 UUI 组件部分功能需要的 React Hooks 工具
* `styles` UUI 组件的样式文件
* `icons` UUI 图标库
* `components` UUI 组件库

## UUI 核心工具

* 所有的 UUI 组件都应该使用 UUI HOC 来构建。
* 组件内部的 DOM 应该完全由 UUI HOC 提供的 nodes 来构建。

### Customize Extra Props

这个部分定义了一部分额外组件参数 `CustomizeProps`，用来描述如何自定义这个组件的 `style`、`className` 和 `children`。

### Customize Extra Props Helper

这个部分实现了如何去合并处理 `CustomizeProps`。

### IntrinsicNode & ComponentNode

UUI 组件实现了两种 Elements，被称作为 `IntrinsicNode` 和 `ComponentNode`。UUI 组件内部的 DOM 完全由这两种 Node 构成。

### Type Helper

一些组件类型的推断帮助工具。

### UUI HOC

UUI 提供了两个 HOC 方法（`UUI.FunctionComponent` 和 `UUI.ClassComponent`）用来创建 `function-based component` 和 `class-based component`，所有的 UUI 组件都应该通过 UUI HOC 构建。

这两个方法第一个参数 `options` 接受相同类型的数据，用来定义一些这个组件的基础信息：

* `prefix` 定义组件节点 className 前缀 （可选参数，默认为 UUI）
* `separator` 定义节点 className 前缀、名字和节点名之前的连接字符 （可选参数，默认为 - ）
* `name` 定义组件的名字
* `nodes` 定义这个组件包含有哪些 Node，包括 Node 的名字和内容。这个参数接受一个 Object：`key` 只能是 string；value 可以是 `div`、`p`、`span` 和 `h1` 等这样的 HTML 内置组件，也可以是一个 UUI 的组件。

## 组件样式

* UUI 组件的样式代码应该和功能代码完全分离，组件内部不应该写静态的样式代码。
* 所有的样式代码应该写进独立的样式文件并且放在 `src/styles` 里面。

## 内置图标库

目前 UUI 使用由 [Feather](https://feathericons.com/) 提供的图标，如果需要使用新的图标，优先从 Feather 中选择图标。

