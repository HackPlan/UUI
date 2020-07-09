import { IconGallery } from "../components/Icon";

export const Icons = IconGallery({
  Eye: { source: require('./assets/eye.svg').ReactComponent },
  EyeOff: { source: require('./assets/eye-off.svg').ReactComponent },
  Loader: { source: require('./assets/loader.svg').ReactComponent },
  ChevronLeft: { source: require('./assets/chevron-left.svg').ReactComponent },
  ChevronRight: { source: require('./assets/chevron-right.svg').ReactComponent },
  ChevronUp: { source: require('./assets/chevron-up.svg').ReactComponent },
  ChevronDown: { source: require('./assets/chevron-down.svg').ReactComponent },
  Spinner: { source: require('./assets/spinner.svg').ReactComponent },
  Home: { source: require('./assets/home.svg').ReactComponent },

}, { width: 16, height: 16, mode: 'svg' })