import { useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Join My Community', href: '#community' },
  { label: 'Affiliate', href: '#affiliate' },
]

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="nav-wrap">
      <header className="nav">
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#get-started" className="nav-cta">
          Get started <Arrow />
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>
    </div>
  )
}
