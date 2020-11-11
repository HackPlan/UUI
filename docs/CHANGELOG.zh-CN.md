# 更新日志

[English](https://github.com/HackPlan/UUI/blob/master/CHANGELOG.md) | 简体中文

### v0.5.4

- 修复计数器 Stepper 样式 - 在 Firefox 下隐藏 input\[type=number\]默认的的 spins
- ListBox 默认关闭横向滚动、隐藏横向滚动条
- 选择器 Select 支持禁用

### v0.5.3

- 修复 Select 类型和样式
- 最小 React 版本 16.14.0

### v0.5.2

- 修复 Layout UI样式
- 修复 Select value 类型

### v0.5.1

- 优化 IntrinsicNode 性能
- 修复 Layout UI样式
- 支持传入 id props 到组件 Root 节点

### v0.5.0

- 符合 WAI-ARIA 1.2 规范
- 新组件 `List`

### v0.4.15

- 新组件 `Collapse` `Accordion`
- `Accordion` 支持键盘操作
- 修复 `Select` list unique keys 警告

### v0.4.14

- 选择器 Select 更新样式和 Option 类型

### v0.4.13

- 修复组件样式: 统一部分组件的高度
- 修复 SVG 图标配置
- 所有组件支持传入 `prefix` 和 `separator` 到 Props

### v0.4.12

- 修复了一些问题

### v0.4.11

- 修复了一些问题

### v0.4.10

- 修复 SSR 警告: Expected server HTML to contain a matching <div> in <div>
- 升级 typescript 到 3.9.7 (修复了错误： `ReferenceError: _a is not defined bug`)

### v0.4.9

- 使用 React Portal 的组件支持服务端渲染 SSR (Server-Side Render)
- 修复组件 nodes 可能会有重复 class 的问题

### v0.4.8

- `Table` TableColumn 可以不传 onRowRender 属性

### v0.4.7

- UUI Component Util - options.nodes 支持传入 class component
- 新组件 `NumberAbbrLabel`
- 新组件 `Tabs`
- UUI 组件支持 data-* 属性
- UUI 组件支持 WAI-ARIA 属性

### v0.4.6

- Table cache row render 修复问题

### v0.4.5

- Table 可选缓存row渲染

### v0.4.4

- Slider - 点击选择值
- MoneyLabel 去除 accounting.js 依赖

### v0.4.3

- 修复 Slider

### v0.4.2

- 更新 accounting.js 依赖（accounting.js 的 package.json dependencies 字段定义错误）

### v0.4.1

- 更新组件 props 名字
- 按钮 Button 添加 `styling` props
- 更新组件的状态和类型代表的 className
- 修复分页 Pagination 的样式

### v0.4.0

- 新组件 ProgressBar
- 更新表格 props.rows 类型 - 给行和列添加 id 和 key
- 修复 TextArea 非受控模式的潜在问题
- 给部分组件添加加载状态显示
- 给核心工具添加单元测试
- 迁移到 Storybook 6.0.0-rc11
- 更新生产环境依赖的版本

### v0.3.26

- 修复了一些小问题

### v0.3.25

- 新组件 `Page`
- 新组件 `Breadcrumb`

### v0.3.24

- 修复组件样式问题
- 移除表格组件行拖拽功能

### v0.3.23

- 新组件 `Layout`

### v0.3.22

- 修复了一些小问题

### v0.3.21

- 修复 Popover 样式

### v0.3.20

- 修复 CountdownLabel
- 修复 Popover 位置更新

### v0.3.19

- 修复 `Popover` 样式
- 移除 `DatePicker` polyfill
- `Pagination` 分页组件新的子组件 `PageSelector`

### v0.3.18

- 修复 `Button` 的 loading 状态引发的 warning

### v0.3.17

- 为 `Button` 组件增加了“加载中”（loading） 的状态

### v0.3.16

- 再次修复 `Select` `Cascader` 初始值显示问题
- 给 UUI 组件和组件内部节点添加名字（方便调试，在 React Dev Tools 里显示）
- UUI 工具，合并 refs

### v0.3.15

- 修复 `Select` `Cascader` 初始值显示问题
- `CountdownLabel` 默认不会显示负时间

### v0.3.14

- 修复 `Toaster` 样式
- `AppDialog` 支持自定义 customize

### v0.3.13

- `Pagination` PageSize 组件新参数 labelRender

### v0.3.12

- `AppDialog` 支持返回数据
- 修复了一些小问题

### v0.3.11

- `Select` and `Cascader` 新属性 `dropdownPlacement`
- 新组件 `AppDialog`

### v0.3.10

- 修复 datepicker polyfill 在 next.js 中报错 `window is undefined` 不能使用的问题

### v0.3.9

- `SegmentControl` 新样式和新的 DOM 结构
- 修复 `DatePicker` polyfill 依赖 window 全局变量的问题

### v0.3.8

- 新组件 `DatePicker`
- 表单组件支持非受控模式

### v0.3.7

- 修复 `Select` 和 `Cascader` 点击弹出菜单框的问题

### v0.3.6

- 部分 ClassComponent-Based 组件 (`Radio`, `RadioGroup`, `SegmentControl`, `HTMLSelect`, `Select`) 改为 FunctionComponent 实现
- `Select` 支持搜索
- 重新实现 `Pagination`

### v0.3.5

- `Pagination` 自定义文本
- 更新 `Dialog` 组件参数名字 onDismiss 到 onClickAway

### v0.3.4

- `Cascader` `Select` 添加图标
- `Cascader` changeOnFinalSelect 允许限制只能选择最后一级选项
- `Cascader` enableSearch 可以搜索选项
- `Cascader` onSearch 自定义搜索方法

### v0.3.3

- 修复 `Toast` timeout 0 的问题

### v0.3.2

- 更新组件 `Cascader` 的样式，新增 placeholder 和 expandTriggerType 参数

### v0.3.1

- 新组件 `Cascader`
- 修复 UUI Component Util - customizeProps onXXX events mergedFunctions

### v0.3.0

- 更新 `Pagination` 和 `Stepper` 的按钮图标
- 更新 `Dialog` - 在 Portal 中渲染视图

### v0.2.14

- 修复 UUI Component Util ref 相关问题

### v0.2.12

- 更新所有组件的样式，统一风格

### v0.2.11

- 修复 Webpack 打包配置

### v0.2.10

- 新组件 `SegmentControl`
- 更新组件样式

### v0.2.9

- 将组件样式文件分开打包
- 修复 UUI Component Utils，避免重新创建 Nodes

### v0.2.8

- 修复 `Toast` 超时消失的问题

### v0.2.7

- lint code
- 修复 `Slider` 垂直方向的起始位置, min -> max, bottom -> top
- 重新实现 `Switch`，并去除引入 `rc-switch` 依赖

### v0.2.6

- 新组件 `CountdownLabel`
- 修复 UUI Component Util
- 修复 `Button` 根参数
- `Dialog` 新的参数 `onDismiss`
- 新组件 `Slider`

### v0.2.5

- 新组件 `Icon`

### v0.2.4

- 新组件 `Stepper`
- 更新输入框 Input 组件的样式
- 新组件 `Drawer`
- 导出 UUI Component Util

### v0.2.3

- 新组件 `Popover`
- 修复 convenience props
- UUI IntrinsicNode 支持 IntrinsicAttributes
- 修复 UUI.ClassComponent customize props 类型
- 重新命名 `HTMLSelect`
- 新组件 `Select`

### v0.2.2

- 修复 UUI Component Util 性能问题

### v0.2.1

- `TextField` 支持 `maxLength` 参数
- `TextField` 支持切换明文/密文显示密码文本
- 新组件 `TextArea`
- `NumberField` 新的 Nodes 结构

### v0.2.0

- 新增 UUI Component Util 工具用来创建组件
- **\[BREAKING CHANGE\]** 所有组件新增 `customize` 参数（去除像 `extendClassName` 或者 `extendStyle` 这样的旧参数）
- **\[BREAKING CHANGE\]** 所有组件 Node 的 className 格式被改为 `UUI-XXX-YYY`
- 所有组件支持便利样式参数 `className` 和 `style`，这两个参数会被插入到根 Node 的 customizeProps 里
- Storybook 添加文档模式
- `MoneyLabel` 使用 `value` 参数来代替原来的 `children` 参数

### v0.1.6

- 修复 tailwindcss purgecss 生产编译
- tailwindcss 使用 `_` 作为分隔符

### v0.1.5

- 导出 `Label`、 `Pagination`、 `Select` 和 `Toast` 组件

### v0.1.4

- 更新 `TextField` 和 `NumberField` 组件的值类型

### v0.1.3

- `Checkbox` onChange 会调函数新增第二个参数 `event: React.ChangeEvent<HTMLInputElement>`
- 新组件 `Toast`
