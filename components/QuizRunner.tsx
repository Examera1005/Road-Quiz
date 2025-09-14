"use client"
import { useRouter } from 'next/navigation'
import { QuizCard, type Question } from './QuizCard'
import { useMemo } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function QuizRunner({ questions }: { questions: Question[] }) {
  const router = useRouter()
  const save = useMutation(api.results.save)
  const category = useMemo(() => questions[0]?.category ?? 'panneaux', [questions])

  return (
    <QuizCard
      questions={questions}
      onFinish={async (res) => {
        const userId = localStorage.getItem('rq_user_id') || ''
        const displayName = localStorage.getItem('rq_display_name') || undefined
        try {
          if (userId) {
            await save({ userId, displayName, category, ...res })
          }
        } catch (e) {
          console.error(e)
        }
        router.push('/tableau-de-bord')
      }}
    />
  )
}
