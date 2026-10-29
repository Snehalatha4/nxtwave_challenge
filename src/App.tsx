import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DemoBadge } from './components/DemoBadge';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { LandingPage } from './pages/LandingPage';
import { ProjectPassportPage } from './pages/ProjectPassportPage';
import { ReferralSystemPage } from './pages/ReferralSystemPage';
import { GrowthDashboardPage } from './pages/GrowthDashboardPage';
import { GrowthExperimentsPage } from './pages/GrowthExperimentsPage';
import { CampaignToolkitPage } from './pages/CampaignToolkitPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import type { ProjectRecommendation } from './types';
import { getAttributionParams } from './utils/attribution';

// Scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation | undefined>(undefined);

  // Initialize attribution on load
  useEffect(() => {
    getAttributionParams();
  }, []);

  const handleOpenRegisterModal = (project?: ProjectRecommendation) => {
    setSelectedProject(project);
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setSelectedProject(undefined);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FBFBFE] text-slate-800 font-sans selection:bg-brand-200 selection:text-brand-900">
        <DemoBadge />
        <Navbar onOpenRegisterModal={() => handleOpenRegisterModal()} />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<LandingPage onOpenRegisterModal={() => handleOpenRegisterModal()} />}
            />
            <Route
              path="/passport"
              element={<ProjectPassportPage onOpenRegisterModal={handleOpenRegisterModal} />}
            />
            <Route path="/referrals" element={<ReferralSystemPage />} />
            <Route path="/admin" element={<GrowthDashboardPage />} />
            <Route path="/dashboard" element={<GrowthDashboardPage />} />
            <Route path="/experiments" element={<GrowthExperimentsPage />} />
            <Route path="/toolkit" element={<CampaignToolkitPage />} />
            <Route path="/budget" element={<BudgetPlannerPage />} />
            <Route path="/case-study" element={<CaseStudyPage />} />
          </Routes>
        </main>

        <Footer />

        <RegistrationModal
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
          defaultInterest={selectedProject?.interestMatch}
          defaultCodingLevel={selectedProject?.minCodingLevel}
          projectTitle={selectedProject?.title}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
