import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { PageAnnotatedSection } from './PageAnnotatedSection';
import { PageSection } from './PageSection';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface PageFeatureProps {
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

export const PagePropTypes = createComponentPropTypes<PageFeatureProps>({
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.node,
  primaryActions: PropTypes.arrayOf(PropTypes.node),
  secondaryActions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
})

export const _Page = UUIFunctionComponent({
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
  propTypes: PagePropTypes,
}, (props: PageFeatureProps, { nodes }) => {
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

export type PageProps = UUIFunctionComponentProps<typeof _Page>

const Page = createGroupedComponent(_Page, {
  Section: PageSection,
  AnnotatedSection: PageAnnotatedSection,
})

export { Page }
