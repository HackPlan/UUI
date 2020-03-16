import React from 'react';

export interface PreviewBoxProps {
  title?: string
  description?: string | React.ReactNode
  children: React.ReactNode
}

export function PreviewBox(props: PreviewBoxProps) {
  return (
    <div className="u-m-4 u-mb-20">
      {props.title && (<div className="u-text-3xl">{props.title}</div>)}
      {props.description && (<div className="u-text-lg u-text-gray-500 u-mb-6">{props.description}</div>)}
      {props.children}
    </div>
  )
}