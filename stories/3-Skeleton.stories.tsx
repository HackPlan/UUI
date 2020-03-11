import React from 'react';
import { Skeleton } from '../src';

export default {
  title: 'Skeleton',
};

export const toStorybook = () => {
  return (
    <div className="">
      <Skeleton>
        <Skeleton.Title></Skeleton.Title>
        <Skeleton.Paragraph lines={2}></Skeleton.Paragraph>
        <div className="u-flex u-flex-row">
          <Skeleton.Picture extendClassName={{ 'root': 'u-mr-4' }} extendStyle={{ 'root': { width: 200, height: 150 } }}></Skeleton.Picture>
          <Skeleton.Picture extendClassName={{ 'root': 'u-mr-4' }} extendStyle={{ 'root': { width: 200, height: 150 } }}></Skeleton.Picture>
          <Skeleton.Picture extendClassName={{ 'root': 'u-mr-4' }} extendStyle={{ 'root': { width: 200, height: 150 } }}></Skeleton.Picture>
        </div>
        <Skeleton.Paragraph lines={4}></Skeleton.Paragraph>
      </Skeleton>
    </div>
  )
}

toStorybook.story = {
  name: 'Skeleton',
};
