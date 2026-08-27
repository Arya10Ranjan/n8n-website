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
                className={`card ${isActive ? 'is-active' : 'is-door'}`}
                aria-hidden={!isActive}
                onClick={() => isDoor && go(off)}
                style={{
                  ...style,
                  backgroundImage: SHADES[i % SHADES.length],
                  pointerEvents: isDoor ? 'auto' : isActive ? 'auto' : 'none',
                  cursor: isDoor ? 'pointer' : 'default',
                }}
              >
                <div className="card-body">
                  <span className="card-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.sub}</p>
                </div>
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
    </section>
  )
}
