import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Paperclip, Send, Eye } from 'lucide-react'
import { spaces, userById } from '../data/mockData'

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(
    d.getHours(),
  ).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function SpaceDetail() {
  const { id } = useParams()
  const space = spaces.find((s) => s.id === id)
  const [draft, setDraft] = useState('')

  if (!space) {
    return <p className="text-sm text-gray-500">スペースが見つかりません</p>
  }

  return (
    <div className="space-y-4">
      <Link to="/spaces" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeft size={15} />
        スペース一覧へ戻る
      </Link>

      <div>
        <h1 className="text-xl font-bold text-gray-900">{space.name}</h1>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span>メンバー: {space.memberIds.length}名</span>
          {space.guestNames?.map((g) => (
            <span key={g} className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-600">
              ゲスト: {g} 招待中
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="投稿内容を入力...（@でメンション）"
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm focus:border-[var(--color-brand)] focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip size={18} />
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] disabled:opacity-40">
            <Send size={14} />
            投稿
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {space.messages.map((m) => {
          const author = userById(m.authorId)
          return (
            <div key={m.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-white">
                  {author?.name[0]}
                </div>
                <span className="text-sm font-bold text-gray-900">{author?.name}</span>
                <span className="text-xs text-gray-400">{formatDate(m.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-gray-700">{m.body}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {m.mentions.map((mt) => (
                  <span key={mt} className="text-xs font-medium text-[var(--color-brand)]">
                    @{mt}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <button className="hover:text-gray-600">返信 ({m.replyCount})</button>
                <span className="flex items-center gap-1">
                  <Eye size={13} />
                  {m.viewCount}人が閲覧
                </span>
              </div>
            </div>
          )
        })}
        {space.messages.length === 0 && (
          <p className="text-sm text-gray-400">まだ投稿がありません</p>
        )}
      </div>
    </div>
  )
}
