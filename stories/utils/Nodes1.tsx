import React, { FunctionComponent } from 'react';
import { extractProps as reactExtractProps } from '@storybook/addon-docs/dist/frameworks/react/extractProps';

interface NodesProps {
  component: any
}

export const getComponentProps = (
  component: any,
) => {
  console.log(component)
  if (!component) {
    return null;
  }
  try {
    const extractProps = reactExtractProps;
    const props = extractProps(component) as any;
    return props
  } catch (err) {
    return { error: err.message };
  }
};

const NodesContainer: FunctionComponent<NodesProps> = (props) => {
  const { component } = props;
  const mainProps = getComponentProps(component);
  console.log(mainProps)
  return (
    <div>
      test
    </div>
  );
};


export { NodesContainer as Nodes };