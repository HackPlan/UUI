import React from 'react';
import { UUI } from '../../core/uui';
import { PageAnnotatedSection } from './PageAnnotatedSection';
import { PageSection } from './PageSection';

export interface BasePageProps {
  title?: string;
  description?: string;
  thumbnail?: React.ReactNode;
  primaryActions?: React.ReactNode[];
  secondaryActions?: React.ReactNode[];
  /**
   * The container of Page.
   */
  children?: React.ReactNode;
}

export const _Page = UUI.FunctionComponent({
  name: 'Page',
  nodes: {
    Root: 'div',

    Header: 'div',
    Thumbnail: 'div',
    HeaderWrapper: 'div',
    InfoWrapper: 'div',
    TitleWrapper: 'div',
    Title: 'h1',
    Description: 'h3',

    PrimaryActions: 'div',
    SecondaryActions: 'div',

    Container: 'div',
  },
}, (props: BasePageProps, nodes) => {
  const {
    Root,
    Thumbnail, Header, HeaderWrapper, InfoWrapper, TitleWrapper, Title, Description,
    PrimaryActions, SecondaryActions,
    Container,
  } = nodes

  return (
    <Root>
      <Header>
        <HeaderWrapper>
          <InfoWrapper>
            {props.thumbnail && <Thumbnail>{props.thumbnail}</Thumbnail>}
            <TitleWrapper>
              {props.title && <Title>{props.title}</Title>}
              {props.description && <Description>{props.description}</Description>}
            </TitleWrapper>
          </InfoWrapper>
          {props.primaryActions && (
            <PrimaryActions>
              {props.primaryActions}
            </PrimaryActions>
          )}
        </HeaderWrapper>
        {props.secondaryActions && (
          <SecondaryActions>
            {props.secondaryActions}
          </SecondaryActions>
        )}
      </Header>

      <Container>
        {props.children}
      </Container>
    </Root>
  )
})

export type PageProps = Parameters<typeof _Page>[0]

const Page = _Page as typeof _Page & {
  Section: typeof PageSection;
  AnnotatedSection: typeof PageAnnotatedSection;
}

Page.Section = PageSection;
Page.AnnotatedSection = PageAnnotatedSection;

export { Page }