import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const uuiPackage = require('../package.json')

const theme = create({
  base: 'light',

  brandTitle: `UUI (v${uuiPackage.version})`,
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
  showRoots: true,
});