# DEVTIPS

（临时文档，等内容多了之后再整理合并）

## React.ReactNode 与 string 类型

如果一个组件需要定义一个参数，来给用户提供自定义显示内容的能力，比如说 `多选框 Checkbox` 的 `props.label` 参数，那么使用 `React.ReactNode` 是一个更好的选择，用户在传入 `label` 参数时可以更灵活的显示内部的内容。

但是这不代表所有的地方都应该使用 React.ReactNode，比如 `文字提示 Tooltip` 的 `props.label` 参数，类型设置成 `string` 更好，因为这个组件本来设计上的使用目标就是显示一些简单的文本。而更复杂的内容展示可以使用 `气泡卡片 Popover`。

`React.ReactNode` 本身这个类型就可以直接传入一个字符串，所以在写 TypeScript 类型的时候，并不需要写成 `label?: React.ReactNode | string`。

## 和样式有关的 Props

在普通的 UI 组件库中（比如 Ant Design 或者 Blueprint.js），组件可能存在多个用来控制样式的 props，这些库通过这样的方式来增加自身的样式可定制程度。

但是在 UUI 中，理论上我们不需要实现这一类的 props，由于 UUI 的所有组件都是通过 `UUI.FunctionComponent` 或者 `UUI.ClassComponent` HOC 方法来创建组件的，所以这些组件会自带一个 customize 属性，提供给用户用来自定义修改组件样式。

所以在开发 UUI 组件的时候，（至少目前），我们把精力放在更好地实现组件功能上，而不是提供大量不同的样式，再提供props让用户从中做选择。