import Link from 'next/link'

export default function Home() {
  return (
    <section className="grid gap-8">
      <div className="tilt card p-8">
        <h1 className="mb-3">Révisez le code de la route suisse</h1>
        <p className="text-slate-600">Panneaux, priorités et sécurité routière, avec explications, extraits de la LCR et suivi de vos résultats.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link className="btn tilt-child" href="/quiz/panneaux">Panneaux</Link>
          <Link className="btn tilt-child" href="/quiz/priorites">Priorités</Link>
          <Link className="btn tilt-child" href="/quiz/securite">Sécurité</Link>
        </div>
      </div>
    </section>
  )
}
