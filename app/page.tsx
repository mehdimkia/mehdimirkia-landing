'use client';

import React, { useState } from 'react';

type Track = "phd" | "eng";

type Metric = { value: string; label: string; tooltip?: string };

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { href: string; label: string; external?: boolean }[];
  note?: string;
  metrics?: Metric[];
};

/* ---------- Reusable metrics bar component ---------- */
function MetricsBar({
  items,
  className = "",
  size = "md",
}: {
  items: Metric[];
  className?: string;
  size?: "sm" | "md";
}) {
  const cols =
    items.length === 2
      ? "md:grid-cols-2"
      : items.length === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  const pad = size === "sm" ? "p-3" : "p-4";
  const gap = size === "sm" ? "gap-3" : "gap-4";
  const value = size === "sm" ? "text-xl font-extrabold" : "text-2xl font-bold";
  const label = size === "sm" ? "text-[11px]" : "text-xs";

  return (
    <div className={`grid grid-cols-2 ${cols} ${gap} ${className}`}>
      {items.map((m) => (
        <div key={m.label} className="rounded-xl border border-slate-200 bg-white/50 text-center dark:border-slate-800">
          <div className={`${pad}`}>
            <div className={`${value} text-emerald-600`}>{m.value}</div>
            <div className={`${label} mx-auto mt-0.5 flex items-center justify-center gap-1 text-slate-600 dark:text-slate-400`}>
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
  const [track, setTrack] = useState<Track>("phd");

  // Updated skills based on actual experience
  const skills: Record<Track, string[]> = {
    phd: [
      "📊 Longitudinal cohort analysis (N=9,000+)",
      "📈 Cox PH & survival analysis with splines",
      "🧠 Mental health epidemiology & RCT analysis",
      "📝 Manuscript in preparation for peer review",
      "🔬 R, Python, REDCap, Git version control",
    ],
    eng: [
      "🚀 FastAPI + Docker deployment (in progress)",
      "💻 Full-stack (React, Next.js, TypeScript)",
      "🤖 ML (XGBoost, AUROC 0.71, SHAP)",
      "☁️ AWS Elastic Beanstalk, Vercel, CI/CD",
      "📊 Power BI dashboards & data viz",
    ],
  };

  /* ---------- Personal metrics (corrected) ---------- */
  const personalMetrics: Metric[] = [
    { value: "9,000+", label: "Cohort analyzed", tooltip: "The Maastricht Study participants" },
    { value: "5+ yrs", label: "Software dev", tooltip: "Full-stack development experience" },
    { value: "0.71", label: "AUROC achieved", tooltip: "Depression prediction model performance" },
    { value: "2", label: "Master's degrees", tooltip: "MPH (UCD) + MSc Public Health (Maastricht, ongoing)" },
  ];

  /* ---------- Deprisk project metrics (corrected) ---------- */
  const depriskMetrics: Metric[] = [
    { value: "0.71", label: "AUROC", tooltip: "Area under the ROC curve on held-out cohort" },
    { value: "9,000+", label: "Participants", tooltip: "Sample size from The Maastricht Study" },
    { value: "7 years", label: "Follow-up", tooltip: "Longitudinal observation horizon" },
  ];

  const projects: Project[] = [
    {
      title: "Maastricht Deprisk – ML Depression Risk Predictor",
      blurb:
        "End-to-end ML pipeline with FastAPI backend (deployment in progress). XGBoost model achieving AUROC 0.71 on 9,000+ participant cohort from The Maastricht Study.",
      tags: ["XGBoost", "FastAPI", "Docker", "SHAP", "CI/CD"],
      links: [
        { href: "https://github.com/mehdimkia/maastrichtDeprisk", label: "GitHub", external: true },
        { href: "#", label: "Demo (coming soon)" },
      ],
      note: "Research prototype for educational purposes – not for clinical use",
      metrics: depriskMetrics,
    },
    {
      title: "Social Platform – Khaterak",
      blurb:
        "Co-founded and developed social app serving 10,000+ MAU. Built scalable backend with OAuth authentication and optimized performance by 40%.",
      tags: ["PHP", "Python", "OAuth", "PostgreSQL", "Agile"],
      links: [],
      note: "2015-2017: Full-stack development & system architecture",
    },
    {
      title: "Sleep ↔ Depression Longitudinal Analysis (Thesis)",
      blurb:
        "Seven-year cohort study using Cox PH models with restricted cubic splines to capture non-linear effects of sleep duration on depression risk. Manuscript in preparation.",
      tags: ["Cox PH", "R", "Survival Analysis", "Splines"],
      links: [],
    },
    {
      title: "Cohort Insights Dashboard",
      blurb:
        "Interactive Power BI dashboard visualizing cohort characteristics and ML model performance metrics for The Maastricht Study.",
      tags: ["Power BI", "Data Viz", "ETL"],
      links: [],
    },
  ];

  const publications = [
    {
      role: "In Preparation",
      title:
        "Sleep Duration and Sleep Fragmentation as Predictors of Incident Depressive Symptoms",
      venue: "Target: Journal of Sleep Health",
      year: "2025",
      link: "#",
    },
    {
      role: "Conference Paper",
      title: "Psychological Aid in Humanitarian Response to Natural Crisis",
      venue: "1st Int. Conf. Psychology & Social Sciences, Babol",
      year: "2022",
      link: "https://civilica.com/doc/1698998",
    },
    {
      role: "Invited Talk",
      title: "New Concepts of Schema Therapy",
      venue: "ASLATES Conference, Mexico City",
      year: "2021",
      link: "#",
    },
  ];

  const education = [
    {
      degree: "MSc European Public Health (Europubhealth+)",
      schools: "Maastricht University (current) & UCD (completed)",
      years: "2023–2025",
      highlight: "Erasmus Mundus Scholar (top 1% worldwide) • First-Class Honours",
    },
    {
      degree: "BSc Psychology",
      schools: "Payam Noor University",
      years: "2017–2022",
      highlight: "First-Class Honours (17.44/20)",
    },
    {
      degree: "Computer Science Foundation",
      schools: "Sharif University of Technology & University of Gothenburg",
      years: "2008–2013",
      highlight: "Software Engineering & Management track",
    },
  ];

  const certifications = [
    "Data Science R Certificate - Johns Hopkins",
    "AI for Medicine - Stanford (2025)",
    "Qualitative Research Methods - Emory",
    "AWS ML Certification (in progress)",
  ];

  const researchInterests = [
    "Digital phenotyping",
    "Predictive psychiatry",
    "Sleep-mood dynamics",
    "ML for mental health",
    "Explainable AI in healthcare",
    "Longitudinal data analysis",
  ];

  const chip = (active: boolean) =>
    `px-3 py-1 text-xs font-medium rounded-full transition ${
      active
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-amber-300/70 dark:bg-emerald-900/30 dark:text-emerald-300"
        : ""
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
                <p className="text-sm text-slate-600 dark:text-slate-300">ML Engineer × Full Stack Dev</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Building interpretable ML models for healthcare. 5+ years software development, 4+ years research experience. Erasmus Mundus Scholar developing production-ready predictive systems.
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Also published as: M. Mirkialangaroodi •{" "}
              <a href="#" className="underline hover:text-emerald-600">About variations</a>
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://github.com/mehdimkia/maastrichtDeprisk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-emerald-700 hover:to-teal-700"
              >
                View on GitHub
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
                <button onClick={() => setTrack("phd")} className={chip(track === "phd")}>
                  Research
                </button>
                <button onClick={() => setTrack("eng")} className={chip(track === "eng")}>
                  Engineering
                </button>
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
              <a href="https://www.linkedin.com/in/mehdimirkia" target="_blank" rel="noopener noreferrer" className="text-sm underline-offset-2 hover:underline hover:text-emerald-600">
                LinkedIn
              </a>
            </div>
          </section>
        </aside>

        {/* === RIGHT CONTENT === */}
        <div className="space-y-12">
          {/* HERO */}
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-amber-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:via-amber-900/10 dark:to-slate-950">
            <h2 className="text-3xl font-black sm:text-4xl">
              From research to production: ML models that work.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
              ML Engineer & Public Health Researcher • 5+ years software development • 4+ years research experience • Erasmus Mundus Scholar • Building predictive models for mental health
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">🇳🇱 Netherlands-based</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">Open to remote</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">PhD-ready</span>
            </div>
          </section>

          {/* Personal metrics bar */}
          <MetricsBar items={personalMetrics} className="mt-2" size="md" />

          {/* Projects */}
          <section id="projects">
            <h3 className="text-2xl font-bold">Featured projects</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Production-ready systems & research implementations</p>
            <div className="mt-6 space-y-5">
              {projects.map((p) => (
                <article key={p.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="border-l-4 border-emerald-500 p-5 sm:p-6">
                    <h4 className="text-lg font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300">{p.title}</h4>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{p.blurb}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {p.links.map((l) => (
                          <a
                            key={l.href + l.label}
                            href={l.href}
                            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
                            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {l.label} →
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Project-specific metrics */}
                    {p.metrics && <MetricsBar items={p.metrics} className="mt-4" size="sm" />}

                    {p.note && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{p.note}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section id="publications" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-2xl font-bold">Publications & Presentations</h3>
            <div className="mt-4 space-y-4">
              {publications.map((pub) => (
                <div key={pub.title} className="border-l-2 border-emerald-500 pl-4">
                  <h4 className="text-sm font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-400">[{pub.role}]</span> {pub.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {pub.venue} • {pub.year}
                  </p>
                  {pub.link !== "#" && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline dark:text-emerald-400">
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

          {/* Contact - differentiated CTAs */}
          <section id="contact" className="pb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="mb-6 text-center text-xl font-semibold">Let&apos;s connect</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h4 className="flex items-center gap-2 font-semibold">💻 For Tech Teams</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">ML Engineer / Full-stack roles</p>
                  <div className="mt-3 space-y-2">
                    <a href="#" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Download ML/Data Science CV
                    </a>
                    <a href="#" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Download Software Dev CV
                    </a>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h4 className="flex items-center gap-2 font-semibold">🎓 For Research Groups</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">PhD positions & collaborations</p>
                  <div className="mt-3 space-y-2">
                    <a href="#" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Download Academic CV
                    </a>
                    <a href="#" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Research statement
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a href="mailto:mehdimirkia@gmail.com" className="rounded-md bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
                  Email me directly
                </a>
                <a href="https://www.linkedin.com/in/mehdimirkia" target="_blank" rel="noopener noreferrer" className="rounded-md border border-slate-300 px-6 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/40">
                  Message on LinkedIn
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