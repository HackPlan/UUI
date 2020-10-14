import { addParameters } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

import '../stories/style/tailwind.css';
import '../src/styles/index.scss';
import '../stories/style/storybook.scss';

addDecorator(withPerformance);

addParameters({
  controls: {
    hideNoControlsWarning: true,
  },
})

addParameters({
  options: {
    /**
     * Custom Story Sorting
     * if story parameters contains a property `sortIndex`, sort by it and place on top,
     * else the resting stories will sorted by story kind by alphabetically.
     */
    storySort: (a, b) => {

      /**
       * 组件类 Story 按照英文字母表排序
       */
      if (a[1]['kind'].startsWith('组件/总览')) return false
      if (a[1]['kind'].startsWith('组件/')) {
        return a[1]['kind'].replace(/[\u4e00-\u9fa5]/g, '') > b[1]['kind'].replace(/[\u4e00-\u9fa5]/g, '')
      }

      const sortIndexA = a[2]['sortIndex']
      const sortIndexB = b[2]['sortIndex']
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
