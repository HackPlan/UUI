import { addParameters } from '@storybook/react';
import '../stories/style/tailwind.css';
import '../src/styles/index.scss';
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
