import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ComplaintPortalPage from './pages/ComplaintPortalPage';
import TrackingPage from './pages/TrackingPage';
import OfficerDashboardPage from './pages/OfficerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TopNav from './components/TopNav';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/submit" element={<ComplaintPortalPage />} />
        <Route path="/track" element={<TrackingPage />} />
        <Route path="/officer" element={<OfficerDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </div>
  );
}

export default App;
