import { UUIProviderContextValue } from "../../UUIProvider"
import { mergeCustomize } from "./mergeCustomize";

export function mergeProviderCustomize(options: any, props: any, providerContext: UUIProviderContextValue<any> | null) {
  if (providerContext?.customize && providerContext.customize[options.name]) {
    const propsCustomize = props.customize
    const providerCustomize = providerContext.customize[options.name]
    props.customize = mergeCustomize(providerCustomize, propsCustomize)
  }
}
