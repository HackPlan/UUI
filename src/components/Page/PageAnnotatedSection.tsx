import React from 'react';
import { UUI } from '../../core/uui';

export interface BasePageAnnotatedSectionProps {
  title: string;
  description?: string;
  /**
   * The content of tag.
   */
  children?: React.ReactNode;
}

export const PageAnnotatedSection = UUI.FunctionComponent({
  name: 'PageAnnotatedSection',
  nodes: {
    Root: 'div',
    InfoWrapper: 'div',
    Title: 'h2',
    Description: 'p',
    Container: 'div',
  },
}, (props: BasePageAnnotatedSectionProps, nodes) => {
  const { Root, InfoWrapper, Title, Description, Container } = nodes
  return (
    <Root>
      <InfoWrapper>
        <Title>{props.title}</Title>
        {props.description && <Description>{props.description}</Description>}
      </InfoWrapper>
      <Container>
        {props.children}
      </Container>
    </Root>
  )
})

export type PageAnnotatedSectionProps = Parameters<typeof PageAnnotatedSection>[0]