import React from 'react'
import { Action } from '../types'
import ItemCell from './ItemCell'
import Tooltip from './Tooltip'

type Props = {
  title: string
  description: string
  actions: Action[]
  onUpdate: (actions: Action[]) => void
}

export default function Section({ title, description, actions, onUpdate }: Props) {
  const updateAction = (next: Action) => {
    const nextList = actions.map((a) => (a.id === next.id ? next : a))
    onUpdate(nextList)
  }

  return (
    <section className="section">
      <header className="section-header">
        <h2>{title}</h2>
        <Tooltip content={description}>
          <button className="info" aria-label={`${title} info`}>i</button>
        </Tooltip>
      </header>

      <div className="grid">
        {actions.map((a) => (
          <ItemCell key={a.id} action={a} onChange={updateAction} />
        ))}
      </div>
    </section>
  )
}
