import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import App from '../App'            // landing
import Feed from '../pages/Feed'
import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'feed', element: <ProtectedRoute><Feed /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    ],
  },
])
