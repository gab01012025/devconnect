import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";
import {
  Github,
  Linkedin,
  Code2,
  Users,
  Zap,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";


/* ---------------- Layout ---------------- */
function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section {...props} className={`py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

/* ---------------- Navbar---------------- */
function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              DevConnect
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
            <a
              href="#features"
              className="hover:text-zinc-900 dark:hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="hover:text-zinc-900 dark:hover:text-white transition"
            >
              Showcase
            </a>
            <a
              href="#stats"
              className="hover:text-zinc-900 dark:hover:text-white transition"
            >
              Stats
            </a>
            <a
              href="#cta"
              className="hover:text-zinc-900 dark:hover:text-white transition"
            >
              Get started
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gab01012025"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-transparent via-zinc-50/60 dark:via-zinc-900/40 to-transparent">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              The social network for modern developers
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Build a stunning profile, share bite-size posts, showcase projects
              and stats — with a premium UI, dark mode and silky animations.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-5 py-3 text-sm font-semibold shadow hover:shadow-md transition"
              >
                <Zap className="h-4 w-4" />
                Launch App (demo)
              </a>
              <a
                href="https://www.linkedin.com/in/gabrielgomesbarreto"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300/60 dark:border-zinc-700/60 px-5 py-3 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              *This is a portfolio project that demonstrates a real app UX.
              Sign-in, feed, profiles and dashboard come next.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative"
          >
            {/* Glass card mockup */}
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 backdrop-blur p-6 shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-200/70 dark:border-zinc-800/70">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    @gabriel
                  </p>
                  <p className="text-xs text-zinc-500">
                    Frontend • React • Tailwind
                  </p>
                </div>
                <button className="rounded-xl border px-3 py-1.5 text-xs font-medium border-zinc-300/60 dark:border-zinc-700/60 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                  Follow
                </button>
              </div>

              <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="py-4">
                    <p className="text-sm text-zinc-800 dark:text-zinc-100">
                      🚀 Shipped <span className="font-semibold">DevConnect</span>{" "}
                      landing — dark mode, motion, glassmorphism. Next: auth +
                      feed.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="text-xs text-zinc-500">#react</span>
                      <span className="text-xs text-zinc-500">#tailwind</span>
                      <span className="text-xs text-zinc-500">#portfolio</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Trust bar ---------------- */
function TrustBar() {
  const logos = [Code2, Users, LineChart, ShieldCheck];
  return (
    <Section className="py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-80">
          {logos.map((Icon, idx) => (
            <Icon
              key={idx}
              className="h-6 w-6 sm:h-7 sm:w-7 text-zinc-600 dark:text-zinc-400"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Features ---------------- */
const features = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Profiles that shine",
    desc: "Custom avatars, bio, tech stack, and social links. Built for recruiters to grasp your value fast.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Smooth micro-interactions",
    desc: "Framer Motion transitions, hover effects and toasts for a premium, app-like feel.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Project analytics",
    desc: "Dashboards with charts to visualize engagement, posts, and followers over time.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Auth ready",
    desc: "JWT / Firebase Auth scaffolding to plug in real sign-in and protected routes.",
  },
];

function Features() {
  return (
    <Section id="features" className="bg-zinc-50/60 dark:bg-zinc-900/40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Beautiful. Fast. Recruiter-ready.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-6 shadow-sm hover:shadow-md transition-all backdrop-blur"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Showcase ---------------- */
function Showcase() {
  const items = [
    {
      title: "Secret Word Game",
      desc: "A guessing game built with React hooks and clean state management.",
      href: "https://github.com/gab01012025/secret-word-game",
      tags: ["React", "Hooks", "Game"],
    },
    {
      title: "Mini Blog",
      desc: "Markdown posts, routing, and a sleek reading experience.",
      href: "https://github.com/gab01012025",
      tags: ["React", "Router", "Markdown"],
    },
    {
      title: "Task Manager Fullstack",
      desc: "Auth, CRUD, and a modern UI — Node/Express + MongoDB backend.",
      href: "https://github.com/gab01012025/task-manager-fullstack",
      tags: ["Fullstack", "Express", "MongoDB"],
    },
  ];

  return (
    <Section id="showcase">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Project showcase
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Curated highlights with clean cards, hover motion and quick links.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, idx) => (
            <motion.a
              key={idx}
              href={p.href}
              target="_blank"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group block rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-6 shadow-sm hover:shadow-md transition-all backdrop-blur"
            >
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-emerald-400/15 group-hover:from-indigo-500/25 group-hover:via-fuchsia-500/25 group-hover:to-emerald-400/25 transition" />
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {p.desc}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-lg bg-zinc-100 dark:bg-zinc-900 px-2 py-1 text-zinc-600 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Stats ---------------- */
function Stats() {
  const stats = [
    { value: "<50ms", label: "Page transitions" },
    { value: "A11y", label: "Accessible UI" },
    { value: "100%", label: "Responsive" },
    { value: "Type-safe", label: "TS everywhere" },
  ];
  return (
    <Section id="stats" className="bg-zinc-50/60 dark:bg-zinc-900/40">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-6 text-center shadow-sm"
            >
              <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <Section id="cta" className="relative">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-400/10 dark:from-indigo-500/15 dark:via-fuchsia-500/15 dark:to-emerald-400/15 p-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Ready for the real app? Auth + Feed + Dashboard next.
              </h3>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                We will ship protected routes, JWT/Firebase auth, posts,
                comments, and a stats dashboard. All open-source.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-5 py-3 text-sm font-semibold shadow hover:shadow-md transition"
              >
                <Zap className="h-4 w-4" />
                View roadmap
              </a>
              <a
                href="https://github.com/gab01012025"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300/60 dark:border-zinc-700/60 px-5 py-3 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 dark:border-zinc-800/70 py-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} DevConnect. Built with React, Tailwind
            & Motion.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/gab01012025"
              target="_blank"
              className="hover:text-zinc-800 dark:hover:text-zinc-300 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gabrielgomesbarreto"
              target="_blank"
              className="hover:text-zinc-800 dark:hover:text-zinc-300 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Showcase />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
