import { Link } from 'react-router-dom'
import { Lock, Globe, Plus } from 'lucide-react'
import { spaces } from '../data/mockData'

export function Spaces() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">スペース</h1>
          <p className="mt-1 text-sm text-gray-500">案件や議題ごとに情報を共有</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-dark)]">
          <Plus size={16} />
          スペースを作成
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((s) => (
          <div
            key={s.id}
            className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                {s.visibility === 'public' ? (
                  <Globe size={16} className="text-[var(--color-brand)]" />
                ) : (
                  <Lock size={16} className="text-amber-500" />
                )}
                <span className="text-sm font-bold text-gray-900">{s.name}</span>
              </div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                  {s.visibility === 'public' ? '全員公開' : '限定'}
                </span>
                {s.guestNames?.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600"
                  >
                    ゲスト: {g}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">{s.messages.length}件の投稿</p>
            </div>
            {s.joined ? (
              <Link
                to={`/spaces/${s.id}`}
                className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-gray-700"
              >
                開く
              </Link>
            ) : (
              <button className="mt-4 rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)]">
                参加依頼
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
