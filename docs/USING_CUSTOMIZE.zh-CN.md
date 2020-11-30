# 使用自定义功能 Using Customize

~~English~~ | 简体中文

在实际的项目开发中，我们会创建出各种各样大大小小的组件（Component），这些组件使用范围各自不同，有的是全局范围内通用的组件，有些是特别定制风格的用于某个别页面的组件。

UUI 从设计和实现上，分别在三个层面上提供了一些样式定制方案，用来定制 UUI 的组件。

## 全局定制

UUI 提供的组件内部，每一个节点都有它的名字，每个节点对应的标签都有相应名字的 className，所以理论上你可以根据这些 classNames 来完全自定义组件的样式。

1. **完全自己实现 UUI 组件样式**

UUI 预置了一套简约风格的样式文件，如果你希望完全自己实现组件样式，可以选择不导入 UUI 提供的样式文件。

<iframe src="https://codesandbox.io/embed/uui-self-implement-g5f5c?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="uui-self-implement"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

2. **对 UUI 预置的样式做一些修改**

导入 UUI 内置样式文件的同时，自己写一些样式覆盖默认样式。

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
