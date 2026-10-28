import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  FolderOpen,
  Calendar,
  Send,
  ClipboardCheck,
  Leaf,
  Menu,
  X,
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
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
            <Leaf size={16} />
          </div>
          <div className="text-sm font-bold text-gray-900">北関東環境開発</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="メニューを開く"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
              <Leaf size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">北関東環境開発</div>
              <div className="text-xs text-gray-500">社内ポータルシステム</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 md:hidden"
            aria-label="メニューを閉じる"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
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
    </>
  )
}
