import React from 'react';
import { Icon } from '../src';
import { withKnobs } from "@storybook/addon-knobs";

const cookiesPng = require('./assets/cookies.png');
import cookiesUrl, { ReactComponent as cookies } from './assets/cookies.svg';
const puddingPng = require('./assets/pudding.png');
import puddingUrl, { ReactComponent as pudding } from './assets/pudding.svg';
const strawberryPng = require('./assets/strawberry.png');
import strawberryUrl, { ReactComponent as strawberry } from './assets/strawberry.svg';
const donutsPng = require('./assets/donuts.png');
import donutsUrl, { ReactComponent as donuts } from './assets/donuts.svg';
const hotdogPng = require('./assets/hotdog.png');
import hotdogUrl, { ReactComponent as hotdog } from './assets/hotdog.svg';
const sushiPng = require('./assets/sushi.png');
import sushiUrl, { ReactComponent as sushi } from './assets/sushi.svg';

import { ReactComponent as email } from './assets/email.svg';


export default {
  title: 'Icon',
  decorators: [withKnobs]
};

export const IconSource = () => {
  return (
    <div>
      <div className="u-flex u-flex-row u-items-center">
        <div className="u-inline-block u-w-24">Image Url</div>
        <Icon className="u-m-2" mode='image' source={cookiesPng}></Icon>
        <Icon className="u-m-2" mode='image' source={puddingPng}></Icon>
        <Icon className="u-m-2" mode='image' source={strawberryPng}></Icon>
        <Icon className="u-m-2" mode='image' source={donutsPng}></Icon>
        <Icon className="u-m-2" mode='image' source={hotdogPng}></Icon>
        <Icon className="u-m-2" mode='image' source={sushiPng}></Icon>
      </div>
      <div className="u-flex u-flex-row u-items-center">
        <div className="u-inline-block u-w-24">SVG Url</div>
        <Icon className="u-m-2" mode='svg' source={cookiesUrl}></Icon>
        <Icon className="u-m-2" mode='svg' source={puddingUrl}></Icon>
        <Icon className="u-m-2" mode='svg' source={strawberryUrl}></Icon>
        <Icon className="u-m-2" mode='svg' source={donutsUrl}></Icon>
        <Icon className="u-m-2" mode='svg' source={hotdogUrl}></Icon>
        <Icon className="u-m-2" mode='svg' source={sushiUrl}></Icon>
      </div>
      <div className="u-flex u-flex-row u-items-center">
      <div className="u-inline-block u-w-24">Inline SVG</div>
        <Icon className="u-m-2" mode='svg' source={cookies}></Icon>
        <Icon className="u-m-2" mode='svg' source={pudding}></Icon>
        <Icon className="u-m-2" mode='svg' source={strawberry}></Icon>
        <Icon className="u-m-2" mode='svg' source={donuts}></Icon>
        <Icon className="u-m-2" mode='svg' source={hotdog}></Icon>
        <Icon className="u-m-2" mode='svg' source={sushi}></Icon>
      </div>
    </div>
  )
}

IconSource.story = {
  name: 'Icon',
};

export const IconSvgProps = () => {
  return (
    <div>
      <Icon className="u-m-2" mode='svg' source={email}></Icon>
      <Icon className="u-m-2" mode='svg' source={email} svgrProps={{ fill: 'red' }}></Icon>
    </div>
  )
}

IconSvgProps.story = {
  name: 'Icon with svgProps',
};

export const IconSize = () => {
  return (
    <div className="u-flex u-flex-row u-items-end">
      <div className="u-mx-4 u-flex u-flex-col u-items-center">
        <Icon mode='svg' source={cookies}></Icon>
        <div>24px</div>
      </div>
      <div className="u-mx-4 u-flex u-flex-col u-items-center">
        <Icon mode='svg' source={cookies} width={32} height={32}></Icon>
        <div>32px</div>
      </div>
      <div className="u-mx-4 u-flex u-flex-col u-items-center">
        <Icon mode='svg' source={cookies} width={40} height={40}></Icon>
        <div>40px</div>
      </div>
      <div className="u-mx-4 u-flex u-flex-col u-items-center">
        <Icon mode='svg' source={cookies} width={48} height={48}></Icon>
        <div>48px</div>
      </div>
    </div>
  )
}

IconSize.story = {
  name: 'Icon with custom size',
};
