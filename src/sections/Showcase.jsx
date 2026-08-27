import { useCallback, useEffect, useRef, useState } from 'react'
import './Showcase.css'

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
    { title: 'Discover', sub: 'We map every manual step your team repeats.' },
    { title: 'Design', sub: 'A workflow blueprint built around your stack.' },
    { title: 'Scale', sub: 'From one task to millions, effortlessly.' },
    { title: 'Monitor', sub: 'Live logs and alerts on every run.' },
    { title: 'Ship', sub: 'Deploy automations in minutes, not weeks.' },
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

export default function Showcase() {
  const [mode, setMode] = useState('dsl')
  const [active, setActive] = useState(0)
  const stageRef = useRef(null)

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

  const prev = (active - 1 + count) % count
  const next = (active + 1) % count
  const card = slides[active]

  return (
    <section className="showcase" id="how-it-works">
      <div className="showcase-tint" aria-hidden="true" />

      <div className="container showcase-head">
        <h2>It&apos;s simple, responsive and fast.</h2>
        <p>Pick a track and step through how we take it from idea to live.</p>

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
        <button
          type="button"
          className="door door-prev"
          style={{ backgroundImage: SHADES[prev % SHADES.length] }}
          onClick={() => go(-1)}
          aria-label={`Previous: ${slides[prev].title}`}
        >
          <span className="door-label">Prev</span>
        </button>

        <div className="deck">
          <article className="card" key={`${mode}-${active}`}>
            <div className="card-body">
              <span className="card-num">
                {String(active + 1).padStart(2, '0')}
              </span>
              <h3>{card.title}</h3>
              <p>{card.sub}</p>
            </div>

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
          </article>
        </div>

        <button
          type="button"
          className="door door-next"
          style={{ backgroundImage: SHADES[next % SHADES.length] }}
          onClick={() => go(1)}
          aria-label={`Next: ${slides[next].title}`}
        >
          <span className="door-label">Next</span>
        </button>
      </div>
    </section>
  )
}
