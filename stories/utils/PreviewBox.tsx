import React from 'react';

export interface PreviewBoxProps {
  title?: string
  description?: string | React.ReactNode
  children: React.ReactNode
}

export function PreviewBox(props: PreviewBoxProps) {
  return (
    <div className="u-m-4 u-mb-20">
      <div className="u-mb-4 u-p-3 u-bg-yellow-400">
        {props.title && (<div className="u-text-3xl u-text-red-700">{props.title}</div>)}
        {props.description && (<div className="u-text-lg u-font-serif u-text-gray-900">{props.description}</div>)}
      </div>
      {props.children}
    </div>
  )
}