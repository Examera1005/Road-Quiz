import { QuizCard, type Question } from '@/components/QuizCard'
import { AuthGate } from '@/components/AuthGate'

const questions: Question[] = [
  {
    id: 'p1',
    category: 'panneaux',
    prompt: 'Que signifie ce panneau triangulaire avec bord rouge et un point d’exclamation ?',
    img: '/svg/danger.svg',
    choices: [
      { id: 'a', text: 'Danger général' },
      { id: 'b', text: 'Route prioritaire' },
      { id: 'c', text: 'Interdiction de dépasser' },
    ],
    answerId: 'a',
    explanation: 'Panneau de danger général placé avant un danger non spécifié. Ralentir et être prêt à s’arrêter.',
    lcr: 'OSR art. 3 et 4: Les signaux de danger annoncent un danger et exigent une conduite prudente.'
  },
  {
    id: 'p2',
    category: 'panneaux',
    prompt: 'Que signifie ce panneau rond à fond bleu avec une flèche blanche courbe ?',
    img: '/svg/obligation-contourner-droite.svg',
    choices: [
      { id: 'a', text: 'Contourner à droite obligatoire' },
      { id: 'b', text: 'Virage dangereux à droite' },
      { id: 'c', text: 'Route à sens unique' },
    ],
    answerId: 'a',
    explanation: 'Signal d’obligation (fond bleu) indiquant de contourner l’obstacle du côté indiqué.',
  },
]

export default function Page() {
  return (
    <AuthGate>
      <QuizCard questions={questions} />
    </AuthGate>
  )
}
