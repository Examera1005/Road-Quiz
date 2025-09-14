import { AuthGate } from '@/components/AuthGate'

export default function Dashboard() {
  return (
    <AuthGate>
      <div className="grid gap-4">
        <h1>Mes résultats</h1>
        <p className="text-slate-600">Historique à venir (stockage via Convex).</p>
      </div>
    </AuthGate>
  )
}
