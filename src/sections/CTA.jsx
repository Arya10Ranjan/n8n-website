import { useState } from 'react'
import ContactModal from './ContactModal'
import './CTA.css'

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="cta" id="get-started">
      <div className="container">
        <div className="cta-card">
          <span className="cta-dots" aria-hidden="true" />
          <span className="cta-sheen" aria-hidden="true" />
          <Circuit />

          <div className="cta-body">
            <h2>
              Stop Doing Manual Work.
              <br />
              Start Scaling With Automation.
            </h2>

            <p>
              Join the founders who have reclaimed their time and multiplied
              their output.
            </p>

            <button
              type="button"
              className="cta-btn"
              onClick={() => setContactOpen(true)}
            >
              Contact Us <Arrow />
            </button>
          </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}
