"use client"
import { useEffect, useMemo, useState } from 'react'
import { clsx } from 'clsx'

export type Choice = { id: string; text: string }
export type Question = {
  id: string
  category: 'panneaux' | 'priorites' | 'securite'
  prompt: string
  img?: string // path to image (svg)
  choices: Choice[]
  answerId: string
  explanation?: string
  lcr?: string // extrait de LCR
}

export function QuizCard({
  questions,
  onFinish,
}: {
  questions: Question[]
  onFinish?: (result: { correct: number; total: number; answers: Record<string, string> }) => void
}) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [show, setShow] = useState(false)

  const q = questions[index]
  const total = questions.length
  const currentAnswer = answers[q?.id]
  const correct = useMemo(() =>
    Object.entries(answers).filter(([id, ans]) => questions.find(qq => qq.id === id)?.answerId === ans).length
  , [answers, questions])

  useEffect(() => { setShow(false) }, [index])

  const select = (choiceId: string) => {
    if (!q) return
    setAnswers(prev => ({ ...prev, [q.id]: choiceId }))
  }
  const next = () => {
    if (index < total - 1) setIndex(i => i + 1)
    else onFinish?.({ correct, total, answers })
  }
  const previous = () => setIndex(i => Math.max(0, i - 1))

  if (!q) return null

  const isCorrect = currentAnswer && currentAnswer === q.answerId

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
        <div>Question {index + 1} / {total}</div>
        <div>Score provisoire: <span className="font-medium text-slate-800">{correct}</span></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-2">{q.prompt}</h2>
          {q.lcr && <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">LCR: {q.lcr}</p>}
          {q.explanation && show && (
            <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-900">Explication: {q.explanation}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          {q.img && <img src={q.img} alt="illustration" className="max-h-56 rounded-lg border shadow-sm" />}
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {q.choices.map(c => {
          const selected = currentAnswer === c.id
          const correctChoice = c.id === q.answerId
          return (
            <button
              key={c.id}
              onClick={() => select(c.id)}
              className={clsx(
                'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors',
                selected ? 'border-primary-500 bg-primary-50' : 'hover:bg-slate-50',
                show && selected && (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'),
                show && correctChoice && 'border-green-500'
              )}
            >
              <span>{c.text}</span>
              {show && correctChoice && <span className="text-sm text-green-700">Bonne réponse</span>}
              {show && selected && !isCorrect && <span className="text-sm text-red-700">Incorrect</span>}
            </button>
          )
        })}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button className="text-slate-600 hover:underline" onClick={previous} disabled={index === 0}>Précédent</button>
        <div className="flex items-center gap-3">
          <button className="btn" onClick={() => setShow(s => !s)}>{show ? 'Masquer' : 'Afficher'} correction</button>
          <button className="btn" onClick={next}>{index < total - 1 ? 'Suivant' : 'Terminer'}</button>
        </div>
      </div>
    </div>
  )
}
