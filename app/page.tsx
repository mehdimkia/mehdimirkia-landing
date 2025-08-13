"use client";

import Link from "next/link";
import { useState } from "react";

type Track = "phd" | "eng";

export default function HomePage() {
  const [track, setTrack] = useState<Track>("phd");

  const skills: Record<Track, string[]> = {
    phd: [
      "Psychiatric epidemiology",
      "Sleep & circadian health",
      "Longitudinal methods (Cox, splines)",
      "Reproducible research (R/Python)",
      "Scientific writing & peer review",
    ],
    eng: [
      "Python • TypeScript",
      "FastAPI • Next.js",
      "XGBoost/LightGBM • SHAP",
      "Docker • CI/CD (GitHub Actions)",
      "AWS basics (ECR/ECS/Vercel)",
    ],
  };

  const projects = [
    {
      title: "Maastricht Deprisk — incident depression predictor",
      blurb:
        "End-to-end ML pipeline with FastAPI inference and a public Next.js demo. XGBoost + SHAP; AUROC≈0.71 on held-out cohort.",
      tags: ["XGBoost", "FastAPI", "Next.js", "SHAP", "CI/CD"],
      links: [
        { href: "https://github.com/mehdimkia/maastrichtDeprisk", label: "Source" },
        { href: "/projects/deprisk", label: "Case study" },
      ],
    },
    {
      title: "Sleep ↔ Depression (Thesis, The Maastricht Study)",
      blurb:
        "Seven-year longitudinal analysis of sleep duration & fragmentation predicting depressive symptoms.",
      tags: ["Cohort study", "Cox PH", "Restricted splines", "R"],
      links: [{ href: "/files/thesis.pdf", label: "PDF" }],
    },
    {
      title: "Cohort Insights dashboard (WIP)",
      blurb:
        "Interactive Power BI dashboard with cohort characteristics and model performance summaries.",
      tags: ["Power BI", "Data viz"],
      links: [{ href: "/powerbi", label: "Preview" }],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 p-6 lg:grid-cols-[320px_1fr]">
        {/* === LEFT STICKY SIDEBAR === */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white">
                MM
              </div>
              <div>
                <h1 className="text-xl font-extrabold">Mehdi Mirkia</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Public Health × AI
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              I build transparent models and clean software at the intersection of sleep epidemiology
              and machine learning.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                View projects
              </a>
              <a
                href="/files/CV_Mehdi_Mirkia.pdf"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/50"
              >
                Download CV
              </a>
            </div>

            {/* Track toggle */}
            <div className="mt-6">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recruiter quick-scan
              </span>
              <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => setTrack("phd")}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    track === "phd" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : ""
                  }`}
                >
                  PhD
                </button>
                <button
                  onClick={() => setTrack("eng")}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    track === "eng" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : ""
                  }`}
                >
                  Engineering
                </button>
              </div>

              <ul className="mt-3 space-y-2">
                {skills[track].map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              <a
                href="mailto:mehdimirkia@gmail.com"
                className="text-sm underline-offset-2 hover:underline"
              >
                Email
              </a>
              <a href="https://github.com/mehdimkia" className="text-sm underline-offset-2 hover:underline">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mehdimirkia"
                className="text-sm underline-offset-2 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </aside>

        {/* === RIGHT CONTENT === */}
        <div className="space-y-12">
          {/* Hero headline (left-aligned, simpler) */}
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
            <h2 className="text-3xl font-black sm:text-4xl">
              Building useful models & shipping working demos.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
              Portfolio focused on depression risk modeling, sleep epidemiology, and modern ML
              engineering practices.
            </p>
          </section>

          {/* Projects */}
          <section id="projects">
            <h3 className="text-2xl font-bold">Projects</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Real work, shipped.
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
                    </h4>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{p.blurb}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
                        >
                          {l.label} →
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* About */}
          <section id="about" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-2xl font-bold">About</h3>
            <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
              Psychotherapist & public-health specialist turned ML practitioner. Recent double master’s in
              European Public Health. I focus on interpretable models, clean data pipelines, and practical
              demos. Open to PhD supervision, research collaborations, and ML/AI engineering roles.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="pb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-xl font-semibold">Let’s talk</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Email or message me for collaborations or roles.
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href="mailto:mehdimirkia@gmail.com"
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Email me
                </a>
                <a
                  href="https://www.linkedin.com/in/mehdimirkia"
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/40"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            © {new Date().getFullYear()} Mehdi Mirkia · Portfolio
          </footer>
        </div>
      </div>
    </main>
  );
}
