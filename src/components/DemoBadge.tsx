import React, { useState } from 'react';
import { isDemoMode, setDemoMode, resetData } from '../services/analytics';
import { Database, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';

export const DemoBadge: React.FC = () => {
  const [demoActive, setDemoActive] = useState<boolean>(isDemoMode());
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggle = () => {
    const nextState = !demoActive;
    setDemoActive(nextState);
    setDemoMode(nextState);
    showToast(nextState ? '✨ Switched to Simulated Demo Data' : '🌱 Switched to Clean Live Workspace Data');
  };

  const handleConfirmReset = () => {
    resetData(false);
    setShowConfirmReset(false);
    showToast('✨ All local event and registration data has been reset to defaults');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-50/90 via-pink-50/70 to-sky-50/90 border-b border-purple-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-600">
        <div className="flex items-center gap-2.5">
          {demoActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200/80 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Demo Mode Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/80 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Live Mode (Real-Time)
            </span>
          )}
          <span className="hidden sm:inline text-slate-500 font-medium">
            {demoActive
              ? 'Showing 7-day student campaign simulation (177/500 registrations)'
              : 'Recording only real interactions performed in this browser'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-purple-50 text-slate-700 transition text-xs font-semibold border border-purple-200 shadow-cute-sm cursor-pointer"
            title="Toggle between deterministic simulated data and clean live tracking"
          >
            <Database className="w-3.5 h-3.5 text-brand-500" />
            <span>Switch to {demoActive ? 'Live Mode' : 'Demo Mode'}</span>
          </button>

          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition text-xs border border-slate-200 hover:border-rose-200 shadow-xs cursor-pointer"
            title="Reset locally stored events and data"
          >
            <RefreshCw className="w-3 h-3 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-md w-full shadow-cute-lg animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <div className="p-2.5 bg-amber-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Reset Local Workspace Data?</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              This will clear all locally stored live events, test registrations, and custom referral codes, returning the app to its default demo state.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold transition shadow-cute-pink cursor-pointer"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-white border border-purple-200 text-slate-800 px-4 py-3 rounded-2xl shadow-cute-lg flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
