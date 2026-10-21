import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  FolderOpen,
  Calendar,
  Send,
  ClipboardCheck,
  Leaf,
} from 'lucide-react'
import { users, CURRENT_USER_ID } from '../data/mockData'

const navItems = [
  { to: '/', label: 'ダッシュボード', icon: LayoutDashboard, end: true },
  { to: '/spaces', label: 'スペース', icon: MessageSquare },
  { to: '/storage', label: 'データ保管', icon: FolderOpen },
  { to: '/schedule', label: 'スケジュール', icon: Calendar },
  { to: '/posts', label: 'ポスト', icon: Send },
  { to: '/workflow', label: 'ワークフロー', icon: ClipboardCheck },
]

export function Sidebar() {
  const me = users.find((u) => u.id === CURRENT_USER_ID)!

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
          <Leaf size={20} />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">北関東環境開発</div>
          <div className="text-xs text-gray-500">社内ポータルシステム</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-gray-200 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white">
          {me.name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{me.name}</div>
          <div className="text-xs text-gray-500">{me.department}</div>
        </div>
      </div>
    </aside>
  )
}
