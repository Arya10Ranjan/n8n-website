import { useEffect, useRef, useState } from 'react'
import './ContactModal.css'

const EMPTY = { name: '', email: '', phone: '', website: '', message: '' }

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const firstFieldRef = useRef(null)
  const cardRef = useRef(null)

  // close on Escape, lock page scroll, focus the first field
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  // start clean each time the dialog is reopened
  useEffect(() => {
    if (open) {
      setForm(EMPTY)
      setSent(false)
    }
  }, [open])

  if (!open) return null

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // No backend yet — wire this to your form handler / n8n webhook when ready.
    setSent(true)
  }

  return (
    <div
      className="contact-overlay"
      onClick={(e) => {
        if (!cardRef.current?.contains(e.target)) onClose()
      }}
    >
      <div
        className="contact-card"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <button
          type="button"
          className="contact-close"
          onClick={onClose}
          aria-label="Close contact form"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 id="contact-title">Get in Touch</h2>
        <p className="contact-lead">
          Leave your message and we&apos;ll get back to you shortly.
        </p>

        {sent ? (
          <div className="contact-done" role="status">
            <span className="contact-tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path
                  d="M5 13l4.5 4.5L19 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>Thanks — your message is on its way. We&apos;ll reply shortly.</p>
            <button type="button" className="contact-submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="contact-row">
              <label className="contact-field">
                <span>
                  Your name <em aria-hidden="true">*</em>
                </span>
                <input
                  ref={firstFieldRef}
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={set('name')}
                />
              </label>

              <label className="contact-field">
                <span>Email address <small>(optional)</small></span>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  value={form.email}
                  onChange={set('email')}
                />
              </label>
            </div>

            <div className="contact-row">
              <label className="contact-field">
                <span>
                  Phone <em aria-hidden="true">*</em>
                </span>
                <input
                  type="tel"
                  required
                  placeholder="+1-999-999-9999"
                  value={form.phone}
                  onChange={set('phone')}
                />
              </label>

              <label className="contact-field">
                <span>Website URL <small>(optional)</small></span>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={form.website}
                  onChange={set('website')}
                />
              </label>
            </div>

            <label className="contact-field">
              <span>Message <small>(optional)</small></span>
              <textarea
                rows={4}
                placeholder="Tell us briefly about your needs"
                value={form.message}
                onChange={set('message')}
              />
            </label>

            <button type="submit" className="contact-submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
