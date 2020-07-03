import React from 'react';
import { Layout } from '../src';

export default {
  title: 'Layout',
};

export const Layout1 = () => {
  return (
    <div className="w-full bg-gray-300" style={{ height: 600 }}>
      <Layout>
        <Layout.TopBar className="bg-red-500">TopBar</Layout.TopBar>
        <Layout.Content className="bg-green-500">Content</Layout.Content>
        <Layout.BottomBar className="bg-blue-500">BottomBar</Layout.BottomBar>
      </Layout>
    </div>
  )
}

Layout1.story = {
  name: 'Layout with Vertical Header Footer',
};


export const Layout2 = () => {
  return (
    <div className="w-full" style={{ height: 600 }}>
      <Layout>
        <Layout.Sider className="bg-red-500">Sider</Layout.Sider>
        <Layout.Content className="bg-green-500">Content</Layout.Content>
      </Layout>
    </div>
  )
}

Layout2.story = {
  name: 'Layout with Horizontal Sider',
};

export const Layout3 = () => {
  return (
    <div className="w-full" style={{ height: 600 }}>
      <Layout>
        <Layout.Sider className="bg-blue-600">Sider</Layout.Sider>
        <Layout.Content className="bg-blue-300">
          <Layout>
            <Layout.TopBar className="bg-red-500">TopBar</Layout.TopBar>
            <Layout.Content className="bg-green-400">Content</Layout.Content>
            <Layout.BottomBar className="bg-yellow-500">BottomBar</Layout.BottomBar>
          </Layout>
        </Layout.Content>
        <div></div>
      </Layout>
    </div>
  )
}

Layout3.story = {
  name: 'Layout with Mixed',
};
