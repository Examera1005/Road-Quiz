import { AuthGate } from '@/components/AuthGate'

export default function Page() {
  return (
    <AuthGate>
      <LearningCenter />
    </AuthGate>
  )
}

function LearningCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">📚 Apprentissage du Code de la Route Suisse</h1>
          <p className="text-slate-600 text-lg">
            Apprenez les règles de circulation en Suisse avec nos modules d'apprentissage interactifs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <LearningModule
            icon="🚏"
            title="Panneaux de Signalisation"
            description="Apprenez à reconnaître et comprendre tous les panneaux routiers suisses"
            topics={[
              "Panneaux de danger",
              "Panneaux d'interdiction",
              "Panneaux d'obligation",
              "Panneaux d'indication",
              "Signalisation temporaire"
            ]}
          />
          
          <LearningModule
            icon="⚠️"
            title="Règles de Priorité"
            description="Maîtrisez les règles de priorité aux intersections et carrefours"
            topics={[
              "Priorité à droite",
              "Signalisation de priorité",
              "Carrefours à sens giratoire",
              "Dépassement",
              "Circulation en montagne"
            ]}
          />
          
          <LearningModule
            icon="🛡️"
            title="Sécurité Routière"
            description="Adoptez une conduite sûre et responsable"
            topics={[
              "Distances de sécurité",
              "Conduite par mauvais temps",
              "Alcool et drogues",
              "Fatigue au volant",
              "Équipements obligatoires"
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReferenceSection />
          <QuickTipsSection />
        </div>
      </div>
    </div>
  )
}

function LearningModule({ icon, title, description, topics }: {
  icon: string
  title: string
  description: string
  topics: string[]
}) {
  return (
    <div className="card p-6 h-full">
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
      
      <div className="space-y-2 mb-6">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            {topic}
          </div>
        ))}
      </div>
      
      <button className="w-full btn-primary">
        📖 Commencer l'apprentissage
      </button>
    </div>
  )
}

function ReferenceSection() {
  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold mb-4">📖 Références Légales</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-semibold">LCR - Loi sur la Circulation Routière</h4>
          <p className="text-sm text-slate-600">
            La loi fondamentale qui régit la circulation routière en Suisse
          </p>
        </div>
        
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-semibold">OSR - Ordonnance sur la Signalisation Routière</h4>
          <p className="text-sm text-slate-600">
            Définit tous les panneaux et marquages routiers officiels
          </p>
        </div>
        
        <div className="border-l-4 border-yellow-500 pl-4">
          <h4 className="font-semibold">OAC - Ordonnance sur l'Admission à la Circulation</h4>
          <p className="text-sm text-slate-600">
            Règles concernant les véhicules et les permis de conduire
          </p>
        </div>
      </div>
      
      <button className="w-full btn-secondary mt-4">
        📋 Consulter les textes légaux
      </button>
    </div>
  )
}

function QuickTipsSection() {
  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold mb-4">💡 Conseils Rapides</h3>
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-800">🚗 Distance de sécurité</h4>
          <p className="text-sm text-blue-700">
            Règle des 2 secondes : comptez 2 secondes entre vous et le véhicule précédent
          </p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <h4 className="font-semibold text-green-800">🔄 Priorité à droite</h4>
          <p className="text-sm text-green-700">
            En l'absence de signalisation, la priorité revient au véhicule venant de droite
          </p>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-lg">
          <h4 className="font-semibold text-yellow-800">⛔ Limitations de vitesse</h4>
          <p className="text-sm text-yellow-700">
            En ville: 50 km/h, Route principale: 80 km/h, Autoroute: 120 km/h
          </p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg">
          <h4 className="font-semibold text-red-800">🍷 Alcool au volant</h4>
          <p className="text-sm text-red-700">
            Limite légale : 0.5‰ dans le sang ou 0.25 mg/l dans l'air expiré
          </p>
        </div>
      </div>
    </div>
  )
}
