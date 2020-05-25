# 生产部署指南

[English](https://github.com/HackPlan/UUI/blob/master/docs/DEPLOYMENT.md) | 简体中文

写给项目维护者

#### NPM 包

1. 运行 `yarn pack:uui` 命令来创建一个预览的 NPM 包文件；
2. 检查 NPM 包文件内是否有多余的文件被打包进去，如果有，应该在 `.npmignore` 文件中添加相应的文件名；
3. 运行 `yarn publish:uui` 命令，输入新的版本号，并仔细认真你输入了正确的版本号。

#### Storybook

为了触发 Storybook 生产部署，你需要在目标 commit 上创建一个新的标签，并推送到 Github 远程仓库。

标签名应该以 `sb` 作为开头，推荐的标签名格式：

```
example: sb2020051301

sb      2020  05    13    01
prefix  year  mon   day   index
```
