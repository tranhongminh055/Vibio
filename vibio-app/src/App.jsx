import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SignInPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

import HomePage from './pages/HomePage'

import CategoryPage from './pages/CategoryPage'
import ProfilePage from './pages/ProfilePage'
import WatchPage from './pages/WatchPage'

// Component bảo vệ route — kiểm tra đăng nhập trước khi cho vào
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('vibio_authenticated') === 'true'
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/register', element: <LoginPage /> },
    { path: '/login', element: <SignInPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/home', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
    { path: '/watch/:id', element: <ProtectedRoute><WatchPage /></ProtectedRoute> },
    { path: '/tv', element: <ProtectedRoute><CategoryPage title="Truyền hình" /></ProtectedRoute> },
    { path: '/hbo', element: <ProtectedRoute><CategoryPage title="HBO GO" /></ProtectedRoute> },
    { path: '/kids', element: <ProtectedRoute><CategoryPage title="Thiếu nhi" /></ProtectedRoute> },
    { path: '/series', element: <ProtectedRoute><CategoryPage title="Phim Bộ" /></ProtectedRoute> },
    { path: '/movies', element: <ProtectedRoute><CategoryPage title="Phim Điện Ảnh" /></ProtectedRoute> },
    { path: '/galaxy', element: <ProtectedRoute><CategoryPage title="Galaxy Play" /></ProtectedRoute> },
    { path: '/tv-shows', element: <ProtectedRoute><CategoryPage title="Phim Xu Hướng" /></ProtectedRoute> },
    { path: '/events', element: <ProtectedRoute><CategoryPage title="Phim Hành Động" /></ProtectedRoute> },
    { path: '/sports', element: <ProtectedRoute><CategoryPage title="Phim Xu Hướng" /></ProtectedRoute> },
    { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
    { path: '/settings', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
    { path: '/enter-code', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
    { path: '*', element: <Navigate to="/login" replace /> },
  ], {
    future: { v7_relativeSplatPath: true }
  })

  return <RouterProvider router={router} />
}

export default App
