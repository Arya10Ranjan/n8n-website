import heroBg from '../assets/hero-bg.png'
import './Hero.css'

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 2.5l1.9 5.3a4 4 0 002.3 2.3l5.3 1.9-5.3 1.9a4 4 0 00-2.3 2.3L12 21.5l-1.9-5.3a4 4 0 00-2.3-2.3L2.5 12l5.3-1.9a4 4 0 002.3-2.3L12 2.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-bg" src={heroBg} alt="" aria-hidden="true" />

      <div className="hero-inner">
        <span className="hero-badge">
          <Sparkle />
          AI-First Workflow Automation
        </span>

        <h1 className="hero-title">
          <span className="line-1">Automate Smarter.</span>
          <span className="line-2">Grow Without Limits.</span>
        </h1>

        <p className="hero-sub">
          Build powerful AI-driven workflows with n8n that connect your tools,
          <br />
          automate repetitive tasks, and accelerate business growth.
        </p>

        <a href="#get-started" className="hero-cta">
          Start Automating <Arrow />
        </a>
      </div>
    </section>
  )
}
