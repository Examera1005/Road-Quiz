import { AuthGate } from '@/components/AuthGate'
import DashboardResults from '@/components/DashboardResults'

export default function Dashboard() {
  return (
    <AuthGate>
      <div className="grid gap-6">
        <h1>Mes résultats</h1>
        <DashboardResults />
      </div>
    </AuthGate>
  )
}
