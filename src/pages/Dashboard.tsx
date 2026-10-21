import {
  MessageSquare,
  FolderOpen,
  Calendar,
  Bell,
  ClipboardCheck,
  Upload,
  CalendarPlus,
  Send,
} from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { spaces, scheduleEvents, posts, userById, CURRENT_USER_ID } from '../data/mockData'

const quickActions = [
  { icon: MessageSquare, label: 'スペースを作成' },
  { icon: Upload, label: 'ファイルをアップロード' },
  { icon: CalendarPlus, label: '予定を追加' },
  { icon: Send, label: 'ファイルをポスト' },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes(),
  ).padStart(2, '0')}`
}

export function Dashboard() {
  const me = userById(CURRENT_USER_ID)!
  const joinedSpaces = spaces.filter((s) => s.joined)
  const upcoming = scheduleEvents
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="mt-1 text-sm text-gray-500">{me.name}さん、おかえりなさい</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={MessageSquare} value={joinedSpaces.length} label="利用中のスペース" />
        <StatCard icon={FolderOpen} value={3} label="保管ファイル" />
        <StatCard icon={Calendar} value={upcoming.length} label="今後の予定" />
        <StatCard icon={Bell} value={2} label="未読投稿" />
        <StatCard icon={ClipboardCheck} value={0} label="ワークフロー通知" />
      </div>

      <div className="flex flex-wrap gap-3">
        {quickActions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Icon size={16} className="text-[var(--color-brand)]" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">最近の投稿</h2>
            <a className="text-xs font-medium text-[var(--color-brand)]" href="/posts">
              すべて見る →
            </a>
          </div>
          <div className="space-y-3">
            {posts.map((p) => {
              const author = userById(p.authorId)!
              return (
                <div
                  key={p.id}
                  className="rounded-xl border-l-4 border-[var(--color-brand)] bg-white p-4 shadow-sm"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{author.name}</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      北関東環境開発
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{p.body}</p>
                  <div className="mt-2 text-xs text-gray-400">{formatDate(p.createdAt)}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">今後の予定</h2>
            <a className="text-xs font-medium text-[var(--color-brand)]" href="/schedule">
              すべて見る →
            </a>
          </div>
          <div className="space-y-2">
            {upcoming.length === 0 && (
              <p className="text-sm text-gray-400">今後の予定はありません</p>
            )}
            {upcoming.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
              >
                <span className="text-sm text-gray-800">{e.title}</span>
                <span className="text-xs text-gray-400">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
