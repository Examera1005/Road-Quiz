import { AuthGate } from '@/components/AuthGate'
import DynamicQuizRunner from '@/components/DynamicQuizRunner'

export default function SecuritePage() {
  return (
    <AuthGate>
      <DynamicQuizRunner
        category="securite"
        title="Quiz Sécurité"
        description="Testez vos connaissances sur la sécurité routière et la conduite défensive"
      />
    </AuthGate>
  )
}
