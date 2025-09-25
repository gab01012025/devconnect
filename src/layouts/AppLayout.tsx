
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../stores/auth'
import { Menu, LogIn, LogOut, Home, Newspaper, User, BarChart4 } from 'lucide-react'

export default function AppLayout() {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const from = (loc.state as { from?: string } | null)?.from
    if (user && from) {
      navigate(from, { replace: true, state: null })
    }
  }, [user, loc.state, navigate])

  
  const handleLogin = async () => {
    await signInWithGoogle()
    const from = (loc.state as { from?: string } | null)?.from || '/feed'
    navigate(from, { replace: true, state: null })
  }

  return (
    <div className="min-h-dvh bg-white text-zinc-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* mobile menu */}
            <button
              onClick={() => setOpen(v => !v)}
              className="sm:hidden inline-flex items-center rounded-xl border px-3 py-2 border-zinc-300"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* links (desktop) */}
            <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-600">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 hover:text-zinc-900 ${isActive ? 'font-semibold text-zinc-900' : ''}`
                }
              >
                <Home className="h-4 w-4" /> Home
              </NavLink>

              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 hover:text-zinc-900 ${isActive ? 'font-semibold text-zinc-900' : ''}`
                }
              >
                <Newspaper className="h-4 w-4" /> Feed
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 hover:text-zinc-900 ${isActive ? 'font-semibold text-zinc-900' : ''}`
                }
              >
                <User className="h-4 w-4" /> Profile
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 hover:text-zinc-900 ${isActive ? 'font-semibold text-zinc-900' : ''}`
                }
              >
                <BarChart4 className="h-4 w-4" /> Dashboard
              </NavLink>
            </nav>

            {/* auth actions */}
            <div className="flex items-center gap-3">
              {loading ? (
                <span className="text-sm text-zinc-500">Carregando…</span>
              ) : user ? (
                <>
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.name ?? 'User'}
                      className="h-7 w-7 rounded-full"
                    />
                  )}
                  <button
                    onClick={signOutUser}
                    className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm border-zinc-300 hover:bg-zinc-50"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm border-zinc-300 hover:bg-zinc-50"
                >
                  <LogIn className="h-4 w-4" /> Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* mobile drawer */}
        {open && (
          <div className="sm:hidden border-t border-zinc-200">
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 text-sm">
              <NavLink to="/" onClick={() => setOpen(false)} className="py-2">
                Home
              </NavLink>
              <NavLink to="/feed" onClick={() => setOpen(false)} className="py-2">
                Feed
              </NavLink>
              <NavLink to="/profile" onClick={() => setOpen(false)} className="py-2">
                Profile
              </NavLink>
              <NavLink to="/dashboard" onClick={() => setOpen(false)} className="py-2">
                Dashboard
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-zinc-200 py-10 mt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-zinc-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} DevConnect.</p>
          <p className="opacity-75">Auth • Router • Layout</p>
        </div>
      </footer>
    </div>
  )
}
