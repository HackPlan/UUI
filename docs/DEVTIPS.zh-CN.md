# DEVTIPS

（这个文档是给 UUI 开发者而不是使用者看的）

（临时文档，等内容多了之后再整理合并）

## React.ReactNode 与 string 类型

如果一个组件需要定义一个参数，来给用户提供自定义显示内容的能力，比如说 `多选框 Checkbox` 的 `props.label` 参数，那么使用 `React.ReactNode` 是一个更好的选择，用户在传入 `label` 参数时可以更灵活的显示内部的内容。

但是这不代表所有的地方都应该使用 React.ReactNode，比如 `文字提示 Tooltip` 的 `props.label` 参数，类型设置成 `string` 更好，因为这个组件本来设计上的使用目标就是显示一些简单的文本。而更复杂的内容展示可以使用 `气泡卡片 Popover`。

`React.ReactNode` 本身这个类型就可以直接传入一个字符串，所以在写 TypeScript 类型的时候，并不需要写成 `label?: React.ReactNode | string`。

## 和样式有关的 Props

在普通的 UI 组件库中（比如 Ant Design 或者 Blueprint.js），组件可能存在多个用来控制样式的 props，这些库通过这样的方式来增加自身的样式可定制程度。

但是在 UUI 中，理论上我们不需要实现这一类的 props，由于 UUI 的所有组件都是通过 `UUI.FunctionComponent` 或者 `UUI.ClassComponent` HOC 方法来创建组件的，所以这些组件会自带一个 customize 属性，提供给用户用来自定义修改组件样式。

所以在开发 UUI 组件的时候，（至少目前），我们把精力放在更好地实现组件功能上，而不是提供大量不同的样式，再提供props让用户从中做选择。

## 组件 Props 类型

UUI 提供的组件，props 类型并不完全是手写申明的，比如 props.customize 是根据组件提供的 nodes 信息自动生成的类型，所以相比其他框架的组件props类型要复杂一些。
UUI 对这些 props 做了一些分组和命名，主要有这么几种类型组成：

（XXXX 表示组件名）

* XXXXFeatureProps 组件功能相关的 props
* XXXXStyling 组件样式相关的 props（不常见，只在少数组件中存在）（这部分props理论上只影响样式，对DOM没有任何影响）
* UUIConvenienceProps className 和 style props
* UUIComponentCustomizeProps 由 UUI 生成的节点自定义 props

`type XXXXProps = XXXXFeatureProps & XXXXStyling & UUIConvenienceProps & UUIComponentCustomizeProps`

如果你在使用 UUI 组件的时候希望包装一层，在这个包装层传入相关的自定义参数，那么包装新生成的组件 props 类型可以直接继承 `XXXXFeatureProps`。

示例 `StyledButton.tsx`：

```tsx
export interface StyledButtonProps extends ButtonFeatureProps {}
export function StyledButton(props: StyledButtonProps) {
  return (
    <Button
      {...props}
      customize={{
        Root: {
          backgroundColor: 'red',
        }
      }}
    >
      {props.children}
    </Button>
  )
}
```

## 组件状态 className

UUI 组件的 DOM 节点中存在一系列 className 用来描述组件的一些状态和类型，例如 `Button` 组件中的 `STATE_loading`、`STATE_disabled` 和 `TYPE_primary` 等等。

可以很清晰的看出，这些 className 都有整齐的格式，用下划线来分割，左边表示这个className 的种类（全大写），右边表示当前值（全小写）。【本来想用 `:` 来做分隔符的，但是这样容易和CSS伪类冲突混淆，而且据说小程序也不支持 class 里面有 `:`】

这些 className 用来方便开发者自定义样式。

## 全局属性 `window` 和 `document`

在 `服务端渲染 SSR(Server-Side Render) ` 中不存在 `window` 和 `document`，为了让 UUI 支持 SSR 框架（比如 `next.js` 和 `nuxt.js`），请不要直接在 UUI 实现代码里直接访问这些属性。

在 UUI 的组件实现中，如果需要访问到 `window` 或 `document`，请通过 `src/utils/ReactHelper.tsx` 文件拿到这些变量。

在 `ReactHelper` 中这两个属性的类型为

```tsx
interface ReactHelper {
  window: Window & undefined;
  document: Window & undefined;
}

import ReactHelper from 'path/to/ReactHelper';

ReactHelper.document?.body //......
```

在实际访问时，请添加条件判断是否存这些属性。

## UUI 可能会被用在纯 JavaScript 项目里

UUI 是以 TypeScript 为基础来开发的，但是在生产打包之后，这一套组件库可能会被使用在 JavaScript 项目里。没有了静态类型检查，使用者可能会不小心传入任何类型的值，对于这种情况，UUI 应该做一些特别的处理。

这里提一下，如果有新加入的 UUI 维护者/贡献者，在开发新组件或者给旧组件添加新参数的时候，要重点处理一下上述说到的情况。

##