interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const ReactComponent: SvgrComponent;
  const url: string
  export default url;
  export { ReactComponent };
}