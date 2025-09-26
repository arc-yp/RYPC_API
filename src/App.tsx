import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { AdminDashboard } from './components/AdminDashboard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CompactReviewCardView } from './components/CompactReviewCardView';
import { LoginPage } from './components/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { storage } from './utils/storage';
import { auth } from './utils/auth';
import { ReviewCard } from './types';

ReactGA.initialize("G-J7T5QPZPQ9"); // your measurement ID

function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Dashboard Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Analytics Route */}
        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Default route redirects based on auth status */}
        <Route 
          path="/" 
          element={
            auth.isAuthenticated() 
              ? <Navigate to="/admin" replace /> 
              : <Navigate to="/login" replace />
          } 
        />
        
        {/* Dynamic Review Card Routes */}
        <Route 
          path="/:slug" 
          element={<DynamicReviewCard />} 
        />
      </Routes>
    </Router>
  );
}

// Component to handle dynamic review card routing
const DynamicReviewCard: React.FC = () => {
  const [card, setCard] = React.useState<ReviewCard | null>(null);
  const [loading, setLoading] = React.useState(true);
  const slug = window.location.pathname.slice(1); // Remove leading slash

  React.useEffect(() => {
    const loadCard = async () => {
      try {
        const foundCard = await storage.getCardBySlug(slug);
        setCard(foundCard);
      } catch (error) {
        console.error('Error loading card:', error);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    loadCard();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-purple-200 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Loading Review Card</h1>
          <p className="text-slate-900">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          {/* QR Code Image */}
          <img
            src="/aireviewsystm_qrcode.png"
            alt="AI Review System QR Code"
            className="mx-auto mb-6 w-40 max-w-full border-4 border-blue-500 rounded-lg shadow-lg bg-white"
          />
          <h1 className="text-xl font-bold text-white mb-4">If Card Not Found</h1>
          <h1 className="text-3xl font-bold text-white mb-4">
            Please! Contact Admin&nbsp;
            <a
              href="https://www.aireviewsystem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400 hover:text-blue-600"
            >
              https://www.aireviewsystem.com/
            </a>
          </h1>
          <p className="text-slate-400 mb-8">
            The review card for "/{slug}" doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  if (card.active === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-lg p-8 bg-slate-800/40 backdrop-blur rounded-2xl border border-white/10">
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Temporarily Unavailable</h1>
          
          <p className="text-slate-300 mb-4">The review card for "/{slug}" is currently inactive.</p>
          <p className="text-slate-400 text-sm">Please check back later or contact the business owner if you believe this is an error.</p>
           <h1 className="text-sm text-white mb-4">
            Please! Contact Admin&nbsp;
            <a
              href="https://www.aireviewsystem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400 hover:text-blue-600"
            >
              https://www.aireviewsystem.com/
            </a>
          </h1>
        </div>
      </div>
    );
  }

  return <CompactReviewCardView card={card} />;
};

export default App;