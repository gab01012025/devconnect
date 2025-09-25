// ===== Install =====
// npm i recharts

// ===== src/pages/Dashboard.tsx =====
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts'

export default function Dashboard() {
  const statCards = [
    { label: 'Posts', value: 18 },
    { label: 'Followers', value: 127 },
    { label: 'Likes', value: 842 },
    { label: 'Projects', value: 6 },
  ]

  const series = useMemo(
    () => [
      { day: 'Mon', posts: 1, likes: 20, comments: 2 },
      { day: 'Tue', posts: 2, likes: 38, comments: 5 },
      { day: 'Wed', posts: 3, likes: 56, comments: 6 },
      { day: 'Thu', posts: 2, likes: 41, comments: 4 },
      { day: 'Fri', posts: 4, likes: 72, comments: 9 },
      { day: 'Sat', posts: 5, likes: 85, comments: 11 },
      { day: 'Sun', posts: 1, likes: 19, comments: 3 },
    ],
    [],
  )

  const isDark =
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const grid = isDark ? '#27272a' : '#e4e4e7'
  const axis = isDark ? '#a1a1aa' : '#52525b'
  const linePrimary = isDark ? '#a78bfa' : '#6d28d9' // violet
  const barPrimary = isDark ? '#34d399' : '#10b981' // emerald

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Métricas visuais do seu perfil e atividades.
        </p>

        {/* KPI cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-6 text-center shadow-sm"
            >
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-4 sm:p-6">
            <h3 className="text-lg font-semibold">Posts por dia (semana)</h3>
            <div className="mt-3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={grid} strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke={axis} tickLine={false} axisLine={false} />
                  <YAxis stroke={axis} tickLine={false} axisLine={false} width={30} />
                  <Tooltip
                    contentStyle={{ background: isDark ? '#0a0a0a' : '#fff', border: `1px solid ${grid}` }}
                    labelStyle={{ color: axis }}
                  />
                  <Line type="monotone" dataKey="posts" stroke={linePrimary} strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-4 sm:p-6">
            <h3 className="text-lg font-semibold">Likes por dia (semana)</h3>
            <div className="mt-3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={grid} strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke={axis} tickLine={false} axisLine={false} />
                  <YAxis stroke={axis} tickLine={false} axisLine={false} width={30} />
                  <Tooltip
                    contentStyle={{ background: isDark ? '#0a0a0a' : '#fff', border: `1px solid ${grid}` }}
                    labelStyle={{ color: axis }}
                  />
                  <Bar dataKey="likes" fill={barPrimary} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
