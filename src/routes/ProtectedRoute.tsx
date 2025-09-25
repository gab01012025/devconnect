import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../stores/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!user) return <Navigate to="/" replace state={{ from: loc.pathname }} />
  return <>{children}</>
}
