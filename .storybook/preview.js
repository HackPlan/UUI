import { addParameters } from '@storybook/react';

import '../stories/style/tailwind.css';
import '../stories/style/uui.scss';
import '../stories/style/storybook.scss';

addParameters({
  controls: {
    hideNoControlsWarning: true,
  },
})

addParameters({
  options: {
    storySort: (a, b) => {
      const kindIndex = [
        "文档",
        "组件",
        "演示",
        "开发",
      ]

      const docsIndex = [
        "文档/主页 Welcome",
        "文档/介绍 Introduction",
        "文档/快速上手 Getting Started",
        "文档/使用自定义功能 Using Customize",
        "文档/更新日志 Changelog",
      ]

      const devIndex = [
        "开发/实现原理 Principle",
        "开发/开发注意事项 Dev Tips",
        "开发/生产部署指南 Deployment",
        "开发/贡献指南 Contributing",
      ]

      const sortByAlphabet = (x, y) => {
        /**
         * 组件类 Story 按照英文字母表排序
         */
        if (x.startsWith('总览')) return false
        if (y.startsWith('总览')) return true
        return x.replace(/[\u4e00-\u9fa5]/g, '') > y.replace(/[\u4e00-\u9fa5]/g, '')
      }

      const sortByIndexArray = (x, y, indexArr) => {
        return indexArr.findIndex((i) => i === x) > indexArr.findIndex((i) => i === y)
      }

      const apath = a[1]['kind']
      const bpath = b[1]['kind']
      const [akind, atitle] = apath.split('/')
      const [bkind, btitle] = bpath.split('/')

      if (akind === bkind) {
        if (akind == "文档") {
          return sortByIndexArray(apath, bpath, docsIndex)
        } else if (akind === "组件") {
          return sortByAlphabet(atitle, btitle)
        } else if (akind === "开发") {
          return sortByIndexArray(apath, bpath, devIndex)
        }
      } else {
        return sortByIndexArray(akind, bkind, kindIndex)
      }
    },
  },
});
