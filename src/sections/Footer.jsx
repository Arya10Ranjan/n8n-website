import './Footer.css'

const links = [
  { label: 'Home', href: '#top' },
{    label: 'Join My Community',    href: 'https://www.skool.com/the-sparrow-nest-1884/about?ref=9d4d2ea6b175431698fab065d0c9f25c',    external: true,  },
  { label: 'Affiliate', href: '#affiliate' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-mark">n8n</span>
          <p className="footer-name">Automations by Rahul</p>
          <p className="footer-desc">
            Building scalable n8n workflows for businesses that want to grow
            faster, reduce manual work, and leverage AI to its full potential.
          </p>
        </div>

        <div className="footer-side">
          <nav className="footer-links">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="footer-tagline">Automate. Scale. Relax.</p>

          <p className="footer-legal">
            © 2026 Automations by Rahul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
