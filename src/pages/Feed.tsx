// ===== src/pages/Feed.tsx =====
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Heart, MessageSquare } from 'lucide-react'

// --- Types ---
type Post = {
  id: number
  author: string
  text: string
  tags: string[]
  likes: number
  liked: boolean
  createdAt: number
}

// --- Helpers ---
const STORAGE_KEY = 'dc_posts'

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.warn('DevConnect: erro ao ler posts do localStorage', err)
  }
  // seed
  return [
    { id: 3, author: 'gabriel', text: 'Shipping DevConnect feed with motion and likes. Next: comments.', tags: ['react','tailwind','motion'], likes: 6, liked: false, createdAt: Date.now() - 1000*60*60*3 },
    { id: 2, author: 'gabriel', text: 'Landing done — glassmorphism, dark mode, and showcase. Routing in!', tags: ['ui','landing','router'], likes: 12, liked: false, createdAt: Date.now() - 1000*60*60*24 },
    { id: 1, author: 'gabriel', text: 'Kicking off DevConnect: a social app for devs to wow recruiters.', tags: ['portfolio','react','tailwind'], likes: 20, liked: false, createdAt: Date.now() - 1000*60*60*48 },
  ]
}


function savePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  const d = Math.floor(h / 24)
  return `${d}d`
}

// --- Toast (local to Feed) ---
function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed right-4 top-4 z-[60] rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-4 py-2 shadow"
    >
      <span className="text-sm">{message}</span>
    </motion.div>
  )
}

// --- Modal ---
function Modal({ open, onClose, onSubmit }: {
  open: boolean
  onClose: () => void
  onSubmit: (text: string, tags: string[]) => void
}) {
  const [text, setText] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    if (open) { setText(''); setTagsInput('') }
  }, [open])

  if (!open) return null

  const handleSubmit = () => {
    const body = text.trim()
    if (body.length < 3) return
    const tags = Array.from(new Set(tagsInput
      .split(/[#,\s]+/)
      .map(t => t.trim())
      .filter(Boolean)
      .slice(0, 5)
    ))
    onSubmit(body, tags)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="relative w-[min(92vw,560px)] rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">New Post</h3>
          <button onClick={onClose} className="rounded-lg border border-zinc-300/60 dark:border-zinc-700/60 p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">
          <textarea
            autoFocus
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Share something awesome you built..."
            className="min-h-[120px] w-full rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-transparent p-3 outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          />
          <input
            value={tagsInput}
            onChange={(e)=>setTagsInput(e.target.value)}
            placeholder="#react #tailwind #portfolio"
            className="mt-3 w-full rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 bg-transparent p-3 outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Cancel</button>
          <button onClick={handleSubmit} className="rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-sm font-semibold">Publish</button>
        </div>
      </motion.div>
    </div>
  )
}

export default function Feed(){
  const [posts, setPosts] = useState<Post[]>(() => loadPosts())
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(()=>{ savePosts(posts) }, [posts])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(()=> setToast(null), 2000)
  }

  const createPost = (text: string, tags: string[]) => {
    const next: Post = {
      id: Date.now(),
      author: 'gabriel',
      text,
      tags,
      likes: 0,
      liked: false,
      createdAt: Date.now(),
    }
    setPosts(prev => [next, ...prev])
    showToast('Post published!')
  }

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1 } : p
    ))
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Feed</h1>
            <p className="text-zinc-500 mt-1">Protected route (login mock no topo).</p>
          </div>
          <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-sm font-semibold shadow hover:shadow-md">
            <Plus className="h-4 w-4"/> New Post
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          {posts.map((p,i)=> (
            <motion.div key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3, delay: i*0.03}} className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-500">@{p.author}</div>
                <div className="text-xs text-zinc-400">{timeAgo(p.createdAt)}</div>
              </div>
              <div className="mt-1 text-[15px] leading-relaxed">{p.text}</div>
              {p.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="text-xs rounded-lg bg-zinc-100 dark:bg-zinc-900 px-2 py-1 text-zinc-600 dark:text-zinc-300">#{t}</span>)}
                </div>
              )}
              <div className="mt-4 flex items-center gap-3">
                <button onClick={()=>toggleLike(p.id)} className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm transition ${p.liked ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent' : 'border-zinc-300/60 dark:border-zinc-700/60 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
                  <Heart className={`h-4 w-4 ${p.liked ? 'fill-current' : ''}`}/>
                  <span>{p.likes}</span>
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300/60 dark:border-zinc-700/60 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">
                  <MessageSquare className="h-4 w-4"/>
                  <span>Comment</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
      <AnimatePresence>{open && <Modal open={open} onClose={()=>setOpen(false)} onSubmit={createPost} />}</AnimatePresence>
    </section>
  )
}
