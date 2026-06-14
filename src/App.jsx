import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import ProtectedRoute from './components/ProtectedRoute'
import { usePageAnalytics } from './hooks/usePageAnalytics'
import Home from './pages/Home'
import About from './pages/About'
import Programmes from './pages/Programmes'
import Qualifications from './pages/Qualifications'
import FourIRAcademy from './pages/FourIRAcademy'
import AgricultureAcademy from './pages/AgricultureAcademy'
import OccupationalHealthSafety from './pages/OccupationalHealthSafety'
import ProgrammeDetail from './pages/ProgrammeDetail'
import CorporateFunding from './pages/CorporateFunding'
import Contact from './pages/Contact'
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard'
import LeadsList from './pages/admin/LeadsList'
import LeadDetails from './pages/admin/LeadDetails'
import SeoLandingPage from './pages/SeoLandingPage'
import { getSeoLandingPages } from './data/seoLandingPages'

function PublicSite() {
  usePageAnalytics()

  return (
    <>
      <PageLoader />
      <Header />
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/programmes/:slug" element={<ProgrammeDetail />} />
          <Route path="/qualifications" element={<Qualifications />} />
          <Route path="/4ir-academy" element={<FourIRAcademy />} />
          <Route path="/agriculture-academy" element={<AgricultureAcademy />} />
          <Route path="/occupational-health-safety" element={<OccupationalHealthSafety />} />
          <Route path="/corporate-funding" element={<CorporateFunding />} />
          <Route path="/contact" element={<Contact />} />
          {getSeoLandingPages().map((page) => (
            <Route key={page.path} path={page.path} element={<SeoLandingPage />} />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="leads" element={<LeadsList />} />
          <Route path="leads/:id" element={<LeadDetails />} />
        </Route>
      </Routes>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PublicSite />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AppRoutes />
    </BrowserRouter>
  )
}
