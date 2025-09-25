import {
  createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react'
import { auth, googleProvider } from '../lib/firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

type User = { uid: string; name: string|null; email: string|null; photoURL: string|null }
type AuthCtx = {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOutUser: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) { // fallback se Firebase não inicializou
      console.warn('[Auth] Firebase auth indisponível (cheque .env.local).')
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (fb) => {
      setUser(fb ? {
        uid: fb.uid, name: fb.displayName, email: fb.email, photoURL: fb.photoURL,
      } : null)
      setLoading(false)
    })
    return unsub
  }, [])

  const signInWithGoogle = async () => {
    if (!auth) { alert('Login indisponível: configure o Firebase.'); return }
    await signInWithPopup(auth, googleProvider)
  }

  const signOutUser = async () => {
    if (!auth) return
    await signOut(auth)
  }

  const value = useMemo(() => ({ user, loading, signInWithGoogle, signOutUser }), [user, loading])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
