# CONTRIBUTING

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/CONTRIBUTING.zh-CN.md)

Thanks for your contribution! 🎉 🎊 🥳

## Getting started

### Installation

First, make sure your current Node.js environment is v10.x+, run `nvm use` to install project specific version is better.

As an external contributor, you will have to fork UUI in order to contribute code. Clone your fork onto your machine and then run the following commands to install dependencies. For the development of this project, Yarn is preferred over npm. However, any Yarn command can be replaced by the npm equivalent.


```bash
git clone https://github.com/<username>/UUI.git
cd uui
yarn
yarn storybook
```

Open your browser and visit http://localhost:6006 .


### Contributing topic

Looking for places to contribute to the codebase? Check out the [issue list](https://github.com/HackPlan/UUI/issues).

## Developing

A typical contributor workflow looks like this:

1. Create a new contribute branch. We use a format like `feature/[short-name]` for new feature and `fix/[short-name]` for bug fix.
2. Run `yarn storybook` in the root project directory to start storybook dev app at `http://localhost:6006`.
3. Write some code, do some changes. Refer to the docs in the repo for detailed instructions on:
    * [UUI Principle](https://github.com/HackPlan/UUI/blob/master/docs/PRINCIPLE.md)
    * [Development Practices](https://github.com/HackPlan/UUI/blob/master/docs/DEVELOPMENT.md)
4. Ensure your code is **tested** and **linted**.
    * Linting is best handled by your editor for real-time feedback. Run yarn lint to be 100% safe.
    * Some TypeScript lint errors can often be automatically fixed by ESLint. Run lint fixes with `yarn lint --fix`.
5. Submit a Pull Request on Github and fill out the description template.
    * Rebase your branch to latest master branch.
6. Team maintainers and community members will review your code and merge it after approvals.
7. Hooray, you contributed! ✨