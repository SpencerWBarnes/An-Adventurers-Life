import React from 'react'
import { Action } from '../types'

type Props = {
  action: Action
  onChange: (next: Action) => void
}

export default function ItemCell({ action, onChange }: Props) {
  const changeFocus = (delta: number) => {
    onChange({ ...action, price: { ...action.price, focus: action.price.focus + delta } })
  }

  return (
    <div className="item-cell">
      <div className="controls">
        <button aria-label={`decrease-${action.id}`} onClick={() => changeFocus(-1)}>-</button>
        <input
          aria-label={`value-${action.id}`}
          type="number"
          value={action.price.focus}
          onChange={(e) => onChange({ ...action, price: { ...action.price, focus: Number(e.target.value) } })}
        />
        <button aria-label={`increase-${action.id}`} onClick={() => changeFocus(1)}>+</button>
      </div>
      <div className="label">{action.label}</div>
    </div>
  )
}
