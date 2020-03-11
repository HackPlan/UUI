import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming/create';

const uuiTheme = create({
  base: 'light',

  brandTitle: 'UUI Storybook',
});

addParameters({
  options: {
    theme: uuiTheme,
  },
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx$/), module);