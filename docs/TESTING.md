# Testing

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/TESTING.zh-CN.md)

UUI unit testing is divided into two parts, core tools and components.

UUI is currently in the early development stage, so we do not pursue 100% test coverage of components, but only do some tests on part of the work of some components.

UUI components are built with HOC tool, so whenever these core HOC tool have some bugs or performance issues, almost all components will be affected. It is very necessary to write unit tests for these tool functions.

We require 100% test coverage for this core part of the code. If you make changes to the files in the `core` folder, please run `yarn test --coverage` to ensure that the test passes and is 100% covered.