import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home.jsx';
import Footer from './components/footer.jsx';
import Livre from './pages/livre.jsx';
import Abonnement from './pages/abonnement.jsx';  
import Connexion from './pages/connexion.jsx';
import ContactForm from './pages/contact.jsx';
import { AuthProvider } from './contexts/AuthContext';
import Articles from './pages/articles.jsx';
import Landing from './pages/Landing.jsx';
import ArticleDetail from './pages/articleDetail.jsx';
import VideoDetail from './pages/videoDetail.jsx';  
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionCancel from './pages/SubscriptionCancel';
import PasswordLost from './pages/PasswordLost.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import MentionLegale  from './pages/MentionLegale.jsx';
import ExtraitPage from './pages/ExtraitPage.jsx';
import CGV from './pages/CGV.jsx';
import CGU from './pages/CGU.jsx';
import RGPD from './pages/RGPD.jsx';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <AuthProvider>
      <Router>
  <div className="relative flex flex-col min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/livre" element={<Livre />} />
              <Route path="/extrait" element={<ExtraitPage />} />
              <Route path="/abonnement" element={<Abonnement />} />
              <Route path="/Landing" element={<Landing />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/videos/:slug" element={<VideoDetail />} />
              <Route path="/subscription/success" element={<SubscriptionSuccess />} />
              <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
              <Route path="/password-lost" element={<PasswordLost />} />
              <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
              <Route path="/mentions-legales" element={<MentionLegale />} />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="/rgpd" element={<RGPD />} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
