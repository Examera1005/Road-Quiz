import { AuthGate } from '@/components/AuthGate'
import GlobalMixedQuiz from '@/components/GlobalMixedQuiz'

export default function Page() {
  return (
    <AuthGate>
      <GlobalMixedQuiz />
    </AuthGate>
  )
}
