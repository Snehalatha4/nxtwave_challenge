import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Compass, BarChart3, BookOpen, ExternalLink, Rocket } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../services/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-purple-100 text-slate-500 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-pink-500 flex items-center justify-center text-white shadow-cute-sm">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">Project Launchpad</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                Growth System ✨
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-md font-medium">
              A student-acquisition growth architecture engineered for NxtWave's free online workshop:
              <span className="text-slate-900 font-bold"> "{CAMPAIGN_CONFIG.workshopTitle}"</span>.
              Designed to turn passive curiosity into committed learners through interactive project discovery.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-PII Analytics Policy • Strict Outbound Click Attribution</span>
            </div>
          </div>

          {/* Student Flows */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Student Flows</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/" className="hover:text-brand-600 transition flex items-center gap-1.5">
                  Workshop Overview
                </Link>
              </li>
              <li>
                <Link to="/passport" className="hover:text-brand-600 transition flex items-center gap-1.5 text-brand-700 font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  AI Project Passport Quiz ✨
                </Link>
              </li>
              <li>
                <Link to="/referrals" className="hover:text-brand-600 transition">
                  Campus Ambassador Hub
                </Link>
              </li>
              <li>
                <Link to="/toolkit" className="hover:text-brand-600 transition">
                  Messaging Toolkit &amp; QR
                </Link>
              </li>
            </ul>
          </div>

          {/* Growth & Governance */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Growth Evaluation</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/admin" className="hover:text-brand-600 transition flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-brand-600" />
                  Growth Analytics (Target: 500)
                </Link>
              </li>
              <li>
                <Link to="/experiments" className="hover:text-brand-600 transition">
                  A/B Experiment Matrix (A vs B)
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:text-brand-600 transition">
                  ₹2,000 Budget Allocation
                </Link>
              </li>
              <li>
                <Link to="/case-study" className="hover:text-brand-600 transition flex items-center gap-1.5 font-bold text-pink-600">
                  <BookOpen className="w-3.5 h-3.5" />
                  Submission Case Study ✨
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers & Ethics */}
        <div className="pt-8 border-t border-purple-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            Prototype created for the NxtWave Growth Intern Challenge. Project recommendations are calibrated starter blueprints to guide student exploration.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 font-bold">Target: 500 Registrations / 7 Days 🎯</span>
            <a
              href={CAMPAIGN_CONFIG.officialRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 flex items-center gap-1 font-bold"
            >
              Partner Destination <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
