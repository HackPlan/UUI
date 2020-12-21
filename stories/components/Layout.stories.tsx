import React from 'react';
import { Layout } from '../../src';
import { range } from 'lodash-es';

export const Layout1 = () => {
  return (
    <div className="w-full bg-gray-300" style={{ height: 600 }}>
      <Layout>
        <Layout.Header className="bg-red-500">Header</Layout.Header>
        <Layout.Main className="bg-green-500">Main</Layout.Main>
        <Layout.Footer className="bg-blue-500">Footer</Layout.Footer>
      </Layout>
    </div>
  )
}

Layout1.storyName = 'Layout with Vertical Header Footer'

export const Layout2 = () => {
  return (
    <div className="w-full" style={{ height: 600 }}>
      <Layout>
        <Layout.Nav className="bg-red-500">
          {range(1, 100).map((i) => {
            return <div>nav item {i}</div>
          })}
        </Layout.Nav>
        <Layout.Main className="bg-green-500">
          {range(1, 100).map((i) => {
            return <div>content item {i}</div>
          })}
        </Layout.Main>
      </Layout>
    </div>
  )
}

Layout2.storyName = 'Layout with Horizontal Nav'

export const Layout3 = () => {
  return (
    <div className="w-full" style={{ height: 600 }}>
      <Layout>
        <Layout.Nav className="bg-blue-600">Nav</Layout.Nav>
        <Layout.Main className="bg-blue-300">
          <Layout>
            <Layout.Header className="bg-red-500">Header</Layout.Header>
            <Layout.Main className="bg-green-400">Main</Layout.Main>
            <Layout.Footer className="bg-yellow-500">Footer</Layout.Footer>
          </Layout>
        </Layout.Main>
        <div></div>
      </Layout>
    </div>
  )
}

Layout3.storyName = 'Layout with Mixed'
