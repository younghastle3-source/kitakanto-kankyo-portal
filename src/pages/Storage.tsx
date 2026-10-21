import { Folder, FileText } from 'lucide-react'
import { storageFolders } from '../data/mockData'

export function Storage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">データ保管</h1>
        <p className="mt-1 text-sm text-gray-500">現場・案件ごとに資料を保管</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {storageFolders.map((f) => (
          <div key={f.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Folder size={18} className="text-[var(--color-brand)]" />
              <span className="text-sm font-bold text-gray-900">{f.name}</span>
            </div>
            <div className="mb-3 space-y-1.5">
              {f.subfolders.map((sub) => (
                <div key={sub} className="flex items-center gap-2 pl-1 text-xs text-gray-600">
                  <FileText size={13} className="text-gray-400" />
                  {sub}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">{f.fileCount}件のファイル</p>
          </div>
        ))}
      </div>
    </div>
  )
}
