"use client"
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function QuestionManager() {
  const [category, setCategory] = useState<'panneaux' | 'priorites' | 'securite'>('panneaux')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [count, setCount] = useState(10)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQuestions = useMutation(api.questions.generateQuestionsWithAI)
  const requests = useQuery(api.questionGeneration.listRequests)
  const questions = useQuery(api.questions.getQuestionsByCategory, { category, limit: 50 })

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await generateQuestions({ category, count, difficulty })
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-6">Générateur de Questions IA</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="panneaux">Panneaux</option>
              <option value="priorites">Priorités</option>
              <option value="securite">Sécurité</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Difficulté</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input 
              type="number" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              min="1" 
              max="50"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn w-full"
        >
          {isGenerating ? 'Génération en cours...' : `Générer ${count} questions`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Demandes de génération</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {requests?.map((request) => (
              <div key={request._id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{request.category}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'failed' ? 'bg-red-100 text-red-800' :
                    request.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  {request.count} questions • {request.difficulty}
                </div>
                {request.errorMessage && (
                  <div className="text-xs text-red-600 mt-1">{request.errorMessage}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Questions existantes ({category})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {questions?.map((question) => (
              <div key={question._id} className="rounded-lg border p-3">
                <div className="font-medium text-sm mb-2">{question.question}</div>
                <div className="text-xs text-slate-600">
                  {question.difficulty} • {question.isAiGenerated ? 'IA' : 'Manuel'}
                  {question.lcrReference && ` • ${question.lcrReference}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
