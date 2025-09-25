import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
}

const missing = Object.entries(cfg)
  .filter(([, v]) => !v)
  .map(([k]) => k)

let app: ReturnType<typeof initializeApp> | null = null
try {
  if (missing.length) {
    console.warn('[Firebase] Variáveis ausentes:', missing.join(', '))
  }
  app = getApps().length ? getApps()[0] : initializeApp(cfg)
} catch (e) {
  console.error('[Firebase] Erro ao inicializar:', e)
  app = null
}

export const auth = app ? getAuth(app) : null
export const googleProvider = new GoogleAuthProvider()
