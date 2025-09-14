import { AuthGate } from '@/components/AuthGate'
import DynamicQuizRunner from '@/components/DynamicQuizRunner'

export default function Page() {
  return (
    <AuthGate>
      <DynamicQuizRunner
        category="priorites"
        title="Quiz Priorités"
        description="Testez vos connaissances sur les règles de priorité et les carrefours"
      />
    </AuthGate>
  )
}
