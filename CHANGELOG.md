# Changelog

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
