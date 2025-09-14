import '../styles/globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Road Quiz Suisse',
  description: 'Questionnaires de code de la route suisse: panneaux, priorités, sécurité.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 select-none">
          <svg className="absolute -left-40 top-20 h-[600px] w-[600px] opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#1f9fff" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#g1)" strokeWidth="2">
              {Array.from({ length: 24 }).map((_, i) => (
                <circle key={i} cx="100" cy="100" r={10 + i * 4} />
              ))}
            </g>
          </svg>
        </div>
        <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-bold text-primary-700">🚗 Road Quiz Suisse</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/quiz/panneaux" className="hover:underline">Panneaux</Link>
              <Link href="/quiz/priorites" className="hover:underline">Priorités</Link>
              <Link href="/quiz/securite" className="hover:underline">Sécurité</Link>
              <Link href="/tableau-de-bord" className="hover:underline">Mes résultats</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mt-20 border-t py-6 text-center text-sm text-slate-500">
          <p>Contenu pédagogique non-officiel à but d'entraînement. Vérifiez toujours la loi et la LCR.</p>
        </footer>
      </body>
    </html>
  )
}
