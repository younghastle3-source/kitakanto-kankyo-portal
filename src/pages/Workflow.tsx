import { useState } from 'react'
import { FileText, FilePlus, Clock, Send, Users, CheckCircle2 } from 'lucide-react'
import { workflowDocuments, workflowTemplates, userById, CURRENT_USER_ID } from '../data/mockData'

const tabs = [
  { id: 'pending', label: '承認待ち文書', icon: Clock },
  { id: 'mine', label: '自分が作成した文書', icon: Send },
  { id: 'related', label: '関連する文書', icon: Users },
  { id: 'all', label: '全文書', icon: FileText },
] as const

export function Workflow() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('pending')

  const filtered = workflowDocuments.filter((d) => {
    if (tab === 'pending') return d.status === 'pending'
    if (tab === 'mine') return d.authorId === CURRENT_USER_ID
    return true
  })

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <div className="space-y-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-dark)]">
          <FilePlus size={16} />
          新規文書作成
        </button>

        <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                tab === id
                  ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-bold text-gray-500">ひな型一覧</p>
          {workflowTemplates.map((t) => (
            <p key={t.id} className="mb-1.5 flex items-center gap-2 text-xs text-gray-600">
              <FileText size={13} className="text-gray-400" />
              {t.name}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h1 className="mb-4 text-xl font-bold text-gray-900">
          {tabs.find((t) => t.id === tab)?.label}
        </h1>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-16 text-gray-400">
            <FileText size={32} className="mb-2" />
            <p className="text-sm">該当する文書はありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((d) => {
              const template = workflowTemplates.find((t) => t.id === d.templateId)
              const author = userById(d.authorId)
              return (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">{d.title}</p>
                    <p className="text-xs text-gray-500">
                      {author?.name} / {template?.route.join(' → ')}
                    </p>
                  </div>
                  {d.status === 'approved' ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-[var(--color-brand)]">
                      <CheckCircle2 size={14} />
                      承認済み
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-amber-500">承認待ち</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
