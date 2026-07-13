import { useEffect, useMemo, useState } from 'react'
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  FolderKanban,
  Mail,
  MapPin,
  Menu,
  Moon,
  Quote,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { FaAppStoreIos, FaGithub, FaLinkedinIn, FaNpm } from 'react-icons/fa'
import packageJson from '../package.json'
import { experience, profile, projects, recommendations, skills } from './data'

const navigation = [
  ['Work', '#work'],
  // ['GitHub', '#github'],
  // ['Recommendations', '#recommendations'],
  ['Skills', '#skills'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

const projectPlatformIcons = {
  'app-store': FaAppStoreIos,
  github: FaGithub,
  npm: FaNpm,
  product: ExternalLink,
}

const contributionApi = 'https://github-contributions-api.jogruber.de/v4/sabbirn26?y=last'

function buildContributionWeeks(contributions) {
  if (!contributions.length) return []

  const firstDate = new Date(`${contributions[0].date}T00:00:00Z`)
  const paddedDays = [...Array(firstDate.getUTCDay()).fill(null), ...contributions]
  while (paddedDays.length % 7) paddedDays.push(null)

  return Array.from({ length: paddedDays.length / 7 }, (_, index) => paddedDays.slice(index * 7, index * 7 + 7))
}

function ContributionCalendar({ contributions }) {
  const weeks = useMemo(() => buildContributionWeeks(contributions), [contributions])
  const monthLabels = useMemo(() => weeks.map((week, index) => {
    const firstDay = week.find(Boolean)
    const monthStart = index === 0 ? firstDay : week.find((day) => day?.date.endsWith('-01'))
    if (!monthStart) return ''
    return new Date(`${monthStart.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
  }), [weeks])

  return (
    <div className="graph-calendar" role="img" aria-label={`GitHub contribution calendar with ${contributions.reduce((total, day) => total + day.count, 0)} contributions in the last year`}>
      <div className="graph-months" style={{ '--week-count': weeks.length }} aria-hidden="true">
        {monthLabels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}
      </div>
      <div className="graph-body">
        <div className="graph-weekdays" aria-hidden="true">
          <span style={{ gridRow: 2 }}>Mon</span>
          <span style={{ gridRow: 4 }}>Wed</span>
          <span style={{ gridRow: 6 }}>Fri</span>
        </div>
        <div className="graph-grid" style={{ '--week-count': weeks.length }} aria-hidden="true">
          {weeks.flatMap((week, weekIndex) => week.map((day, dayIndex) => day ? (
            <span
              className={`graph-cell level-${Math.min(day.level, 4)}`}
              key={day.date}
              title={`${day.date}: ${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`}
            />
          ) : <span className="graph-cell is-empty" key={`empty-${weekIndex}-${dayIndex}`} />))}
        </div>
      </div>
    </div>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('portfolio-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return [theme, setTheme]
}

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('.reveal')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight
        setProgress(available > 0 ? window.scrollY / available : 0)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

function getCurrentDuration(startDate) {
  const start = new Date(startDate)
  const now = new Date()
  let months = (now.getFullYear() - start.getFullYear()) * 12
  months += now.getMonth() - start.getMonth()
  months = Math.max(0, months)
  const years = Math.floor(months / 12)
  const remainder = months % 12
  const values = []
  if (years) values.push(`${years} year${years === 1 ? '' : 's'}`)
  if (remainder || !years) values.push(`${remainder} month${remainder === 1 ? '' : 's'}`)
  return values.join(' ')
}

function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('work')

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    let frame
    const updateActiveSection = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.38
        let current = 'work'
        navigation.forEach(([, href]) => {
          const section = document.querySelector(href)
          if (section && section.offsetTop <= marker) current = href.slice(1)
        })
        setActiveSection(current)
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Sabbir Nasir, home">
          <span className="brand-mark">{profile.monogram}</span>
          <span className="brand-name"><span>Sabbir</span><span>Nasir</span></span>
        </a>

        <nav className={open ? 'nav is-open' : 'nav'} aria-label="Primary navigation">
          <button className="icon-button nav-close" type="button" onClick={() => setOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
          {navigation.map(([label, href]) => {
            const isActive = activeSection === href.slice(1)
            return (
              <a
                className={isActive ? 'is-active' : undefined}
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </a>
            )
          })}
          <a className="mobile-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Resume <Download size={15} />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="button compact desktop-resume" href={profile.resume} target="_blank" rel="noreferrer">
            <Download size={16} /> Resume
          </a>
          <button className="icon-button menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu size={21} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const handlePortraitMove = (event) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const stage = event.currentTarget
    const box = stage.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width))
    const y = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height))

    stage.style.setProperty('--portrait-rotate-x', `${(0.5 - y) * 9}deg`)
    stage.style.setProperty('--portrait-rotate-y', `${(x - 0.5) * 9}deg`)
  }

  const resetPortraitTilt = (event) => {
    const stage = event.currentTarget
    stage.style.setProperty('--portrait-rotate-x', '0deg')
    stage.style.setProperty('--portrait-rotate-y', '0deg')
  }

  return (
    <section className="hero shell" id="top">
      <div className="hero-ambient" aria-hidden="true">
        <span className="ambient-signal signal-one" />
        <span className="ambient-signal signal-two" />
        <span className="ambient-signal signal-three" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow hero-enter delay-1">
          <span className="availability-dot" /> {profile.eyebrow}
        </p>
        <h1 className="hero-enter delay-2">
          Software Engineer
          <span>Building the Future</span>
        </h1>
        <div className="hero-intro hero-enter delay-3">
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-description">{profile.intro}</p>
        </div>
        <div className="hero-actions hero-enter delay-4">
          <a className="button primary" href="#experience">
            <BriefcaseBusiness size={17} /> View experience
          </a>
          <a className="button" href="#work">
            <FolderKanban size={17} /> View projects
          </a>
        </div>
        <div className="hero-social-actions hero-enter delay-5" aria-label="Professional profiles">
          <a className="button" href={profile.github} target="_blank" rel="noreferrer">
            <FaGithub size={18} /> GitHub
          </a>
          <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedinIn size={18} /> LinkedIn
          </a>
        </div>
        <div className="hero-proof hero-enter delay-5" aria-label="Professional highlights">
          <div>
            <strong>Since 2022</strong>
            <span>Building production software</span>
          </div>
          <div>
            <strong>Product focus</strong>
            <span>Fintech, payments & developer tools</span>
          </div>
        </div>
      </div>

      <div
        className="portrait-stage hero-enter delay-3"
        aria-label="Portrait of Sabbir Nasir"
        onPointerMove={handlePortraitMove}
        onPointerLeave={resetPortraitTilt}
      >
        <div className="portrait-tilt">
          <div className="portrait-index">01 / iOS ENGINEERING</div>
          <div className="portrait-backdrop" />
          <img src={profile.image} alt="Sabbir Nasir" />
          <div className="portrait-caption">
            <span>Currently</span>
            <strong>{profile.role}</strong>
            <small>Newroz Technologies Limited</small>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ index, eyebrow, title, description, action }) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="section-kicker"><span>{index}</span>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-aside">
        {description && <p>{description}</p>}
        {action}
      </div>
    </div>
  )
}

function ProjectVisual({ project }) {
  const [missing, setMissing] = useState(!project.screenshotReady)
  return (
    <div className={`project-visual theme-${project.theme}`}>
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
        <small>{project.category}</small>
      </div>
      {!missing ? (
        <img src={project.screenshot} alt={`${project.title} project screenshot`} loading="lazy" onError={() => setMissing(true)} />
      ) : (
        <div className="project-placeholder" aria-label={`${project.title} project preview`}>
          <div className="mock-phone">
            <div className="mock-notch" />
            <div className="mock-status">
              <span>{project.title.slice(0, 1)}</span>
              <i />
            </div>
            <div className="mock-balance" />
            <div className="mock-actions"><i /><i /><i /></div>
            <div className="mock-list"><i /><i /><i /></div>
          </div>
          <div className="placeholder-copy">
            <span>{project.impact || project.category}</span>
            <strong>{project.title}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, compact = false, index, expanded, onToggle }) {
  const PlatformIcon = projectPlatformIcons[project.primaryPlatform] || ExternalLink
  const panelId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const onPointerMove = (event) => {
    const card = event.currentTarget
    const box = card.getBoundingClientRect()
    card.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - 0.5) * 7}deg`)
    card.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - 0.5) * -7}deg`)
  }
  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--pointer-x', '0deg')
    event.currentTarget.style.setProperty('--pointer-y', '0deg')
  }

  return (
    <article
      className={`project-card reveal ${compact ? 'compact-card' : ''} ${expanded ? 'is-expanded' : ''}`}
      style={{ '--delay': `${(index % 3) * 80}ms` }}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
    >
      <button
        className="project-mobile-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="project-summary-main">
          <span className="project-summary-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-summary-copy">
            <small>{project.category}</small>
            <strong>{project.title}</strong>
            <span className="project-summary-description">{project.mobileSummary}</span>
          </span>
        </span>
        <span className="project-summary-actions" aria-hidden="true">
          <PlatformIcon size={16} />
          <ChevronDown size={18} />
        </span>
      </button>
      <div className="project-card-details" id={panelId}>
        <div className="project-card-details-inner">
          <ProjectVisual project={project} />
          <div className="project-body">
            <div className="project-meta">
              <span>{project.category}</span>
              {project.impact && <span>{project.impact}</span>}
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-footer">
              <div className="tag-list" aria-label="Technologies used">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <a href={project.primaryLink} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on ${project.primaryLabel}`}>
                <PlatformIcon size={16} aria-hidden="true" /> {project.primaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function Work() {
  const [openProject, setOpenProject] = useState(null)
  const featured = projects.filter((project) => project.featured)
  const personal = projects.filter((project) => !project.featured)
  const toggleProject = (title) => setOpenProject((current) => current === title ? null : title)

  return (
    <section className="section work-section" id="work">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Software built for real users."
          description="Production fintech products and open-source builds that connect product decisions with architecture, reliability, and maintainable delivery."
        />
        <div className="featured-grid">
          {featured.map((project, index) => (
            <ProjectCard
              expanded={openProject === project.title}
              index={index}
              key={project.title}
              onToggle={() => toggleProject(project.title)}
              project={project}
            />
          ))}
        </div>

        <div className="lab-heading reveal">
          <div>
            <Sparkles size={18} />
            <h3>Independent lab</h3>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer"><FaGithub size={15} /> All repositories</a>
        </div>
        <div className="personal-grid">
          {personal.map((project, index) => (
            <ProjectCard
              compact
              expanded={openProject === project.title}
              index={index + featured.length}
              key={project.title}
              onToggle={() => toggleProject(project.title)}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function GithubActivity() {
  const [graphFailed, setGraphFailed] = useState(false)
  const [contributions, setContributions] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(contributionApi, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Contribution request failed')
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data.contributions)) throw new Error('Contribution data is invalid')
        setContributions(data.contributions)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setGraphFailed(true)
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="section github-section" id="github">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="GitHub activity"
          title="The work between the launches."
          description="Experiments, iterations, and open-source projects from my public GitHub profile."
          action={<a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><FaGithub size={15} /> @sabbirn26</a>}
        />
        <div className="github-panel reveal">
          <div className="github-panel-top">
          <div>
            <FaGithub size={22} />
            <span>Public contribution activity</span>
            </div>
            <span className="live-label"><i /> LIVE FROM GITHUB</span>
          </div>
          {!graphFailed ? (
            <div className="graph-scroll" tabIndex="0" aria-label="Scrollable GitHub contribution graph">
              <div className="graph-canvas">
                {contributions ? <ContributionCalendar contributions={contributions} /> : <div className="graph-loading">Loading contribution activity...</div>}
                <div className="graph-legend" aria-label="Contribution intensity from less to more">
                  <span>Less</span>
                  <i className="level-0" />
                  <i className="level-1" />
                  <i className="level-2" />
                  <i className="level-3" />
                  <i className="level-4" />
                  <span>More</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="graph-fallback">
              <Code2 size={26} />
              <div>
                <strong>The activity graph is taking a break.</strong>
                <span>GitHub is still one click away.</span>
              </div>
              <a className="button compact" href={profile.github} target="_blank" rel="noreferrer"><FaGithub size={15} /> Open profile</a>
            </div>
          )}
          <p className="graph-note">Contribution data is rendered by a public graph service and may be delayed.</p>
        </div>
      </div>
    </section>
  )
}

function Recommendations() {
  return (
    <section className="section recommendation-section" id="recommendations">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Recommendations"
          title="What it feels like to work together."
          description="Approved notes from people I have worked with, presented with their original attribution."
        />
        {recommendations.length ? (
          <div className="recommendation-grid">
            {recommendations.map((item, index) => (
              <figure className="recommendation-card reveal" style={{ '--delay': `${index * 80}ms` }} key={item.name}>
                <Quote size={28} aria-hidden="true" />
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  {item.avatar ? <img src={item.avatar} alt="" /> : <span>{item.name.slice(0, 1)}</span>}
                  <div><strong>{item.name}</strong><small>{item.title}, {item.company}</small></div>
                  <a href={item.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${item.name} on LinkedIn`}><FaLinkedinIn size={17} /></a>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="recommendation-empty reveal">
            <div className="quote-mark">“</div>
            <div>
              <span>Recommendations will appear here once approved.</span>
              <h3>No borrowed praise. Only words from people I have actually worked with.</h3>
            </div>
            <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn size={17} /> Visit LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="skills-section section" id="skills">
      <div className="shell skills-layout">
        <div className="skills-copy reveal">
          <p className="section-kicker"><span>03</span>Capabilities</p>
          <h2><span>A practical toolkit</span> for shipping reliable software.</h2>
          <p>{profile.summary}</p>
          <div className="skills-principles" aria-label="Engineering principles">
            <div>
              <strong>Product thinking</strong>
              <span>Translate real user needs into clear, maintainable product decisions.</span>
            </div>
            <div>
              <strong>Engineering discipline</strong>
              <span>Design for reliability, security, and dependable delivery.</span>
            </div>
          </div>
        </div>
        <div className="skills-list">
          {skills.map((group, index) => (
            <div className="skill-row reveal" style={{ '--delay': `${index * 60}ms` }} key={group.label}>
              <div className="skill-row-title">
                <span>0{index + 1}</span>
                <div>
                  <h3>{group.label}</h3>
                  <small>{group.status || `${group.items.length} capabilities`}</small>
                </div>
              </div>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="From engineering foundations to product ownership."
          description="A progression from testing and implementation fundamentals to ownership of production engineering outcomes."
        />
        <div className="timeline">
          {experience.map((item, index) => {
            const duration = item.currentStart ? getCurrentDuration(item.currentStart) : item.duration
            return (
              <article className="timeline-item reveal" style={{ '--delay': `${index * 60}ms` }} key={`${item.role}-${item.start}`}>
                <div className="timeline-date">
                  <span>{item.start}</span>
                  <small>{item.end} · {duration}</small>
                </div>
                <div className="timeline-marker"><i /></div>
                <div className="timeline-content">
                  <div className="timeline-title">
                    <div><h3>{item.role}</h3><p>{item.company}</p></div>
                    {item.location && <span><MapPin size={14} /> {item.location}</span>}
                  </div>
                  <p className="timeline-summary">{item.summary}</p>
                  <ul>{item.highlights.map((highlight) => <li key={highlight}><Check size={15} />{highlight}</li>)}</ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-layout reveal">
        <div>
          <p className="section-kicker light"><span>05</span>Contact</p>
          <h2>Building software that needs to work in the real world?</h2>
        </div>
        <div className="contact-aside">
          <p>I’m open to conversations about reliable products, software architecture, fintech, platform engineering, and thoughtful user experiences.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Mail size={22} /></a>
          <div className="contact-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn size={17} /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><FaGithub size={17} /> GitHub</a>
            <a href={profile.resume} target="_blank" rel="noreferrer"><Download size={17} /> Resume</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="shell footer-inner">
        <a className="brand" href="#top"><span className="brand-mark">{profile.monogram}</span><span className="brand-name"><span>Sabbir</span><span>Nasir</span></span></a>
        <p>iOS software engineer in Dhaka, Bangladesh.</p>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Sabbir Nasir</span>
          <span className="app-version" aria-label={`Portfolio version ${packageJson.version}`}>v{packageJson.version}</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [theme, setTheme] = useTheme()
  const progress = useScrollProgress()
  useReveal()

  const progressStyle = useMemo(() => ({ transform: `scaleX(${progress})` }), [progress])

  return (
    <>
      <a className="skip-link" href="#work">Skip to projects</a>
      <Header theme={theme} setTheme={setTheme} />
      <div className="page-progress" style={progressStyle} aria-hidden="true" />
      <main>
        <Hero />
        <Work />
        <GithubActivity />
        {/* Future: restore Recommendations here and update the following section numbers. */}
        {/* <Recommendations /> */}
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
