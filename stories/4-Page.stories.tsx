import React from 'react';
import { Page } from '../src';

export default {
  title: 'Page',
};

export const toStorybook = () => {
  return (
    <div className="u-bg-gray-100">
      <Page extendClassName={{ 'root': 'u-bg-green-500' }}>
        <Page.Header
          title={'Page Main Title'}
          subTitle={'page sub title abcde'}
        >
        </Page.Header>
        <Page.AnnotatedSection
          title={'Section A'}
          description={'This is annotated section A'}
          extendClassName={{ 'root': 'u-bg-orange-500' }}
        >
          <div className="u-bg-blue-400 u-h-40">content</div>
        </Page.AnnotatedSection>
        <Page.Section
          extendClassName={{ 'root': 'u-bg-red-500' }}
        >
          abcdef
        </Page.Section>
        <Page.AnnotatedSection
          title={'Section B'}
          description={'This is annotated section B'}
          extendClassName={{ 'root': 'u-bg-orange-500' }}
        >
          <div className="u-bg-blue-400 u-h-40">content</div>
        </Page.AnnotatedSection>
      </Page>
      {/* <Page extendClassName={{ 'root': '' }}>
        <Page.AnnotatedSection
          extendClassName={{ 'root': '' }}
        >
          <div className=" u-h-40">content</div>
        </Page.AnnotatedSection>
        <Page.AnnotatedSection
          extendClassName={{ 'root': '' }}
        >
          <div className=" u-h-40">content</div>
        </Page.AnnotatedSection>
      </Page> */}
    </div>
  )
}

toStorybook.story = {
  name: 'Page',
};
