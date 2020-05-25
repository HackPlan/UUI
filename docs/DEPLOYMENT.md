# DEPLOYMENT

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/DEPLOYMENT.zh-CN.md)

(for maintainer)

#### NPM Package

1. run `yarn pack:uui` command to generate a preview package file.
2. Check whether there are extra files that should not exist in the output package, if there are, they should be added to the `.npmignore` file.
3. run `yarn publish:uui` command, Make sure you enter the correct version number.

#### Storybook

Push new tag to Github remote repo to trigger the deployment.

Tag name should start with `sb`, recommended tag name format:

```
example: sb2020051301

sb      2020  05    13    01
prefix  year  mon   day   index
```
