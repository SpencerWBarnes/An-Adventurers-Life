import React, { useState } from 'react'
import { Player } from '../types'
import { FOCUS_ICON, RECOVERY_ICON } from '../constants'

type Props = { player: Player }

function format(n: number) {
  const sign = n > 0 ? '+' : ''
  return `${sign}${n}`
}

export default function Footer({ player }: Props) {
  const [open, setOpen] = useState(false)

  const start = player.startOfDayCoin
  const gain = player.currentDayGain
  const loss = player.currentDayLoss

  const net = {
    focus: start.focus + gain.focus + loss.focus,
    recovery: start.recovery + gain.recovery + loss.recovery
  }

  return (
    <div className={`footer ${open ? 'footer-open' : ''}`}>
      <div className="footer-row">
        <div className="player-name">{player.name}</div>
        <div className="player-net">
          <span className="net-focus">Focus{FOCUS_ICON}: {format(net.focus)}</span>
          <span className="net-recovery">Recovery{RECOVERY_ICON}: {format(net.recovery)}</span>
        </div>
        <button
          className={`chev ${open ? 'open' : ''}`}
          aria-expanded={open}
          aria-label={open ? 'Collapse details' : 'Expand details'}
          onClick={() => setOpen((s) => !s)}
        >
          ▾
        </button>
      </div>

      <div className="footer-details" aria-hidden={!open}>
        <div className="detail-col">
          <div className="detail-title">Start of day</div>
          <div>Focus{FOCUS_ICON}: {format(start.focus)}</div>
          <div>Recovery{RECOVERY_ICON}: {format(start.recovery)}</div>
        </div>

        <div className="detail-col">
          <div className="detail-title">Gained</div>
          <div className="gain">Focus{FOCUS_ICON}: {format(gain.focus)}</div>
          <div className="gain">Recovery{RECOVERY_ICON}: {format(gain.recovery)}</div>
        </div>

        <div className="detail-col">
          <div className="detail-title">Lost</div>
          <div className="loss">Focus{FOCUS_ICON}: {format(loss.focus)}</div>
          <div className="loss">Recovery{RECOVERY_ICON}: {format(loss.recovery)}</div>
        </div>

        <div className="detail-col detail-net">
          <div className="detail-title">Net</div>
          <div className="net-focus big">{FOCUS_ICON}{format(net.focus)}</div>
          <div className="net-recovery big">{RECOVERY_ICON}{format(net.recovery)}</div>
        </div>
      </div>
    </div>
  )
}
