import { useCallback, useEffect, useRef, useState } from 'react'
import './Showcase.css'
import slide01 from '../assets/slide-01.png'
import slide02 from '../assets/slide-02.png'
import slide03 from '../assets/slide-03.png'
import slide04 from '../assets/slide-04.png'
import slide05 from '../assets/slide-05.png'
import slide06 from '../assets/slide-06.png'
import slide07 from '../assets/slide-07.png'
import slide08 from '../assets/slide-08.png'

const SHADES = [
  'linear-gradient(158deg, #6FC3F7 0%, #2E86D9 100%)',
  'linear-gradient(158deg, #8AD1FA 0%, #3D95E2 100%)',
  'linear-gradient(158deg, #5FB8F5 0%, #2678CE 100%)',
  'linear-gradient(158deg, #93D6FB 0%, #4A9DE6 100%)',
  'linear-gradient(158deg, #7ACAF8 0%, #348ADD 100%)',
]

// Placeholder copy — swap the title/sub strings when you send the real ones.
const DECKS = {
  dsl: [
    {
      title: 'Discover',
      sub: 'We map every manual step your team repeats.',
      image: slide01,
    },
    {
      title: 'Design',
      sub: 'A workflow blueprint built around your stack.',
      image: slide02,
    },
    {
      title: 'Scale',
      sub: 'From one task to millions, effortlessly.',
      image: slide03,
    },
    {
      title: 'Monitor',
      sub: 'Live logs and alerts on every run.',
      image: slide04,
    },
    {
      title: 'Bottleneck',
      sub: 'Processes that do not scale can hold the business back.',
      image: slide05,
    },
    {
      title: 'Failures',
      sub: 'Broken processes can cause delays and missed tasks.',
      image: slide06,
    },
    {
      title: 'Follow-ups',
      sub: 'Reminders and routine communication consume valuable time.',
      image: slide07,
    },
    {
      title: 'Growth',
      sub: 'More business should not mean more manual workload.',
      image: slide08,
    },
  ],
  vsl: [
    { title: 'Script', sub: 'A story engineered to hold attention.' },
    { title: 'Record', sub: 'Studio-grade capture, zero production drag.' },
    { title: 'Edit', sub: 'Cut, caption and polish on autopilot.' },
    { title: 'Publish', sub: 'One click to every channel you run.' },
    { title: 'Convert', sub: 'Track the views that turn into revenue.' },
  ],
}

const MODES = [
  { id: 'dsl', label: 'DSL' },
  { id: 'vsl', label: 'VSL' },
]

function Arrow({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Resting transform for a slide, by its distance from the active one.
function slideStyle(off) {
  const abs = Math.abs(off)
  const dir = Math.sign(off)

  if (abs === 0) {
    return {
      transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 5,
    }
  }

  if (abs === 1) {
    return {
      // hinged door: swung out to the side, angled away from the viewer
      transform: `translateX(${dir * 86}%) translateZ(-220px) rotateY(${-dir * 42}deg) scale(0.78)`,
      opacity: 0.45,
      zIndex: 3,
    }
  }

  // parked further out, invisible — these are what swing in next
  return {
    transform: `translateX(${dir * 140}%) translateZ(-320px) rotateY(${-dir * 52}deg) scale(0.7)`,
    opacity: 0,
    zIndex: 1,
  }
}

export default function Showcase() {
  const [mode, setMode] = useState('dsl')
  const [active, setActive] = useState(0)
  const stageRef = useRef(null)
  const [zoomed, setZoomed] = useState(null)

  const slides = DECKS[mode]
  const count = slides.length

  const go = useCallback(
    (step) => setActive((i) => (i + step + count) % count),
    [count],
  )

  const changeMode = (id) => {
    if (id === mode) return
    setMode(id)
    setActive(0)
  }

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [go])

  // close the zoomed poster on Escape, and lock page scroll while it is open
  useEffect(() => {
    if (!zoomed) return
    const onKey = (e) => e.key === "Escape" && setZoomed(null)
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [zoomed])

  return (
    <section className="showcase" id="how-it-works">
      <div className="showcase-tint" aria-hidden="true" />

      <div className="container showcase-head">
        <h2>Automation Built Around Your Business.</h2>
        <p>
          Explore smarter workflows designed to simplify operations, reduce
          manual work, and help your business scale.
        </p>

        <div className="toggle" role="tablist" aria-label="Choose a track">
          <span
            className="toggle-thumb"
            style={{ transform: `translateX(${mode === 'vsl' ? '100%' : '0%'})` }}
            aria-hidden="true"
          />
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              className={`toggle-btn ${mode === m.id ? 'is-active' : ''}`}
              onClick={() => changeMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${mode.toUpperCase()} steps`}
      >
        <div className="track">
          {slides.map((s, i) => {
            let off = i - active
            if (off > count / 2) off -= count
            if (off < -count / 2) off += count

            const isActive = off === 0
            const isDoor = Math.abs(off) === 1
            const style = slideStyle(off)

            return (
              <article
                key={s.title}
                className={`card ${isActive ? "is-active" : "is-door"} ${
                  s.image ? "has-poster" : ""
                }`}
                aria-hidden={!isActive}
                onClick={() => {
                  if (isDoor) go(off)
                  else if (isActive && s.image) setZoomed(s)
                }}
                style={{
                  ...style,
                  backgroundImage: s.image ? "none" : SHADES[i % SHADES.length],
                  pointerEvents: isDoor ? "auto" : isActive ? "auto" : "none",
                  cursor: isDoor || (isActive && s.image) ? "pointer" : "default",
                }}
              >
                {s.image ? (
                  <>
                    <img className="card-poster" src={s.image} alt={s.title} />
                    <span className="card-zoom" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <circle cx="11" cy="11" r="6.5" />
                          <path d="M15.8 15.8 20.5 20.5M11 8.4v5.2M8.4 11h5.2" />
                        </g>
                      </svg>
                    </span>
                  </>
                ) : (
                  <div className="card-body">
                    <span className="card-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.sub}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <button
          type="button"
          className="nav-arrow nav-arrow-prev"
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <Arrow dir="prev" />
        </button>
        <button
          type="button"
          className="nav-arrow nav-arrow-next"
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <Arrow dir="next" />
        </button>

        <div className="dots">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={i === active ? 'is-on' : ''}
              onClick={() => setActive(i)}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
      </div>

      {zoomed && (
        <div
          className="poster-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomed.title} poster`}
          onClick={() => setZoomed(null)}
        >
          <img src={zoomed.image} alt={zoomed.title} />
          <button
            type="button"
            className="poster-close"
            onClick={() => setZoomed(null)}
            aria-label="Close poster"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
