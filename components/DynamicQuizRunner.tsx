"use client"
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import QuizRunner from './QuizRunner'
import { Question } from './QuizCard'

interface DynamicQuizRunnerProps {
  category: 'panneaux' | 'priorites' | 'securite'
  title: string
  description: string
}

export default function DynamicQuizRunner({ category, title, description }: DynamicQuizRunnerProps) {
  // Récupérer les questions de la base de données ET les questions statiques
  const dbQuestions = useQuery(api.questions.getQuestionsByCategory, { 
    category, 
    limit: 50 
  })

  // Questions statiques de fallback (pour garantir qu'il y a toujours du contenu)
  const staticQuestions = getStaticQuestions(category)

  if (!dbQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Convertir les questions DB au format attendu
  const convertedDbQuestions: Question[] = dbQuestions.map((q, index) => ({
    id: `db_${q._id}`,
    category: q.category,
    prompt: q.question,
    choices: q.choices.map((choice, i) => ({
      id: String.fromCharCode(97 + i), // a, b, c, d
      text: choice
    })),
    answerId: String.fromCharCode(97 + q.correctAnswer), // 0->a, 1->b, etc.
    explanation: q.explanation || 'Explication non disponible',
    lcr: q.lcrReference || ''
  }))

  // Combiner questions statiques et générées
  const allQuestions = [...staticQuestions, ...convertedDbQuestions]

  // Mélanger les questions pour plus de variété
  const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-slate-600 text-lg">{description}</p>
        </div>
        <QuizRunner questions={shuffledQuestions} />
      </div>
    </div>
  )
}

// Questions statiques par catégorie (pour garantir du contenu de base)
function getStaticQuestions(category: string): Question[] {
  const staticQuestions = {
    panneaux: [
      {
        id: 'p1',
        category: 'panneaux' as const,
        prompt: "Que signifie ce panneau triangulaire avec bord rouge et un point d'exclamation ?",
        img: '/svg/danger.svg',
        choices: [
          { id: 'a', text: 'Danger général' },
          { id: 'b', text: 'Route prioritaire' },
          { id: 'c', text: 'Interdiction de dépasser' },
        ],
        answerId: 'a',
        explanation: "Panneau de danger général placé avant un danger non spécifié. Ralentir et être prêt à s'arrêter.",
        lcr: "OSR art. 3 et 4: Les signaux de danger annoncent un danger et exigent une conduite prudente."
      },
      {
        id: 'p2',
        category: 'panneaux' as const,
        prompt: 'Que signifie ce panneau rond à fond bleu avec une flèche blanche courbe ?',
        img: '/svg/obligation-contourner-droite.svg',
        choices: [
          { id: 'a', text: 'Contourner à droite obligatoire' },
          { id: 'b', text: 'Virage dangereux à droite' },
          { id: 'c', text: 'Route à sens unique' },
        ],
        answerId: 'a',
        explanation: "Panneau d'obligation de contourner l'obstacle par la droite.",
        lcr: "OSR art. 5: Les signaux d'obligation prescrivent un comportement déterminé."
      }
    ],
    priorites: [
      {
        id: 'pr1',
        category: 'priorites' as const,
        prompt: 'À un carrefour non signalisé, qui a la priorité ?',
        choices: [
          { id: 'a', text: 'Le véhicule venant de droite' },
          { id: 'b', text: 'Le véhicule venant de gauche' },
          { id: 'c', text: 'Le véhicule le plus gros' },
        ],
        answerId: 'a',
        explanation: "Règle de priorité à droite en Suisse.",
        lcr: "LCR art. 36: À un carrefour, le conducteur doit laisser passer les véhicules venant de droite."
      }
    ],
    securite: [
      {
        id: 's1',
        category: 'securite' as const,
        prompt: 'Quelle est la distance de sécurité minimale en ville ?',
        choices: [
          { id: 'a', text: '3 mètres' },
          { id: 'b', text: '1 mètre par 10 km/h' },
          { id: 'c', text: '2 secondes' },
        ],
        answerId: 'c',
        explanation: "Règle des 2 secondes pour maintenir une distance de sécurité adéquate.",
        lcr: "LCR art. 34: Distance de sécurité suffisante avec le véhicule qui précède."
      }
    ]
  }

  return staticQuestions[category as keyof typeof staticQuestions] || []
}
