import { UUIProviderContextValue } from "../../UUIProvider"
import { mergeWith } from "lodash-es";
import { mergeCustomize } from "./mergeCustomize";

export function mergeProviderCustomize(options: any, props: any, providerContext: UUIProviderContextValue<any> | null) {
  if (providerContext?.customize && providerContext.customize[options.name]) {
    const propsCustomize = props.customize
    const providerCustomize = providerContext.customize[options.name]
    props.customize = mergeWith(providerCustomize, propsCustomize, (obj, src) => mergeCustomize(obj, src))
  }
}
