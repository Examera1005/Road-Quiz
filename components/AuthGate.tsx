"use client"
import React, { useEffect, useState } from 'react'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    const id = localStorage.getItem('rq_user_id')
    const display = localStorage.getItem('rq_display_name') || ''
    if (id) setUserId(id)
    if (display) setName(display)
  }, [])

  const signIn = () => {
    const id = crypto.randomUUID()
    localStorage.setItem('rq_user_id', id)
    localStorage.setItem('rq_display_name', name || 'Anonyme')
    setUserId(id)
  }

  const signOut = () => {
    localStorage.removeItem('rq_user_id')
    localStorage.removeItem('rq_display_name')
    setUserId(null)
  }

  if (!userId) {
    return (
      <div className="card p-6">
        <h2 className="mb-2">Connexion rapide</h2>
        <p className="text-sm text-slate-600 mb-4">Pas de mot de passe. Choisissez un nom d'affichage pour sauvegarder vos résultats.</p>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 rounded-lg border px-3 py-2"
            placeholder="Votre nom"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <button className="btn" onClick={signIn}>Commencer</button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between rounded-xl border bg-white/60 p-3 text-sm">
        <div>Connecté en tant que <span className="font-medium">{localStorage.getItem('rq_display_name')}</span></div>
        <button className="text-slate-600 hover:underline" onClick={signOut}>Se déconnecter</button>
      </div>
      {children}
    </div>
  )
}
