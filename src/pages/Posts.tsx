import { posts, userById } from '../data/mockData'

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(
    d.getHours(),
  ).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function Posts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ポスト</h1>
        <p className="mt-1 text-sm text-gray-500">全社への一斉共有</p>
      </div>

      <div className="space-y-3">
        {posts.map((p) => {
          const author = userById(p.authorId)!
          return (
            <div key={p.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-white">
                  {author.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{author.name}</div>
                  <div className="text-xs text-gray-400">{formatDate(p.createdAt)}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{p.body}</p>
              <p className="mt-2 text-xs text-gray-400">{p.readCount}人が既読</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
