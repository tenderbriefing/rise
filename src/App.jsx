import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import { usePageAnalytics } from './hooks/usePageAnalytics'
import Home from './pages/Home'
import About from './pages/About'
import Qualifications from './pages/Qualifications'
import CorporateFunding from './pages/CorporateFunding'
import Contact from './pages/Contact'

function AppContent() {
  usePageAnalytics()

  return (
    <>
      <PageLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/qualifications" element={<Qualifications />} />
        <Route path="/corporate-funding" element={<CorporateFunding />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
          <AppContent />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
