import React from 'react';
import { addParameters } from '@storybook/react';
import { components as htmlComponents } from '@storybook/components/html';
import '../stories/style/storybook.scss';

addParameters({
  options: {
    /**
     * Custom Story Sorting
     * if story parameters contains a property `sortIndex`, sort by it and place on top,
     * else the resting stories will sorted by story kind by alphabetically.
     */
    storySort: (a, b) => {
      const sortIndexA = a[1].parameters['sortIndex']
      const sortIndexB = b[1].parameters['sortIndex']
      if (sortIndexA && !sortIndexB) {
        return false
      } else if (!sortIndexA && sortIndexB) {
        return true
      } else if (sortIndexA && sortIndexB) {
        return sortIndexA > sortIndexB
      } else {
        return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
      }
    },
  },
});

// -----------
/**
 * 重置 mdx markdown render 默认样式，并使用 github-markdown-css
 */
// 在 root 上加 class `markdown-body`
(() => {
  const root = document.getElementById('docs-root')
  if (!root.classList.contains('markdown-body')) {
    root.classList.add('markdown-body')
  }
})()
// 重置mdx provider components
const resetComponents = {};
Object.keys(htmlComponents).forEach((key) => {
  resetComponents[key] = (props) => React.createElement(key, props);
});
addParameters({
  docs: {
    components: {
      ...resetComponents,
    }
  }
})
// ------------