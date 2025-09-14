"use client"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ReactNode, useMemo } from "react"

function getConvexUrl() {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_CONVEX_URL || ''
  return process.env.NEXT_PUBLIC_CONVEX_URL || localStorage.getItem('rq_convex_url') || ''
}

export default function Providers({ children }: { children: ReactNode }) {
  const url = getConvexUrl()
  if (!url) {
    if (typeof window !== 'undefined') console.warn('NEXT_PUBLIC_CONVEX_URL manquant – Convex désactivé en build.')
    return <>{children}</>
  }
  const convex = useMemo(() => new ConvexReactClient(url), [url])
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
