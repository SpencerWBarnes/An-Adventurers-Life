import React, { useState, useId } from 'react'

type Props = {
  content: string
  children: React.ReactNode
}

export default function Tooltip({ content, children }: Props) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/** Ensure children can receive focus for keyboard users */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, {
            onFocus: () => setVisible(true),
            onBlur: () => setVisible(false),
            'aria-describedby': id
          })
        : children}

      <div
        id={id}
        role="tooltip"
        className={`tooltip-box ${visible ? 'tooltip-visible' : ''}`}
        aria-hidden={!visible}
      >
        {content}
        <div className="tooltip-arrow" aria-hidden="true" />
      </div>
    </div>
  )
}
