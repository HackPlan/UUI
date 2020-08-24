import React from 'react';
import { Button, Breadcrumb, Cascader } from "../src";
import { Icons } from "../src/icons/Icons";

export const Overview = () => {
  return (
    <div>
      <div className="m-4">
        <Button
          className="mr-2"
          styling={{ type: 'default' }}
          onClick={() => { console.log('clicked!'); window.alert('Button clicked!'); }}
        >
          Default
        </Button>
        <Button
          className="mr-2"
          styling={{ type: 'primary' }}
          onClick={() => { console.log('clicked!'); window.alert('Button clicked!'); }}
        >
          Primary
        </Button>
        <Button
          className="mr-2"
          styling={{ type: 'text' }}
          onClick={() => { console.log('clicked!'); window.alert('Button clicked!'); }}
        >
          Text
        </Button>
      </div>
      <div className="m-4">
        <Breadcrumb
          items={[
            { key: 'home', path: '/', label: <div className="flex flex-row items-center"><Icons.Home /><div className="ml-1">Home</div></div> },
            { key: 'form', label: 'Form', onAction: () => {} },
            { key: 'login', label: 'Login', active: true },
          ]}
        />
      </div>
      <div>
      </div>
    </div>
  )
}

Overview.storyName = 'Overview'