# 单元测试

[English](https://github.com/HackPlan/UUI/blob/master/docs/TESTING.md) | 简体中文


UUI 单元测试分为两个部分，核心工具和组件。

目前 UUI 处于早期开发阶段，所以我们不追求组件的 100% 测试覆盖，只对部分组件的部分工作做一些测试。

UUI 组件都是通过这些工具函数实现功能的，所以每当这些核心的工具函数出了一些 bug 或者 performance issue，几乎会影响到所有的组件。给这些工具函数写单元测试是非常有必要的。

我们要求给这部分代码做 100% 测试覆盖。如果对 `core` 文件夹内部的文件做了改动，请跑一下 `yarn test --coverage` 保证测试通过并且百分百覆盖。