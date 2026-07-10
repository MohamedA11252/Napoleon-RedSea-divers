import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFab from './components/WhatsAppFab';
import Home from './pages/Home';
import ReviewComments from './pages/ReviewComments';
import ActivityDetail from './pages/ActivityDetail';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expedition/:slug" element={<ActivityDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin-only routes — redirect to /login if not authenticated as admin */}
            <Route element={<AdminRoute />}>
              <Route path="/review-comments" element={<ReviewComments />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <WhatsAppFab />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
