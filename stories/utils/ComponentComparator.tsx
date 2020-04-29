import React from 'react';

export function ComponentComparator(props: {
  before: React.ReactNode
  after: React.ReactNode
}) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center m-8">
        <div>{props.before}</div>
        <div className="font-bold mt-4">BEFORE</div>
      </div>
      <div className="flex flex-col items-center m-8">
        <div>{props.after}</div>
        <div className="font-bold mt-4">AFTER</div>
      </div>
    </div>
  )
}