# Changelog

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/CHANGELOG.zh-CN.md)

### v0.3.12

- `AppDialog` support return data
- fix issues

### v0.3.11

- Select and Cascader new props dropdownPlacement
- new component `AppDialog`

### v0.3.10

- fix datepicker polyfill issue `window is undefined` in next.js

### v0.3.9

- `SegmentControl` new style and dom structure.
- fix `DatePicker` polyfill require window global variable.

### v0.3.8

- new component `DatePicker`
- form components support uncontrolled mode

### v0.3.7

- fix `Select` and `Cascader` click to show popover menu issue

### v0.3.6

- convert some class based components (`Radio`, `RadioGroup`, `SegmentControl`, `HTMLSelect`, `Select`) to FunctionComponent
- `Select` support search
- reimplement `Pagination`

### v0.3.5

- `Pagination` custom label
- update Dialog props onDismiss to onClickAway

### v0.3.4

- `Cascader` `Select` add icons
- `Cascader` changeOnFinalSelect Allow only select final level options.
- `Cascader` enableSearch Cascader can input text to search options.
- `Cascader` onSearch custom search function

### v0.3.3

- fix Toaster 0 to disable the timeout

### v0.3.2

- update component `Cascader` with styling, placeholder and expandTriggerType

### v0.3.1

- new component `Cascader`
- fix uui component util - customizeProps onXXX events mergedFunctions

### v0.3.0

- update `Pagination`, `Stepper` button icons
- update `Dialog` - render views in portal container

### v0.2.14

- fix uui component util ref issue

### v0.2.12

- update all components style

### v0.2.11

- fix webpack dist config

### v0.2.10

- new component `SegmentControl`
- update components style

### v0.2.9

- dist pack style files separately
- fix uui component utils, avoid re-create nodes when props change

### v0.2.8

- fix `Toast` timeout dismiss

### v0.2.7

- lint code
- fix `Slider` vertical direction, min -> max, bottom -> top
- new implementation of `Switch`, remove `rc-switch` dependency

### v0.2.6

- new component `CountdownLabel`
- fix uui component util
- fix `Button` root props
- `Dialog` new props `onDismiss`
- new component `Slider`

### v0.2.5

- new component `Icon`

### v0.2.4

- new component `Stepper`
- fix input components style
- new component `Drawer`
- export uui utils

### v0.2.3

- new component `Popover`
- fix convenience props
- uui IntrinsicNode support IntrinsicAttributes
- fix UUI.ClassComponent customize props type
- rename `HTMLSelect`
- new component `Select`

### v0.2.2

- fix uui components performance issue

### v0.2.1

- `TextField` support `maxLength` prop
- `TextField` support toggle password visible
- New component `TextArea`
- `NumberField` new nodes structure

### v0.2.0

- use UUI Component Util to create components.
- **\[BREAKING CHANGE\]** new prop `customize` to customize component style. (remove old customize props such as `extendClassName`, `extendStyle` in the root props of component)
- **\[BREAKING CHANGE\]** component node class name will change to `UUI-XXX-YYY`
- component support convenience props `className` and `style`, these props will be injected into Root node of component.
- Storybook add docs page
- `MoneyLabel` use `value` prop instead of `children`

### v0.1.6

- fix tailwindcss purge in production build
- tailwindcss use `_` as separator

### v0.1.5

- export `Label`, `Pagination`, `Select` and `Toast` components

### v0.1.4

- update `TextField` and `NumberField` value type

### v0.1.3

- `Checkbox` props onChange new second parameter `event: React.ChangeEvent<HTMLInputElement>`
- new Component `Toast`
