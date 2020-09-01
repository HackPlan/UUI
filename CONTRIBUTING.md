# CONTRIBUTING

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/CONTRIBUTING.zh-CN.md)

Thanks for your contribution! 🎉 🎊 🥳

### Contributing topic

Looking for places to contribute to the codebase? Check out the [issue list](https://github.com/HackPlan/UUI/issues).

## Development Document

Most of the documents are placed in the [`docs`](https://github.com/HackPlan/UUI/tree/master/docs) directory. Before you start to modify or add more code, please take some time to read these documents. The documents not only explain how to use UUI, but also describe the design ideas and implementation principles of UUI.

## Bugs

The UUI team mainly uses Github for software development and management, and uses Github Issues to track and manage bugs and features.

If you find a bug of UUI, or want to have new features, please open a new Github Issue and describe the relevant details in detail.

## Pull request

If you can submit a Pull Request, it is better than just submitting an Issue. We are very happy to accept some suitable Pull Requests from the community. Normally, if you are going to submit a Pull Request, before we accept these PRs, you need to do the following steps:

1. Open a Github issue and describe in detail the problem you want to solve or the new features you want to add. And fully discuss with UUI team or community contributors before proceeding with development. We can't just accept some PRs just to prevent your development time from wasting, all changes and new features should fit the UUI design ideas. So please be sure to discuss it in the Issue before taking the time to fix bugs or develop new features.
2. Fork UUI repository, clone your own repo locally.
3. Open a new branch in the local repo, the branch name is generally `feature / xxxxx` or `fix / xxxxxx` or `docs / xxxxxxx` (this is not mandatory)
4. Code!
5. After the development is completed, before submitting the PR, use the git rebase tool to organize the commit history. (We do not require that all commits be merged into a single commit, but we do not accept a large number of meaningless single small changes commits)
6. (If you modify the code in the `src/core` directory, you also need to ensure that the unit test passes)
7. Submit your PR and make sure that this PR is associated with the Issue created earlier.
