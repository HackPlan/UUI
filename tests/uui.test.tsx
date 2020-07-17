import React from 'react';
import renderer from 'react-test-renderer';
import { UUI } from '../src/core/uui';

const UUITestComponentEmpty = UUI.FunctionComponent({
  name: 'UUITestComponentEmpty',
  nodes: {
    Root: 'div',
  }
}, (props: any, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

it('renders Empty UUI Component', () => {
  const tree = renderer
    .create(<UUITestComponentEmpty></UUITestComponentEmpty>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});