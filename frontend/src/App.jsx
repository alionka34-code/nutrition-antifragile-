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
import ArticleDetail from './pages/articleDetail.jsx';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionCancel from './pages/SubscriptionCancel';




function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/livre" element={<Livre />}/>
              <Route path="/abonnement" element={<Abonnement />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/subscription/success" element={<SubscriptionSuccess />} />
              <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
             
             

            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}


export default App;
