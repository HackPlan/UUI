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
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://doc.uui.cool/)

![components overview screenshot](https://github.com/HackPlan/UUI/blob/master/assets/screenshots/overview.png)

> **UUI 正处于频繁开发更新中**，接口和用法在将来可能会改变，目前暂时无法保证向后兼容。

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
* [更新日志](https://github.com/HackPlan/UUI/blob/master/docs/CHANGELOG.zh-CN.md)
* [项目贡献指南](https://github.com/HackPlan/UUI/blob/master/docs/CONTRIBUTING.zh-CN.md)
* [样式自定义示例](https://doc.uui.cool/?path=/docs/customize-tutorial--demo-stepper)
* [生产部署指南](https://github.com/HackPlan/UUI/blob/master/docs/DEPLOYMENT.zh-CN.md)


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

## 使用 UUI 构建的产品

| <img height="110" src="https://tuya.xinxiao.tech/assets/tuya-avator.png?rv=4" /> | <img height="80" src="https://duoshao.app/assets/logo.svg" /> | <img height="80" src="https://daylight.cool/images/6b7a7d4a-db86-46d3-80b9-fe66dcc59915.png" /> |
| :----------------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ |
|              [图压](https://tuya.xinxiao.tech/)              |               [多少记账](https://duoshao.app/)               | [昼间日历](https://daylight.cool/)                           |

## 开源许可

UUI 在 GitHub 仓库上的所有文件均受 MIT 许可。请阅读项目根目录下的许可证文件。