import { useState } from 'react'
import './CTA.css'

function PaperPlane() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M21.5 2.5L2.8 9.9c-.7.3-.7 1.3 0 1.6l6.6 2.4 2.4 6.6c.3.7 1.3.7 1.6 0L21.5 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M21.5 2.5L9.4 13.9" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function Circuit() {
  return (
    <svg className="cta-circuit" viewBox="0 0 190 150" aria-hidden="true">
      <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4">
        <rect x="14" y="60" width="46" height="34" strokeDasharray="5 5" />
        <path d="M22 18h96v56h44" />
        <path d="M60 77h58" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4">
        <circle cx="22" cy="18" r="5" />
        <circle cx="162" cy="74" r="5" />
      </g>
    </svg>
  )
}

export default function CTA() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    // No backend yet — wire this to your list provider when ready.
    setSent(true)
    setEmail('')
  }

  return (
    <section className="cta" id="get-started">
      <div className="container">
        <div className="cta-card">
          <span className="cta-dots" aria-hidden="true" />
          <span className="cta-sheen" aria-hidden="true" />
          <Circuit />
          <div className="cta-body">
            <h2>
              <span className="line-1">Stop Doing Manual Work.</span>
              <span className="line-2">Start Scaling With Automation.</span>
            </h2>

            <p>
              Join the founders who have reclaimed their time and multiplied
              their output.
            </p>

            <form className="cta-form" onSubmit={onSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
              />
              <button type="submit" className="cta-submit">
                <PaperPlane />
                Subscribe
              </button>
            </form>

            <p className="cta-note" role="status">
              {sent ? "You're on the list — we'll be in touch shortly." : '\u00A0'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
