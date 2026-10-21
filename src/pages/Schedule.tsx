import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { users, scheduleEvents, CURRENT_USER_ID } from '../data/mockData'
import type { Department } from '../types'

const departments: Department[] = [
  '総務部',
  '工事部',
  '環境調査部',
  '管理部',
  '役員',
  '未所属',
]

export function Schedule() {
  const [visible, setVisible] = useState<Set<string>>(new Set([CURRENT_USER_ID]))
  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const toggle = (id: string) => {
    setVisible((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const todayIso = new Date().toISOString().slice(0, 10)

  const days = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const cells: (number | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= lastDate; d++) cells.push(d)
    return cells
  }, [cursor])

  const eventsFor = (day: number) => {
    const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`
    return scheduleEvents.filter((e) => e.date === iso && visible.has(e.userId))
  }

  const todaysEvents = scheduleEvents.filter((e) => e.date === todayIso && visible.has(e.userId))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">スケジュール</h1>
        <button className="flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-dark)]">
          <Plus size={16} />
          予定を追加
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold text-gray-500">メンバー</p>
            {departments.map((dept) => {
              const members = users.filter((u) => u.department === dept)
              if (members.length === 0) return null
              return (
                <div key={dept} className="mb-3">
                  <p className="mb-1 text-xs font-semibold text-gray-700">{dept}</p>
                  {members.map((u) => (
                    <label
                      key={u.id}
                      className="flex items-center gap-2 py-0.5 pl-2 text-xs text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={visible.has(u.id)}
                        onChange={() => toggle(u.id)}
                        className="accent-[var(--color-brand)]"
                      />
                      {u.name}
                      {u.isMe && <span className="text-[10px] text-gray-400">自分</span>}
                    </label>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold text-gray-500">本日の予定</p>
            {todaysEvents.length === 0 ? (
              <p className="text-xs text-gray-400">本日の予定はありません</p>
            ) : (
              todaysEvents.map((e) => (
                <p key={e.id} className="text-xs text-gray-700">
                  {e.title}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="rounded-lg p-1.5 hover:bg-gray-100"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-base font-bold text-gray-900">
              {cursor.getFullYear()}年{cursor.getMonth() + 1}月
            </span>
            <button
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="rounded-lg p-1.5 hover:bg-gray-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500">
            {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => {
              const iso =
                day &&
                `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(
                  day,
                ).padStart(2, '0')}`
              const isToday = iso === todayIso
              return (
                <div
                  key={idx}
                  className={`min-h-20 rounded-lg border p-1.5 text-xs ${
                    isToday ? 'border-[var(--color-brand)]' : 'border-gray-100'
                  }`}
                >
                  {day && <div className="mb-1 font-semibold text-gray-700">{day}</div>}
                  {day &&
                    eventsFor(day).map((e) => (
                      <div
                        key={e.id}
                        className="mb-0.5 truncate rounded bg-[var(--color-brand-light)] px-1 py-0.5 text-[10px] text-[var(--color-brand-dark)]"
                      >
                        {e.title}
                      </div>
                    ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
