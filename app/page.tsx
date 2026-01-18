'use client';

import React, { useState } from 'react';

type Track = 'research' | 'eng';

type Metric = { value: string; label: string; tooltip?: string };

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { href: string; label: string; external?: boolean }[];
  note?: string;
  metrics?: Metric[];
  bullets?: string[];
  primary?: { href: string; label: string; external?: boolean };
  live?: boolean;
};

type Role = {
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  details?: string[];
};

/* ---------- Reusable metrics bar component ---------- */
function MetricsBar({
  items,
  className = '',
  size = 'md',
}: {
  items: Metric[];
  className?: string;
  size?: 'sm' | 'md';
}) {
  const cols =
    items.length === 2
      ? 'md:grid-cols-2'
      : items.length === 3
      ? 'md:grid-cols-3'
      : 'md:grid-cols-4';

  const pad = size === 'sm' ? 'p-3' : 'p-4';
  const gap = size === 'sm' ? 'gap-3' : 'gap-4';
  const value = size === 'sm' ? 'text-xl font-extrabold' : 'text-2xl font-bold';
  const label = size === 'sm' ? 'text-[11px]' : 'text-xs';

  return (
    <div className={`grid grid-cols-2 ${cols} ${gap} ${className}`}>
      {items.map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-slate-200 bg-white/60 text-center dark:border-slate-700 dark:bg-slate-800/60"
        >
          <div className={`${pad}`}>
            <div className={`${value} text-emerald-600 dark:text-emerald-300`}>{m.value}</div>
            <div className={`${label} mx-auto mt-0.5 flex items-center justify-center gap-1 text-slate-600 dark:text-slate-300`}>
              <span>{m.label}</span>
              {m.tooltip && (
                <span className="relative inline-flex">
                  <button
                    type="button"
                    aria-label={`About ${m.label}`}
                    className="peer inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700 cursor-help focus-visible:outline-none focus-visible:ring focus-visible:ring-amber-400/60 dark:bg-slate-700 dark:text-slate-100"
                    tabIndex={0}
                  >
                    i
                  </button>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 top-full z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[10px] text-white shadow-lg mt-2 peer-hover:block peer-focus-visible:block dark:bg-slate-700"
                  >
                    {m.tooltip}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [track, setTrack] = useState<Track>('research');

  const skills: Record<Track, string[]> = {
    research: [
      '📊 Longitudinal cohort analysis (Cox PH, survival models)',
      '📈 Causal inference & difference-in-differences',
      '🧠 Mental health epidemiology',
      '📝 Academic publishing & peer review',
      '🔬 R (advanced), Python, Stata, SQL',
    ],
    eng: [
      '🔧 Backend: Go, Python, TypeScript',
      '🛡️ Data governance & compliance (GDPR)',
      '☁️ Cloud infrastructure (Azure, Docker)',
      '🔐 Security & data sovereignty',
      '⚙️ API design & system architecture',
    ],
  };

  /* ---------- Current Roles ---------- */
  const currentRoles: Role[] = [
    {
      title: 'Tech Lead',
      organization: 'Sendent B.V.',
      period: 'December 2025 – Present',
      location: 'Netherlands',
      description: 'Developing compliance and data governance solutions for enterprise environments.',
      details: [
        'Focus on data sovereignty, security, and GDPR compliance',
        'Building governance solutions for Nextcloud ecosystems',
      ],
    },
    {
      title: 'PhD Candidate',
      organization: 'Maastricht University',
      period: 'January 2026 – 2030',
      location: 'CAPHRI Institute',
      description: 'Researching the multidimensional relationships between objectively measured sleep characteristics and depressive symptoms.',
      details: [
        'Supervisors: Dr. Annemarie Koster & Dr. Ree Meertens',
        'Department of Social Medicine',
        'Research Line: Health Inequities and Societal Participation',
      ],
    },
  ];

  /* ---------- Projects ---------- */
  const projects: Project[] = [
    {
      title: 'EU-27 Border vs Non-border Life-Expectancy Convergence (1995–2023)',
      blurb:
        'Built a harmonised EU-27 NUTS-2 panel (NUTS-2016; 240 regions; 6,102 region-years) from Eurostat mortality/population data; estimated absolute β-convergence with TWFE and ran border event-study within countries. Pandemic caused a temporary σ-divergence, then re-convergence by 2023; border regions showed deeper dip and over-rebound.',
      tags: ['R', 'TWFE', 'Event study', 'Eurostat', 'GIS'],
      links: [],
      metrics: [
        { value: '240', label: 'Regions' },
        { value: '6,102', label: 'Region-years' },
        { value: '1995–2023', label: 'Span' },
        { value: 'β −0.0054', label: 'Convergence (TWFE)' },
      ],
      bullets: [
        'Anchor-2019 population weights; region-clustered SEs',
        'Within-country β ≈ −0.0047; segmented σ(log-LE) trend',
        'Border event-study: deeper 2020–21 dip, +0.13–0.18y over-rebound by 2023',
      ],
    },
    {
      title: 'Sleep ↔ Depression Longitudinal Analysis',
      blurb:
        'Investigating whether objectively measured sleep duration and sleep breaks predict incident depressive symptoms in a prospective cohort of ~6,000 adults over 12 years of follow-up. Using Cox proportional-hazards regression with restricted cubic splines to model non-linear associations.',
      tags: ['Cox PH', 'R', 'Survival Analysis', 'Splines', 'The Maastricht Study'],
      links: [],
      note: 'Manuscript in preparation for Sleep Health',
    },
    {
      title: 'Maastricht Deprisk',
      blurb:
        'Independent technical project exploring ML deployment pipelines in a health research context. Built end-to-end system with FastAPI backend and Next.js frontend, deployed on Azure Container Apps. A personal learning exercise in production ML systems.',
      tags: ['XGBoost', 'FastAPI', 'Next.js', 'Docker', 'Azure'],
      links: [
        { href: 'https://github.com/mehdimkia/maastrichtDeprisk', label: 'GitHub', external: true },
      ],
      note: 'Independent project for technical learning – not part of official research work',
    },
    {
      title: 'Khaterak (2015–2017)',
      blurb:
        'Co-founded and developed social platform serving 10,000+ monthly active users. Built scalable backend with OAuth authentication and optimized performance by 40%.',
      tags: ['PHP', 'Python', 'OAuth', 'PostgreSQL', 'Agile'],
      links: [],
      note: 'Full-stack development & system architecture',
    },
  ];

  /* ---------- Publications ---------- */
  const publications = [
    {
      role: 'In Preparation',
      title:
        'Sleep Duration and Sleep Breaks as Predictors of Incident Depressive Symptoms: A Longitudinal Analysis of Objectively Measured Sleep in The Maastricht Study',
      authors: 'Mirkia, M., Zeches, L., Koster, A., Schram, M.T., Köhler, S., Eussen, S.J.P.M., ... & Meertens, R.',
      venue: 'Target: Sleep Health',
      year: '2025',
      link: '#',
    },
    {
      role: 'Under Review',
      title:
        'Pandemic-era divergence and resilience in EU-27 border vs. non-border life expectancy, 1995–2023',
      authors: 'Mirkia, M., & Hrzic, R.',
      venue: 'Manuscript under review',
      year: '2025',
      link: '#',
    },
    {
      role: 'Conference',
      title: 'Sleep Duration and Sleep Breaks as Predictors of Incident Depressive Symptoms',
      authors: 'Mirkia, M., Zeches, L., Koster, A., et al.',
      venue: 'European Conference on Mental Health (ECMH), Antwerp',
      year: '2025',
      link: '#',
      type: 'Poster',
    },
    {
      role: 'Conference Paper',
      title: 'Psychological Aid in Humanitarian Response to Natural Crisis',
      authors: 'Mirkia, M.',
      venue: '1st Int. Conf. Psychology & Social Sciences, Babol',
      year: '2022',
      link: 'https://civilica.com/doc/1698998',
    },
  ];

  /* ---------- Education ---------- */
  const education = [
    {
      degree: 'MSc European Public Health (Europubhealth+)',
      schools: 'Maastricht University',
      years: '2024–2025',
      highlight: 'Erasmus Mundus Scholar (top 1% selection rate)',
    },
    {
      degree: 'Master of Public Health',
      schools: 'University College Dublin',
      years: '2023–2024',
      highlight: 'First-Class Honours',
    },
    {
      degree: 'BSc Psychology',
      schools: 'Payam Noor University',
      years: '2017–2022',
      highlight: 'Grade: 17.44/20',
    },
  ];

  /* ---------- Research Interests ---------- */
  const researchInterests = [
    'Sleep-depression dynamics',
    'Longitudinal cohort analysis',
    'Digital biomarkers',
    'Epidemiological methods',
    'Mental health research',
    'Causal inference',
  ];

  const chip = (active: boolean) =>
    `px-3 py-1 text-xs font-medium rounded-full transition ${
      active
        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-amber-300/70 dark:bg-emerald-900/30 dark:text-emerald-300'
        : ''
    }`;

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 p-6 lg:grid-cols-[320px_1fr]">
        {/* === LEFT STICKY SIDEBAR === */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white font-bold">MM</div>
              <div>
                <h1 className="text-xl font-extrabold">Mehdi Mirkia</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Software Engineer · PhD Researcher</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Building data governance solutions at Sendent B.V. and researching sleep-depression relationships at Maastricht University.
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Also published as: M. Mirkialangaroodi
            </p>

            {/* Track toggle */}
            <div className="mt-6">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Skills overview
              </span>
              <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                <button onClick={() => setTrack('research')} className={chip(track === 'research')}>Research</button>
                <button onClick={() => setTrack('eng')} className={chip(track === 'eng')}>Engineering</button>
              </div>
              <ul className="mt-3 space-y-2">
                {skills[track].map((s) => (
                  <li key={s} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              <a href="mailto:mirkia.mehdi@gmail.com" className="text-sm underline-offset-2 hover:underline hover:text-emerald-600">
                Email
              </a>
              <a href="https://github.com/mehdimkia" target="_blank" rel="noopener noreferrer" className="text-sm underline-offset-2 hover:underline hover:text-emerald-600">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/mirkia" target="_blank" rel="noopener noreferrer" className="text-sm underline-offset-2 hover:underline hover:text-emerald-600">
                LinkedIn
              </a>
            </div>
          </section>
        </aside>

        {/* === RIGHT CONTENT === */}
        <div className="space-y-12">
          {/* HERO */}
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-amber-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:via-amber-900/10 dark:to-slate-950">
            <h2 className="text-3xl font-black sm:text-4xl">Software Engineer · PhD Researcher</h2>
            <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
              Currently building data governance solutions at Sendent B.V. and researching sleep-depression relationships at Maastricht University.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              5+ years software development · 4+ years research experience · Erasmus Mundus Scholar · MSc & MPH
            </p>
          </section>

          {/* Current Roles */}
          <section id="current">
            <h3 className="text-2xl font-bold">Current</h3>
            <div className="mt-4 space-y-4">
              {currentRoles.map((role) => (
                <article
                  key={role.title + role.organization}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">{role.title}</h4>
                      <p className="text-emerald-600 dark:text-emerald-400">{role.organization}</p>
                    </div>
                    <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                      <p>{role.period}</p>
                      <p>{role.location}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{role.description}</p>
                  {role.details && (
                    <ul className="mt-2 space-y-1">
                      {role.details.map((detail) => (
                        <li key={detail} className="text-xs text-slate-500 dark:text-slate-400">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Research */}
          <section id="research" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-2xl font-bold">Research</h3>
            
            {/* Publications */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold">Publications & Manuscripts</h4>
              <div className="mt-4 space-y-4">
                {publications.map((pub) => (
                  <div key={pub.title} className="border-l-2 border-emerald-500 pl-4">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      [{pub.role}]{pub.type && ` – ${pub.type}`}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{pub.authors}</p>
                    <h5 className="mt-1 text-sm font-medium">{pub.title}</h5>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      {pub.venue} • {pub.year}
                    </p>
                    {pub.link !== '#' && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        View paper →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Research Interests */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold">Research Interests</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {researchInterests.map((interest) => (
                  <span key={interest} className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects">
            <h3 className="text-2xl font-bold">Projects</h3>
            <div className="mt-6 space-y-5">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="border-l-4 border-emerald-500 p-5 sm:p-6">
                    <h4 className="text-lg font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      {p.title}
                      {p.live && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800/60">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                          LIVE
                        </span>
                      )}
                    </h4>

                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{p.blurb}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Bullets */}
                    {p.bullets && p.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Links */}
                    {p.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {p.links.map((l) => (
                          <a
                            key={l.href + l.label}
                            href={l.href}
                            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
                            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {l.label} →
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Project-specific metrics */}
                    {p.metrics && <MetricsBar items={p.metrics} className="mt-4" size="sm" />}

                    {p.note && <p className="mt-3 text-xs text-slate-500 italic dark:text-slate-400">{p.note}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Education */}
          <section id="education">
            <h3 className="text-2xl font-bold">Education</h3>
            <div className="mt-4 space-y-4">
              {education.map((edu) => (
                <div key={edu.degree} className="flex gap-4">
                  <div className="w-1 flex-shrink-0 rounded bg-emerald-500" />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {edu.schools} • {edu.years}
                    </p>
                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{edu.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="mb-4 text-xl font-semibold">Connect</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                For academic inquiries, collaboration opportunities, or professional matters.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a 
                  href="mailto:mirkia.mehdi@gmail.com" 
                  className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/mirkia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/40"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/mehdimkia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/40"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            © {new Date().getFullYear()} Mehdi Mirkia · Maastricht, Netherlands
          </footer>
        </div>
      </div>
    </main>
  );
}