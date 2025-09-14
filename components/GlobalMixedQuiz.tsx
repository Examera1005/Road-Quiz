"use client"
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import QuizRunner from './QuizRunner'
import { Question } from './QuizCard'

export default function GlobalMixedQuiz() {
  // Récupérer les questions de toutes les catégories
  const panneauxQuestions = useQuery(api.questions.getQuestionsByCategory, { 
    category: 'panneaux', 
    limit: 20 
  })
  const prioritesQuestions = useQuery(api.questions.getQuestionsByCategory, { 
    category: 'priorites', 
    limit: 20 
  })
  const securiteQuestions = useQuery(api.questions.getQuestionsByCategory, { 
    category: 'securite', 
    limit: 20 
  })

  if (!panneauxQuestions || !prioritesQuestions || !securiteQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des questions...</p>
        </div>
      </div>
    )
  }

  // Combiner toutes les questions
  const allDbQuestions = [
    ...panneauxQuestions,
    ...prioritesQuestions, 
    ...securiteQuestions
  ]

  // Convertir au format attendu
  const convertedQuestions: Question[] = allDbQuestions.map((q, index) => ({
    id: `global_${q._id}`,
    category: q.category,
    prompt: q.question,
    choices: q.choices.map((choice, i) => ({
      id: String.fromCharCode(97 + i), // a, b, c, d
      text: choice
    })),
    answerId: String.fromCharCode(97 + q.correctAnswer),
    explanation: q.explanation || 'Explication non disponible',
    lcr: q.lcrReference || ''
  }))

  // Ajouter quelques questions statiques pour garantir du contenu
  const staticQuestions: Question[] = [
    {
      id: 'static_1',
      category: 'panneaux',
      prompt: "Que signifie un panneau triangulaire rouge avec un point d'exclamation ?",
      choices: [
        { id: 'a', text: 'Danger général' },
        { id: 'b', text: 'Arrêt obligatoire' },
        { id: 'c', text: 'Sens interdit' },
        { id: 'd', text: 'Zone de travaux' }
      ],
      answerId: 'a',
      explanation: 'Ce panneau signale un danger général et invite à la prudence.',
      lcr: 'OSR art. 3 - Signaux de danger'
    },
    {
      id: 'static_2',
      category: 'priorites',
      prompt: "À un carrefour sans signalisation, qui a la priorité ?",
      choices: [
        { id: 'a', text: 'Le véhicule le plus lourd' },
        { id: 'b', text: 'Le véhicule venant de droite' },
        { id: 'c', text: 'Le véhicule venant de gauche' },
        { id: 'd', text: 'Le premier arrivé' }
      ],
      answerId: 'b',
      explanation: 'En Suisse, la règle de priorité à droite s\'applique aux carrefours non signalisés.',
      lcr: 'LCR art. 36 - Priorité à droite'
    },
    {
      id: 'static_3',
      category: 'securite',
      prompt: "Quelle est la distance de sécurité recommandée sur autoroute ?",
      choices: [
        { id: 'a', text: '1 seconde' },
        { id: 'b', text: '2 secondes' },
        { id: 'c', text: '3 secondes' },
        { id: 'd', text: '5 secondes' }
      ],
      answerId: 'c',
      explanation: 'Sur autoroute, il est recommandé de maintenir 3 secondes de distance de sécurité.',
      lcr: 'LCR art. 34 - Distance de sécurité'
    }
  ]

  // Combiner et mélanger toutes les questions
  const allQuestions = [...convertedQuestions, ...staticQuestions]
  const shuffledQuestions = allQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 20) // Limiter à 20 questions

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎯 Quiz Global - Code de la Route Suisse</h1>
          <p className="text-slate-600 text-lg">
            Quiz complet avec {shuffledQuestions.length} questions mélangées de toutes les catégories
          </p>
        </div>
        <QuizRunner questions={shuffledQuestions} />
      </div>
    </div>
  )
}
