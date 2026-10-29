import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  BarChart3,
  Users,
  FlaskConical,
  MessageSquareShare,
  PieChart,
  BookOpen,
  Menu,
  X,
  Sparkles,
  Rocket,
} from 'lucide-react';

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Project Passport', path: '/passport', icon: Compass },
    { name: 'Referral Hub', path: '/referrals', icon: Users },
    { name: 'Growth Analytics', path: '/admin', icon: BarChart3 },
    { name: 'A/B Tests', path: '/experiments', icon: FlaskConical },
    { name: 'Toolkit', path: '/toolkit', icon: MessageSquareShare },
    { name: 'Budget', path: '/budget', icon: PieChart },
    { name: 'Case Study', path: '/case-study', icon: BookOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-500 via-pink-400 to-sky-400 p-[2px] shadow-cute-sm group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Rocket className="w-4 h-4 text-brand-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                  Project Launchpad
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                  NxtWave
                </span>
              </div>
              <p className="text-[11px] text-slate-600 hidden sm:block font-medium">Build Your First AI Project in 60 Mins ✨</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-purple-100 text-purple-800 shadow-xs border border-purple-200/80'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-purple-50/70'
                  }`}
                >
                  {item.icon && <item.icon className={`w-3.5 h-3.5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenRegisterModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-violet-600 via-brand-500 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-cute-sm hover:shadow-cute transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Register Free</span>
              <span className="text-[10px] font-semibold opacity-90 px-1.5 py-0.2 bg-white/20 rounded-full">60m</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-purple-50 text-slate-700 hover:bg-purple-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-purple-100 bg-white/95 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 shadow-cute-card">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  active
                    ? 'bg-purple-100 text-brand-700 border border-purple-200'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-brand-600'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-brand-500" />}
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-cute-sm text-center cursor-pointer"
            >
              Register for Free Workshop (60 Mins) 🚀
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
