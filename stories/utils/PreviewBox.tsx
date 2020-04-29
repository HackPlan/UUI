import React from 'react';

export interface PreviewBoxProps {
  title?: string
  description?: string | React.ReactNode
  children: React.ReactNode
}

export function PreviewBox(props: PreviewBoxProps) {
  return (
    <div className="m-4 mb-20">
      <div className="mb-4 p-3 bg-yellow-400">
        {props.title && (<div className="text-3xl text-red-700">{props.title}</div>)}
        {props.description && (<div className="text-lg font-serif text-gray-900">{props.description}</div>)}
      </div>
      {props.children}
    </div>
  )
}