import React, { useState, useEffect } from 'react'
import { loadCurrentDay, saveCurrentDay } from './storage'
import { CurrentDay, Action } from './types'
import Section from './components/Section'

export default function App() {
  const [data, setData] = useState<CurrentDay | null>(null)

  useEffect(() => {
    const loaded = loadCurrentDay()
    setData(loaded)
  }, [])

  useEffect(() => {
    if (data) saveCurrentDay(data)
  }, [data])

  if (!data) return <div className="loading">Loading...</div>

  const updateList = (key: 'boons' | 'encounters' | 'adventures') => (next: Action[]) => {
    setData({ ...data, [key]: next })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>An Adventurer's Life for Me</h1>
      </header>

      <main>
        <Section
          title="Daniel Boon's Shop"
          description="Spend focus or recovery coins on fun or relaxing boons."
          actions={data.boons}
          onUpdate={updateList('boons')}
        />

        <Section
          title="Encounters"
          description="Gain coin by completing tasks and encounters."
          actions={data.encounters}
          onUpdate={updateList('encounters')}
        />

        <Section
          title="Adventures"
          description="Gain coin by working towards bigger commitments and quests. Each 45 minute span spent on an adventure counts as one completed action."
          actions={data.adventures}
          onUpdate={updateList('adventures')}
        />
      </main>
    </div>
  )
}
