"use client"
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function DashboardResults() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('rq_user_id') || '' : ''
  const results = useQuery(api.results.listByUser, userId ? { userId } : 'skip')

  if (!userId) {
    return <p className="text-slate-600">Connectez-vous pour voir vos résultats.</p>
  }
  if (results === undefined) {
    return <p className="text-slate-600">Chargement…</p>
  }
  if (!results || results.length === 0) {
    return <p className="text-slate-600">Aucun résultat pour le moment. Lancez un quiz !</p>
  }
  return (
    <div className="grid gap-3">
      {results.map((r: any) => (
        <div key={r._id} className="rounded-xl border bg-white/70 p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium capitalize">{r.category}</div>
            <div className="text-sm text-slate-600">{new Date(r.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-1 text-sm">Score: {r.correct} / {r.total}</div>
        </div>
      ))}
    </div>
  )
}
