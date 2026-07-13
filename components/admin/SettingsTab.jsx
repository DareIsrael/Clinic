'use client';
import { useState } from 'react';
import { Sun, Moon, Shield, Settings, Check, Users } from 'lucide-react';
import AdminManagementPanel from './AdminManagementPanel';

export default function SettingsTab({ theme, onThemeChange, userRole }) {
  const [activeSubTab, setActiveSubTab] = useState('preferences');
  const isDoctor = userRole === 'doctor';

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`${
        theme === 'dark' ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
      } rounded-2xl border shadow-sm p-6 flex items-center gap-3`}>
        <div className={`w-9 h-9 ${theme === 'dark' ? 'bg-[#334155]' : 'bg-blue-50'} rounded-xl flex items-center justify-center`}>
          <Settings className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-blue-600'}`} />
        </div>
        <div>
          <h2 className={`text-[16px] font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0F172A]'}`}>Admin Settings</h2>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-[#64748B]'} mt-0.5`}>Configure admin workspace settings and preferences</p>
        </div>
      </div>

      {/* Sub-tabs — only show if doctor (has multiple tabs) */}
      {isDoctor && (
        <div className={`flex gap-1 p-1 rounded-xl border ${theme === 'dark' ? 'bg-[#0F172A] border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'preferences'
                ? 'bg-sky-600 text-white shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-[#334155]' : 'text-[#64748B] hover:text-[#334155] hover:bg-white/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Preferences
          </button>
          <button
            onClick={() => setActiveSubTab('admin-management')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'admin-management'
                ? 'bg-sky-600 text-white shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-[#334155]' : 'text-[#64748B] hover:text-[#334155] hover:bg-white/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Admin Management
          </button>
        </div>
      )}

      {/* Sub-tab Content */}
      {activeSubTab === 'preferences' && (
        <div className={`${
          theme === 'dark' ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
        } rounded-2xl border shadow-sm p-6 space-y-6`}>
          
          <div>
            <h3 className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-[#0F172A]'} uppercase tracking-wider`}>Theme Preference</h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-[#64748B]'} mt-1`}>
              Select the visual theme for your administrator dashboard.
            </p>
          </div>

          {/* Theme select layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Light Theme selection */}
            <button
              onClick={() => onThemeChange('light')}
              className={`flex items-center justify-between p-4 rounded-xl border transition text-left ${
                theme === 'light'
                  ? 'border-[#0EA5E9] bg-sky-50/40'
                  : theme === 'dark' ? 'border-[#334155] hover:bg-[#334155]/30' : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${theme === 'light' ? 'bg-sky-100 text-sky-700' : 'bg-[#F8FAFC] text-gray-500'}`}>
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>Light Mode</p>
                  <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Classic bright clinical environment</p>
                </div>
              </div>
              {theme === 'light' && (
                <div className="w-5 h-5 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </button>

            {/* Dark Theme selection */}
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex items-center justify-between p-4 rounded-xl border transition text-left ${
                theme === 'dark'
                  ? 'border-[#0EA5E9] bg-[#334155]/50'
                  : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-sky-900 text-sky-400' : 'bg-gray-100 text-gray-500'}`}>
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>Dark Mode</p>
                  <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Low-light design for night shifts</p>
                </div>
              </div>
              {theme === 'dark' && (
                <div className="w-5 h-5 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </button>

          </div>

          {/* Security / Admin Panel definitions */}
          <div className={`pt-6 border-t ${theme === 'dark' ? 'border-[#334155]' : 'border-[#F1F5F9]'} space-y-3`}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-[#0F172A]'}`}>Security & Admin Role</h4>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-[#64748B]'} leading-relaxed`}>
              Your account is assigned the <strong className="text-emerald-600 font-bold">{userRole === 'doctor' ? 'Doctor' : 'Administrator'}</strong> role. 
              All actions performed on this dashboard (such as blocking slots or broadcasting emails) are signed and tracked for auditing compliance.
            </p>
          </div>

        </div>
      )}

      {/* Admin Management Sub-Tab (Doctor Only) */}
      {activeSubTab === 'admin-management' && isDoctor && (
        <div className={`${
          theme === 'dark' ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
        } rounded-2xl border shadow-sm p-6`}>
          <AdminManagementPanel theme={theme} />
        </div>
      )}

    </div>
  );
}
