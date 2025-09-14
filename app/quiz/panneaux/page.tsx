import { AuthGate } from '@/components/AuthGate'
import DynamicQuizRunner from '@/components/DynamicQuizRunner'

export default function Page() {
  return (
    <AuthGate>
      <DynamicQuizRunner
        category="panneaux"
        title="Quiz Panneaux"
        description="Testez vos connaissances sur les panneaux de signalisation routière suisse"
      />
    </AuthGate>
  )
}
