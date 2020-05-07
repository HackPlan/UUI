import { IconGallery } from "../components/Icon";

export const Icons = IconGallery({
  Eye: { source: require('./assets/eye.svg').ReactComponent },
  EyeOff: { source: require('./assets/eye-off.svg').ReactComponent },
  ChevronsLeft: { source: require('./assets/chevrons-left.svg').ReactComponent },
  ChevronsRight: { source: require('./assets/chevrons-right.svg').ReactComponent },
  Loader: { source: require('./assets/loader.svg').ReactComponent },
}, { width: 16, height: 16, mode: 'svg' })