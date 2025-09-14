import { QuizCard, type Question } from '@/components/QuizCard'
import { AuthGate } from '@/components/AuthGate'

const questions: Question[] = [
  {
    id: 'r1',
    category: 'priorites',
    prompt: 'À une intersection sans signalisation, qui a la priorité ?',
    img: '/svg/prio-droite.svg',
    choices: [
      { id: 'a', text: 'Le véhicule venant de gauche' },
      { id: 'b', text: 'Le véhicule venant de droite' },
      { id: 'c', text: 'Le véhicule le plus rapide' },
    ],
    answerId: 'b',
    explanation: 'Règle de la priorité de droite en l’absence de signalisation.',
    lcr: 'LCR art. 36, al. 2: À l’intersection, la priorité appartient au véhicule venant de droite.'
  },
  {
    id: 'r2',
    category: 'priorites',
    prompt: 'Sur une route principale signalée, qui cède le passage ?',
    choices: [
      { id: 'a', text: 'Les véhicules sur la route principale' },
      { id: 'b', text: 'Les véhicules venant de la route secondaire' },
      { id: 'c', text: 'Personne, tout le monde passe' },
    ],
    answerId: 'b',
    explanation: 'La route principale confère la priorité sur les routes secondaires qui s’y engagent.',
  },
]

export default function Page() {
  return (
    <AuthGate>
      <QuizCard questions={questions} />
    </AuthGate>
  )
}
