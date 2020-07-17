# DEVTIPS

（临时文档，等内容多了之后再整理合并）

## React.ReactNode 与 string 类型

如果一个组件需要定义一个参数，来给用户提供自定义显示内容的能力，比如说 `多选框 Checkbox` 的 `props.label` 参数，那么使用 `React.ReactNode` 是一个更好的选择，用户在传入 `label` 参数时可以更灵活的显示内部的内容。

但是这不代表所有的地方都应该使用 React.ReactNode，比如 `文字提示 Tooltip` 的 `props.label` 参数，类型设置成 `string` 更好，因为这个组件本来设计上的使用目标就是显示一些简单的文本。而更复杂的内容展示可以使用 `气泡卡片 Popover`。

`React.ReactNode` 本身这个类型就可以直接传入一个字符串，所以在写 TypeScript 类型的时候，并不需要写成 `label?: React.ReactNode | string`。