export const DangerSVG = () => (
  <svg viewBox="0 0 120 120" className="h-40 w-40">
    <defs>
      <linearGradient id="edge" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#ef4444"/>
        <stop offset="100%" stopColor="#b91c1c"/>
      </linearGradient>
    </defs>
    <polygon points="60,5 115,105 5,105" fill="white" stroke="url(#edge)" strokeWidth="8"/>
    <text x="60" y="85" textAnchor="middle" fontSize="54" fontWeight="bold" fill="#0f172a">!</text>
  </svg>
)

export const ObligateRightSVG = () => (
  <svg viewBox="0 0 120 120" className="h-40 w-40">
    <circle cx="60" cy="60" r="56" fill="#1d4ed8" stroke="#1e40af" strokeWidth="8"/>
    <path d="M 30 70 Q 50 55 70 40" stroke="white" strokeWidth="12" fill="none"/>
    <polygon points="70,40 70,55 85,47" fill="white"/>
  </svg>
)

export const PriorityRightSVG = () => (
  <svg viewBox="0 0 120 120" className="h-40 w-40">
    <rect x="10" y="10" width="100" height="100" fill="#fbbf24" stroke="#92400e" strokeWidth="8" transform="rotate(45 60 60)"/>
  </svg>
)
