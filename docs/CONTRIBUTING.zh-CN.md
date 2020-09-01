# 贡献指南

[English](https://github.com/HackPlan/UUI/blob/master/docs/CONTRIBUTING.md) | 简体中文

感谢你的贡献！ 🎉 🎊 🥳

## 开发文档

绝大部分文档都放在 [`docs`](https://github.com/HackPlan/UUI/tree/master/docs) 目录里。在开始修改、新增 UUI 代码之前，请花一些时间阅读这些文档，文档里不仅说明了如果使用 UUI，同时也解释描述了 UUI 的设计思路和实现原理。

## Bugs

UUI 团队主要使用 Github 做软件开发管理，使用 Github Issue 用来追踪管理 Bugs 和功能需求。

如果你发现了 UUI 的 Bug，或者希望能有新的功能，请新开一个 Github Issue，并且详细描述一下相关细节。

## Pull Requests

如果你能提交 Pull Requests 那就比仅仅提出 Issue 更好了。我们非常高兴能接受一些合适的l来自社区的 Pull Request。通常情况下，如果你准备提交一个 Pull Request，在我们接受这些 PR 之前，你需要做以下这些步骤：

1. 开一个 Github Issue 并且详细描述你希望解决的问题或者你希望新增的功能需求。并且和 UUI 团队或者社区贡献者充分讨论，再进行开发。我们无法仅仅是为了不让你的开发时间白白浪费而随意的接受一些 PR，一切的改动和新增功能都应该契合 UUI 的设计思路。所以请在花时间修bug或者开发新功能之前务必在 Issue 里有所讨论。
2. Fork UUI 仓库，在本地 clone 自己的仓库。
3. 在本地仓库新开一个分支，分支名称一般为 `feature/xxxxx` 或者是 `fix/xxxxxx` 或者是 `docs/xxxxxxx`（这不是强制规定）
4. Code!
5. 开发完成之后，在开 PR 之前，通过 git rebase 工具整理 commit 历史。（我们不要求将所有commits合并为单个commit，但是我们也不接受大量无意义的单个小改动 commit）
6. （如果是修改了 `src/core` 目录里的代码，还需要保证单元测试通过）
7. 提交你的 PR，确保这个 PR 和之前创建的 Issue 关联在一起。
