# UUI

功能优先的通用 UI 组件库

![](https://img.shields.io/npm/v/@hackplan/uui)
![](https://img.shields.io/github/workflow/status/HackPlan/UUI/CI)
![](https://img.shields.io/david/HackPlan/UUI)
![](https://img.shields.io/david/dev/HackPlan/UUI)
![](https://img.shields.io/bundlephobia/minzip/@hackplan/uui)
![](https://img.shields.io/npm/dm/@hackplan/uui)
![](https://img.shields.io/github/contributors/HackPlan/UUI)
![](https://img.shields.io/github/issues-pr-raw/HackPlan/UUI)
![](https://img.shields.io/github/issues-raw/HackPlan/UUI)
![](https://img.shields.io/github/languages/top/HackPlan/UUI)
![](https://img.shields.io/github/license/HackPlan/UUI)

> **UUI 正处于频繁开发更新中**，这意味着库组件的接口之后可能会被改变。

[English](https://github.com/HackPlan/UUI) | 简体中文

## 特性

* 一组开箱即用的有用的组件。
* 基于 TypeScript 的类型安全性。
* 强大的组件样式自定义功能。

## 安装

```bash
npm install @hackplan/uui --save
```

```bash
yarn add @hackplan/uui
```

## 示例

```tsx
import '@hackplan/uui/lib/index.css';
import { Button } from '@hackplan/uui';

function App() {
  return (
    <div>
      <Button>Click me!</Button>
    </div>
  )
}
```

## 链接

* [文档](https://doc.uui.cool)
* [项目贡献指南](https://github.com/HackPlan/UUI/blob/master/CONTRIBUTING.zh-CN.md)
* [风格自定义教程](https://uui.cool/?path=/docs/customize-tutorial--demo-stepper)
* [开发笔记](https://github.com/HackPlan/UUI/blob/master/DEVNOTES.zh-CN.md)
* [更新日志](https://github.com/HackPlan/UUI/blob/master/CHANGELOG.zh-CN.md)
* [生产部署指南](https://github.com/HackPlan/UUI/blob/master/DEPLOYMENT.zh-CN.md)


## 本地开发

对于这个项目的开发，相比 npm 我们更推荐使用 Yarn。不管你使用哪个工具，这个项目的脚本命令都可以使用。同样的，我们也推荐你使用 nvm 来安装使用项目特定的 Node.js 版本进行开发。

```bash
git clone https://github.com/HackPlan/UUI.git
cd uui
nvm use
yarn
yarn storybook
```

打开浏览器并访问 http://localhost:6006 .

## 参与共建

我们欢迎所有类型的贡献开发。请先阅读 CONTRIBUTING.md 文档。

## 开源许可

UUI 在 GitHub 仓库上的所有文件均受 MIT 许可。请阅读项目根目录下的许可证文件。