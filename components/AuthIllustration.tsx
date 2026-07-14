// Flat line-art illustration for the auth screens: a laptop with a passing
// checklist, a magnifying glass hunting for bugs, a bug icon, and a code
// tag — the "QA testing" visual motif from docs/login-reference.png.

export default function AuthIllustration() {
  return (
    <svg
      className="auth-illustration"
      viewBox="0 0 380 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* decorative dots grid */}
      <g stroke="rgba(255,255,255,.12)" strokeWidth="1.4" strokeLinecap="round">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle key={`${row}-${col}`} cx={300 + col * 10} cy={40 + row * 10} r="1.3" fill="rgba(255,255,255,.14)" />
          ))
        )}
      </g>
      <path d="M18 34h20M28 24v20" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="26" cy="120" r="3" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
      <circle cx="345" cy="150" r="16" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" strokeDasharray="3 4" />

      {/* laptop */}
      <g transform="translate(60,60)">
        <rect x="0" y="0" width="200" height="130" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" strokeWidth="1.6" />
        <circle cx="16" cy="16" r="3" fill="rgba(255,255,255,.22)" />
        <circle cx="27" cy="16" r="3" fill="rgba(255,255,255,.22)" />
        <circle cx="38" cy="16" r="3" fill="rgba(255,255,255,.22)" />
        <line x1="0" y1="28" x2="200" y2="28" stroke="rgba(255,255,255,.12)" strokeWidth="1.4" />

        {/* pass badge */}
        <circle cx="34" cy="55" r="14" fill="var(--lime-soft)" stroke="var(--lime)" strokeWidth="1.8" />
        <path d="m28 55 4 4 8-8" stroke="var(--lime)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* content lines */}
        <line x1="58" y1="47" x2="150" y2="47" stroke="rgba(255,255,255,.2)" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="63" x2="120" y2="63" stroke="rgba(255,255,255,.12)" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="88" x2="180" y2="88" stroke="rgba(255,255,255,.1)" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="102" x2="150" y2="102" stroke="rgba(255,255,255,.1)" strokeWidth="3" strokeLinecap="round" />

        {/* laptop base */}
        <path d="M-14 130h228l-12 14H-2z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)" strokeWidth="1.4" />
      </g>

      {/* magnifying glass overlapping bottom-right of the laptop */}
      <g transform="translate(215,150)">
        <circle cx="0" cy="0" r="30" fill="rgba(9,9,11,.9)" stroke="var(--cyan)" strokeWidth="3" />
        <line x1="21" y1="21" x2="42" y2="42" stroke="var(--cyan)" strokeWidth="6" strokeLinecap="round" />
        <path d="m-10 -4 6 6 12-12" stroke="var(--lime)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* bug badge, floating lower-left */}
      <g transform="translate(20,190)">
        <rect x="0" y="0" width="56" height="56" rx="14" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" strokeWidth="1.5" />
        <g transform="translate(15,14)" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="6" y="6" width="14" height="18" rx="7" />
          <path d="M6 12H1M6 18H1M20 12h5M20 18h5M11 3 9 6M15 3l2 3M13 24v6" />
        </g>
      </g>

      {/* checklist badge, floating bottom */}
      <g transform="translate(95,230)">
        <rect x="0" y="0" width="60" height="52" rx="12" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" strokeWidth="1.5" />
        <g stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m13 15 3 3 6-6" />
          <path d="m13 26 3 3 6-6" />
          <path d="m13 37 3 3 6-6" />
        </g>
      </g>

      {/* code tag badge, floating top-right */}
      <g transform="translate(280,90)">
        <rect x="0" y="0" width="52" height="42" rx="12" fill="rgba(34,211,238,.08)" stroke="var(--cyan)" strokeWidth="1.6" />
        <path d="m18 13-7 8 7 8M34 13l7 8-7 8" stroke="var(--cyan)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}
