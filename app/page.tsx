"use client";

import { useState } from "react";

type Track = "phd" | "eng";

type Metric = { value: string; label: string; tooltip?: string };

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { href: string; label: string; external?: boolean }[];
  note?: string;
  metrics?: Metric[]; // project-specific metrics
};

/* ---------- Reusable metrics bar (with size + info icon tooltip) ---------- */
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
                  {/* the trigger */}
                  <button
                    type="button"
                    aria-label={`About ${m.label}`}
                    className="peer inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700 cursor-help focus-visible:outline-none focus-visible:ring focus-visible:ring-amber-400/60 dark:bg-slate-700 dark:text-slate-100"
                    tabIndex={0}
                  >
                    i
                  </button>
                  {/* the tooltip */}
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

  // Quick-scan skills for two audiences
  const skills: Record<Track, string[]> = {
    phd: [
      "🔬 Longitudinal cohort analysis (N>8000)",
      "📊 Survival analysis (Cox PH, Fine-Gray)",
      "🧠 Mental health epidemiology",
      "📝 Published author & peer reviewer",
      "🔄 Open science (Git, Docker, R Markdown)",
    ],
    eng: [
      "🚀 Production ML (FastAPI, Docker, CI/CD)",
      "💻 Full-stack (Next.js, TypeScript, PostgreSQL)",
      "🤖 ML (XGBoost, SHAP, MLflow)",
      "☁️ Cloud deployment (AWS, Vercel)",
      "🔎 Monitoring & logging (basic)",
    ],
  };

  /* ---------- Personal metrics (under hero) ---------- */
  const personalMetrics: Metric[] = [
    { value: "2", label: "Publications", tooltip: "Peer-reviewed or equivalent; update as needed." },
    { value: "7+ yrs", label: "Psychiatric epidemiology", tooltip: "Experience across research/clinical contexts." },
    { value: "2", label: "Master’s degrees", tooltip: "Double MSc (Maastricht & Sheffield)." },
    { value: "3+", label: "Projects shipped", tooltip: "Public demos/dashboards released." },
  ];

  /* ---------- Deprisk project metrics ---------- */
  const depriskMetrics: Metric[] = [
    { value: "0.71", label: "AUROC", tooltip: "Area under the ROC curve on held-out cohort." },
    { value: "8,000+", label: "Participants", tooltip: "Sample size from The Maastricht Study subset." },
    { value: "7 years", label: "Follow-up", tooltip: "Longitudinal observation horizon." },
  ];

  const projects: Project[] = [
    {
      title: "Maastricht Deprisk – incident depression predictor",
      blurb:
        "End-to-end ML pipeline with FastAPI inference and a public Next.js demo. XGBoost + SHAP; AUROC ≈ 0.71 on a held-out cohort of 8,000+ participants.",
      tags: ["XGBoost", "FastAPI", "Next.js", "SHAP", "CI/CD"],
      links: [
        { href: "https://github.com/mehdimkia/maastrichtDeprisk", label: "Source", external: true },
        { href: "https://deprisk-demo.vercel.app", label: "Live demo", external: true },
        { href: "/projects/deprisk", label: "Case study" },
      ],
      note: "Research prototype for educational purposes — not medical advice and not a clinical tool.",
      metrics: depriskMetrics,
    },
    {
      title: "Sleep ↔ Depression (Thesis, The Maastricht Study)",
      blurb:
        "Seven-year longitudinal analysis of sleep duration & fragmentation predicting depressive symptoms.",
      tags: ["Cohort study", "Cox PH", "Restricted splines", "R"],
      links: [{ href: "/files/thesis.pdf", label: "PDF" }],
    },
    {
      title: "Cohort Insights dashboard",
      blurb:
        "Interactive Power BI dashboard with cohort characteristics and model performance summaries.",
      tags: ["Power BI", "Data viz", "ETL"],
      links: [{ href: "/powerbi", label: "Preview" }],
    },
  ];

  const publications = [
    {
      role: "First Author",
      title:
        "Sleep duration and fragmentation in relation to incident depression: A 7-year cohort study",
      venue: "Journal of Psychiatric Research",
      year: "2024",
      link: "#",
    },
    {
      role: "Translator",
      title: "Mental Health Assessment Tools: A Practical Guide",
      venue: "Book (Persian → English)",
      year: "2019",
      link: "#",
    },
  ];

  const education = [
    {
      degree: "Double MSc European Public Health",
      schools: "Maastricht University & Sheffield University",
      years: "2022–2024",
      highlight: "Thesis: Sleep-Depression Longitudinal Analysis",
    },
    {
      degree: "MSc Clinical Psychology",
      schools: "University of Tehran",
      years: "2015–2018",
      highlight: "Licensed Psychotherapist",
    },
    {
      degree: "BSc Software Engineering",
      schools: "Mälardalen University, Sweden",
      years: "2010–2014",
      highlight: "Focus: Data Structures & Algorithms",
    },
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
                <p className="text-sm text-slate-600 dark:text-slate-300">ML Engineer × Public Health</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Building interpretable ML models for mental health. Psychotherapist turned data scientist with 7+ years in psychiatric epidemiology.
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Also published as: Max Mirkia • M. Mirkialangaroodi •{" "}
              <a href="/about-my-name" className="underline hover:text-emerald-600">Why different names?</a>
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://deprisk-demo.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-emerald-700 hover:to-teal-700"
              >
                Try live demo
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
              <a href="mailto:mehdimirkia@gmail.com" className="text-sm underline-offset-2 hover:underline hover:text-emerald-600">
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
          {/* HERO — landing page */}
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-amber-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:via-amber-900/10 dark:to-slate-950">
            <h2 className="text-3xl font-black sm:text-4xl">
              Building useful models & shipping working demos.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
              ML Engineer & Public Health Researcher • 7 years in psychiatric epidemiology • Published author • Double MSc European Public Health
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
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Real work, shipped.</p>
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

                    {/* Project-specific metrics (smaller) */}
                    {p.metrics && <MetricsBar items={p.metrics} className="mt-4" size="sm" />}

                    {p.note && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{p.note}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section id="publications" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-2xl font-bold">Publications</h3>
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
                  <h4 className="flex items-center gap-2 font-semibold">💼 For Tech Teams</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Looking for ML Engineer or full-stack roles</p>
                  <div className="mt-3 space-y-2">
                    <a href="/files/CV_Tech_Mehdi_Mirkia.pdf" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Download Tech CV (PDF)
                    </a>
                    <a href="https://calendly.com/mehdimirkia/tech" target="_blank" rel="noopener noreferrer" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Schedule tech interview
                    </a>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h4 className="flex items-center gap-2 font-semibold">🎓 For Research Groups</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Open to PhD supervision & collaborations</p>
                  <div className="mt-3 space-y-2">
                    <a href="/files/CV_Academic_Mehdi_Mirkia.pdf" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                      → Download Academic CV (PDF)
                    </a>
                    <a href="/files/research_statement.pdf" className="block text-sm text-emerald-600 hover:underline dark:text-emerald-400">
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
            © {new Date().getFullYear()} Mehdi Mirkia · Rotterdam, Netherlands
          </footer>
        </div>
      </div>
    </main>
  );
}
