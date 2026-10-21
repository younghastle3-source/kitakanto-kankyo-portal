import type { LucideIcon } from 'lucide-react'

export function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon
  value: number
  label: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  )
}
