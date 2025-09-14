import { QuizCard, type Question } from '@/components/QuizCard'
import { AuthGate } from '@/components/AuthGate'

const questions: Question[] = [
  {
    id: 's1',
    category: 'securite',
    prompt: 'Quelle est la distance minimale à garder avec le véhicule qui précède par temps sec (règle des 2 secondes) ?',
    choices: [
      { id: 'a', text: 'Une seconde' },
      { id: 'b', text: 'Deux secondes' },
      { id: 'c', text: 'Trois secondes' },
    ],
    answerId: 'b',
    explanation: 'La règle des 2 secondes est un minimum par temps sec, augmenter si pluie/neige.',
  },
  {
    id: 's2',
    category: 'securite',
    prompt: 'Quand utiliser les feux antibrouillard arrière ?',
    choices: [
      { id: 'a', text: 'En cas de brouillard très dense (visibilité < 50 m)' },
      { id: 'b', text: 'La nuit sur autoroute' },
      { id: 'c', text: 'En ville pour être mieux vu' },
    ],
    answerId: 'a',
    explanation: 'Feux antibrouillard arrière éblouissants: uniquement quand la visibilité est très réduite.',
  },
]

export default function Page() {
  return (
    <AuthGate>
      <QuizCard questions={questions} />
    </AuthGate>
  )
}
