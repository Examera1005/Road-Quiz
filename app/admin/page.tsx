import { NextPage } from 'next'
import { AuthGate } from '@/components/AuthGate'
import QuestionManager from '@/components/QuestionManager'

const AdminPage: NextPage = () => {
  return (
    <AuthGate>
      <div className="container mx-auto">
        <QuestionManager />
      </div>
    </AuthGate>
  )
}

export default AdminPage
