import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'countdown-target'
const defaultTarget = '2026-12-31T23:59:59'

function getStoredTarget() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved || defaultTarget
  } catch {
    return defaultTarget
  }
}

function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function CountdownTimer() {
  const [target, setTarget] = useState(() => getStoredTarget())
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, target)
  }, [target])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  const remaining = useMemo(() => {
    const targetTime = new Date(target).getTime()
    if (Number.isNaN(targetTime)) {
      return 0
    }

    return Math.max(0, targetTime - now)
  }, [target, now])

  const parts = formatRemaining(remaining)
  const targetLabel = new Date(target).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          Time Limit
        </p>

        <h1 className="mt-4 text-center text-3xl font-bold text-slate-800 sm:text-5xl">
          Remaining Time
        </h1>

        <div className="mt-8 flex justify-center">
          <label className="w-full max-w-md">
            <span className="mb-2 block text-center text-sm font-medium text-slate-600">
              目標日時を設定
            </span>
            <input
              type="datetime-local"
              value={target.slice(0, 16)}
              onChange={(event) => setTarget(`${event.target.value}:00`)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-base text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Days', value: parts.days },
            { label: 'Hours', value: parts.hours },
            { label: 'Minutes', value: parts.minutes },
            { label: 'Seconds', value: parts.seconds },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center"
            >
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                {label}
              </div>
              <div className="mt-3 text-3xl font-bold text-slate-800 sm:text-5xl">
                {pad(value)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-slate-500 sm:text-base">
          Target: <span className="font-semibold text-slate-700">{targetLabel}</span>
        </div>
      </div>
    </section>
  )
}
