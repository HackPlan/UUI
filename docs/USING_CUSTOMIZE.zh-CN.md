# 使用自定义功能 Using Customize

~~English~~ | 简体中文

对于常规的 UI 库组件，一般来说针对组件的一些风格定制，（比如改变 Sass、Less 预设变量），都属于全局定制。但是对于提供了强大自定义功能的 UUI，样式定制范围是一个值得关注的点。简单举例来说，同样是「按钮 Button」组件，我们可能有需求：1.在全局范围内定制出一个风格统一的按钮样式；2.在部分特殊的页面使用特殊风格的按钮；3.对于单个按钮组件可能有不同的内外边距和文字样式。

UUI 设计和实现了一系列的工具来帮助开发者方便快捷地对 UUI 组件进行不同范围的样式定制。

## 全局定制

现代的前端组件，几乎都是由很多的 HTML5 标签（\<div\>、\<span\>、\<a\>......）共同组成的。由 UUI 提供的组件，内部组成的标签都有各自的名字，并且有相应的 className，比如按钮组件的 UUI-Button-Root 和 UUI-Button-Content。

有了这些 classNames，理论上你可以通过写 CSS 样式来覆盖 UUI 提供的默认样式，将 UUI 组件定制为任何样子。

1. **完全自己实现样式**

UUI 的组件功能和样式是完全独立的（除了部分组件需要通过修改内联样式来实现功能外），可以选择不导入 UUI 提供的默认样式，完全自己实现整套组件样式。

<iframe src="https://codesandbox.io/embed/uui-self-implement-g5f5c?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="uui-self-implement"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

2. **在默认样式的基础上全局定制**

导入 UUI 默认样式的同时，另写一些样式覆盖默认样式。

<iframe src="https://codesandbox.io/embed/uui-global-css-customize-wevsh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="uui-global-css-customize"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

3. **使用 UUIProvider 的 customize 来定义自定义样式**

传入 React 的内联样式 React.CSSProperties 来定制组件样式。

在项目中使用 UUIProvider 组件，定义 globalCustomize 样式数据，并且传入 UUIProvider.customize。

<iframe src="https://codesandbox.io/embed/uui-global-css-customize-forked-5gzyn?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="uui-global-css-customize (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



## 局部定制

<iframe src="https://codesandbox.io/embed/uui-partial-customize-rb9r6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="uui-partial-customize"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


## 个体定制

UUI 的组件都提供了一个名叫 customize 的 props，通过传入一些 React.CSSProperties 来定制组件的样式。结合 Tailwind 可以非常方便的定制单个组件的样式。

<iframe src="https://codesandbox.io/embed/uui-individual-customize-0iwci?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="uui-individual-customize"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
