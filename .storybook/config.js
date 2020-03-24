import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming/create';

const uuiPackage = require('../package.json')

const uuiTheme = create({
  base: 'light',

  brandTitle: `UUI (v${uuiPackage.version})`,
});

addParameters({
  options: {
    theme: uuiTheme,
  },
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx$/), module);