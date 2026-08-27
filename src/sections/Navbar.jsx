import { useEffect, useState } from 'react'
import './Navbar.css'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M3.6 10.4 12 3.8l8.4 6.6M5.8 9v10.2h12.4V9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 19.2v-5h4.2v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9.2" cy="8.4" r="3.1" />
        <path d="M3.6 19.2c0-3.1 2.5-5.2 5.6-5.2s5.6 2.1 5.6 5.2" />
        <path d="M16.2 6.1a3 3 0 010 5.8M17.6 14.4c1.8.6 2.8 2.3 2.8 4.4" />
      </g>
    </svg>
  )
}

function AffiliateIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.2 20 6v5.4c0 4.4-3.2 7.6-8 9.4-4.8-1.8-8-5-8-9.4V6l8-2.8Z" />
        <path d="m12 8.6 1.2 2.5 2.6.4-1.9 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-1.9-1.9 2.6-.4L12 8.6Z" />
      </g>
    </svg>
  )
}

const links = [
  { label: 'Home', href: '#top', Icon: HomeIcon },
  { label: 'Join My Community', href: '#community', Icon: CommunityIcon },
  { label: 'Affiliate', href: '#affiliate', Icon: AffiliateIcon },
]

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="nav-wrap">
      <header className={`nav ${stuck ? "is-stuck" : ""}`}>
        <a href="#top" className="nav-logo" aria-label="N8N — home">
          N8N
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(({ label, href, Icon }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              <Icon />
              {label}
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
