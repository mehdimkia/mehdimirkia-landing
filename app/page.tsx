'use client';

import React, { useState } from 'react';

type Track = 'phd' | 'eng';

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
  const [track, setTrack] = useState<Track>('phd');

  const skills: Record<Track, string[]> = {
    phd: [
      '🔬 Sleep-depression longitudinal analysis',
      '📊 Cox PH & survival analysis with splines',
      '📈 Cohort studies (N=9,000+)',
      '🧠 Mental health epidemiology',
      '📝 Academic writing & peer review',
    ],
    eng: [
      '🏢 Data governance & GDPR compliance',
      '⚙️ Enterprise software architecture',
      '🚀 Full-stack development (Next.js, FastAPI)',
      '🔐 Security & access control systems',
      '☁️ Cloud deployment (Azure, Docker, CI/CD)',
    ],
  };

  /* ---------- Personal metrics ---------- */
  const personalMetrics: Metric[] = [
    { value: '9,000+', label: 'Research participants', tooltip: 'The Maastricht Study cohort' },
    { value: '5+ yrs', label: 'Software development', tooltip: 'Full-stack and ML engineering' },
    { value: '4+ yrs', label: 'Research experience', tooltip: 'Epidemiology and mental health' },
    { value: '2', label: "Master's degrees", tooltip: 'MPH (UCD) + MSc Public Health (Maastricht)' },
  ];

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
      title: 'Sleep ↔ Depression Longitudinal Analysis (Thesis)',
      blurb:
        'Seven-year cohort study using Cox PH models with restricted cubic splines to capture non-linear effects of sleep duration on depression risk. Manuscript in preparation.',
      tags: ['Cox PH', 'R', 'Survival Analysis', 'Splines'],
      links: [],
    },
    {
      title: 'Maastricht Deprisk – Technical ML Demo',
      blurb:
        'End-to-end ML deployment pipeline demonstrating FastAPI backend + Next.js frontend integration. Containerized service on Azure Container Apps uses XGBoost for predictive modeling.',
      tags: ['XGBoost', 'FastAPI', 'Next.js', 'Docker', 'Azure Container Apps'],
      links: [
        { href: 'https://maastrichtdeprisk.mehdimirkia.com/', label: 'View demo', external: true },
        { href: 'https://github.com/mehdimkia/maastrichtDeprisk', label: 'GitHub', external: true },
      ],
      note: 'Independent technical project for learning purposes. Not part of official research or clinical practice.',
    },
    {
      title: 'Social Platform – Khaterak',
      blurb:
        'Co-founded and developed social app serving 10,000+ MAU. Built scalable backend with OAuth authentication and optimized performance by 40%.',
      tags: ['PHP', 'Python', 'OAuth', 'PostgreSQL', 'Agile'],
      links: [],
      note: '2015-2017: Full-stack development & system architecture',
    },
    {
      title: 'Cohort Insights Dashboard',
      blurb:
        'Interactive Power BI dashboard visualizing cohort characteristics and study metrics for The Maastricht Study.',
      tags: ['Power BI', 'Data Viz', 'ETL'],
      links: [],
    },
  ];

  const publications = [
    {
      role: 'Under Review',
      title:
        'Pandemic-era divergence and resilience in EU-27 border vs non-border life expectancy, 1995–2023',
      venue: 'Mirkia, M., & Hrzic, R.',
      year: '2025',
      link: '#',
    },
    {
      role: 'In Preparation',
      title:
        'Sleep Duration and Sleep Breaks as Predictors of Incident Depressive Symptoms: A Longitudinal Analysis of Objectively Measured Sleep in The Maastricht Study',
      venue: 'Target: Sleep Health',
      year: '2025',
      link: '#',
    },
    {
      role: 'Poster Presentation',
      title:
        'Sleep Duration and Sleep Breaks as Predictors of Incident Depressive Symptoms',
      venue: 'European Conference on Mental Health (ECMH), Antwerp',
      year: '2025',
      link: '#',
    },
    {
      role: 'Conference Paper',
      title: 'Psychological Aid in Humanitarian Response to Natural Crisis',
      venue: '1st Int. Conf. Psychology & Social Sciences, Babol',
      year: '2022',
      link: 'https://civilica.com/doc/1698998',
    },
  ];

  const education = [
    {
      degree: 'MSc European Public Health (Europubhealth+)',
      schools: 'Maastricht University (current) & UCD (completed)',
      years: '2023–2025',
      highlight: 'Erasmus Mundus Scholar (top 1% worldwide) • First-Class Honours',
    },
    {
      degree: 'BSc Psychology',
      schools: 'Payam Noor University',
      years: '2017–2022',
      highlight: 'First-Class Honours (17.44/20)',
    },
    {
      degree: 'Computer Science Foundation',
      schools: 'Sharif University of Technology & University of Gothenburg',
      years: '2008–2013',
      highlight: 'Software Engineering & Management track',
    },
  ];

  const certifications = [
    'Data Science R Certificate - Johns Hopkins',
    'AI for Medicine - Stanford (2025)',
    'Qualitative Research Methods - Emory',
    'AWS ML Certification (in progress)',
  ];

  const researchInterests = [
    'Digital phenotyping',
    'Predictive psychiatry',
    'Sleep-mood dynamics',
    'ML for mental health',
    'Explainable AI in healthcare',
    'Longitudinal data analysis',
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
              Tech Lead at Sendent B.V. building data governance solutions.
              PhD Candidate at Maastricht University researching sleep-depression relationships.
              5+ years software development, 4+ years research. Erasmus Mundus Scholar.
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Also published as: M. Mirkialangaroodi •{' '}
              <a href="#" className="underline hover:text-emerald-600">About variations</a>
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#current-roles"
                className="rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-emerald-700 hover:to-teal-700"
              >
                Current roles
              </a>
              <a
                href="#projects"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/50"
              >
                View projects
              </a>
            </div>

            {/* Track toggle */}
            <div className="mt-6">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quick skills overview
              </span>
              <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                <button onClick={() => setTrack('phd')} className={chip(track === 'phd')}>Research</button>
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
            <h2 className="text-3xl font-black sm:text-4xl">Research-driven engineering. Engineering-informed research.</h2>
            <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
              Software Engineer & PhD Researcher • Tech Lead at Sendent B.V. • Doctoral Candidate at Maastricht University •
              Erasmus Mundus Scholar
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#research"
                className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Research
              </a>
              <a
                href="#projects"
                className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/50"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/50"
              >
                Contact
              </a>
            </div>
          </section>

          {/* Current Roles */}
          <section id="current-roles">
            <h3 className="text-2xl font-bold">Current</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Tech Lead</h4>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">Sendent B.V.</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  December 2025 – Present · Netherlands
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Developing compliance and data governance solutions for enterprise environments, with focus on data sovereignty, security, and GDPR compliance.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">PhD Candidate</h4>
                    <p className="text-sm text-amber-600 dark:text-amber-400">Maastricht University</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  January 2026 – 2030 · CAPHRI Institute
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Researching the multidimensional relationships between objectively measured sleep characteristics and depressive symptoms using longitudinal data from The Maastricht Study.
                </p>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <p>Supervisors: Dr. Annemarie Koster & Dr. Ree Meertens</p>
                  <p>Department of Social Medicine · Health Inequities and Societal Participation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Personal metrics bar */}
          <MetricsBar items={personalMetrics} className="mt-2" size="md" />

          {/* Projects */}
          <section id="projects">
            <h3 className="text-2xl font-bold">Selected projects</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Academic research and technical implementations
            </p>
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
                            <span aria-hidden="true">✅</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Primary + secondary links */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {p.primary && (
                        <a
                          href={p.primary.href}
                          className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                          {...(p.primary.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          aria-label={`${p.title}: ${p.primary.label}`}
                          title={`${p.title}: ${p.primary.label}`}
                        >
                          {p.primary.label}
                          <svg viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4" aria-hidden="true">
                            <path d="M11 3h6v6h-2V6.414l-7.293 7.293-1.414-1.414L13.586 5H11V3z" />
                            <path d="M5 5h4v2H7v6h6v-2h2v4H5V5z" />
                          </svg>
                        </a>
                      )}
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

                    {/* Project-specific metrics */}
                    {p.metrics && <MetricsBar items={p.metrics} className="mt-4" size="sm" />}

                    {p.note && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{p.note}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Publications / Research */}
          <section id="research" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-2xl font-bold">Research</h3>
            <div className="mt-4 space-y-4">
              {publications.map((pub) => (
                <div key={pub.title} className="border-l-2 border-emerald-500 pl-4">
                  <h4 className="text-sm font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-400">[{pub.role}]</span> {pub.title}
                  </h4>
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

          {/* Certifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-xl font-bold">Certifications & Training</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert} className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {cert}
                </span>
              ))}
            </div>
          </section>

          {/* Research Interests */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-xl font-bold">Research interests</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <span key={interest} className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="mb-2 text-center text-xl font-semibold">Get in touch</h3>
              <p className="mb-6 text-center text-sm text-slate-600 dark:text-slate-300">
                For professional inquiries or research collaboration
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="mailto:mirkia.mehdi@gmail.com" className="rounded-md bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
                  Email
                </a>
                <a href="https://www.linkedin.com/in/mirkia" target="_blank" rel="noopener noreferrer" className="rounded-md border border-slate-300 px-6 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/40">
                  LinkedIn
                </a>
                <a href="https://github.com/mehdimkia" target="_blank" rel="noopener noreferrer" className="rounded-md border border-slate-300 px-6 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/40">
                  GitHub
                </a>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            © {new Date().getFullYear()} Mehdi Mirkia · Limburg, Netherlands
          </footer>
        </div>
      </div>
    </main>
  );
}
