export interface Currency {
  focus: number
  recovery: number
}

export interface Player {
  name: string
  startOfDayCoin: Currency
  currentDayGain: Currency
  currentDayLoss: Currency
}

export interface Action {
  id: string
  label: string
  price: Currency
  isHighPriority?: boolean
}

export interface CurrentDay {
  adventurer: Player
  boons: Action[]
  encounters: Action[]
  adventures: Action[]
}
