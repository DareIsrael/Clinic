'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import WaitlistTab from '@/components/admin/WaitlistTab';
import ReportsTab from '@/components/admin/ReportsTab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import AppointmentsTab from '@/components/admin/AppointmentsTab';
import SlotManagement from '@/components/admin/SlotManagement';
import WaitlistBroadcastTab from '@/components/admin/WaitlistBroadcastTab';
import AppointmentBroadcastTab from '@/components/admin/AppointmentBroadcastTab';
import BroadcastHistoryTab from '@/components/admin/BroadcastHistoryTab';
import SettingsTab from '@/components/admin/SettingsTab';
import {
  LayoutGrid, ClipboardList, Calendar, Clock, BarChart3, Megaphone,
  Mail, Send, History, Search, Bell, ChevronDown, CalendarDays,
  CheckCircle2, XCircle, Settings
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [theme, setTheme] = useState('light');
  const { user } = useAuth();
  const [globalSearch, setGlobalSearch] = useState('');
  const [counts, setCounts] = useState({
    upcoming: 0,
    today: 0,
    completed: 0,
    cancelled: 0,
    all: 0
  });
  const [waitlistCounts, setWaitlistCounts] = useState({
    active: 0,
    booked: 0,
    accepted: 0,
    rejected: 0,
    called: 0,
    leftVoicemail: 0,
    notReachable: 0,
    all: 0
  });

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
  };

  // Fetch appointment counts
  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await fetch('/api/appointments/admin?limit=1');
        const data = await response.json();
        if (data.success && data.counts) {
          setCounts(data.counts);
        }
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    }
    fetchCounts();
  }, [activeTab]);

  // Fetch waitlist counts
  useEffect(() => {
    async function fetchWaitlistCounts() {
      try {
        const response = await fetch('/api/admin/waitlist?limit=1');
        const data = await response.json();
        if (data.success && data.counts) {
          setWaitlistCounts(data.counts);
        }
      } catch (error) {
        console.error('Error fetching waitlist counts:', error);
      }
    }
    if (activeTab === 'waitlist') {
      fetchWaitlistCounts();
    }
  }, [activeTab]);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, target: 'appointments' },
    { id: 'waitlist', label: 'Waitlist', icon: ClipboardList, target: 'waitlist' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, target: 'appointments' },
    { id: 'slots', label: 'Slots', icon: Clock, target: 'slots' },
    { id: 'reports', label: 'Reports', icon: BarChart3, target: 'reports' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, target: 'announcements' },
  ];

  const commsNav = [
    { id: 'waitlist-broadcast', label: 'Waitlist Broadcast', icon: Mail },
    { id: 'appointment-broadcast', label: 'Appt Broadcast', icon: Send },
    { id: 'broadcast-history', label: 'Broadcast History', icon: History },
  ];

  const today = new Date();
  const shortDateString = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const isDark = theme === 'dark';

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className={`h-screen w-full flex overflow-hidden font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-[#1E293B]'
      }`}>

        {/* ═══════════════════ SIDEBAR NAVIGATION ═══════════════════ */}
        <aside className={`w-[240px] h-full flex flex-col justify-between p-5 flex-shrink-0 hidden md:flex border-r transition-colors duration-200 ${
          isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="space-y-6">
            
            {/* Top Brand Section */}
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-7 h-7 bg-white border border-[#E2E8F0] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                <img src="/St.MaryLOGO1.svg" alt="St Mary Rideau Clinic Logo" className="w-5 h-5 object-contain" />
              </div>
              <div className="min-w-0">
                <h1 className={`text-xs font-black tracking-wide leading-none ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>St Mary Rideau</h1>
                <p className="text-[9px] font-extrabold text-[#94A3B8] mt-0.5 tracking-widest uppercase">Family Clinic</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-0.5">
              {mainNav.map((item) => {
                const isActive = activeTab === item.target || (item.id === 'dashboard' && activeTab === 'appointments');
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.target)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-sm'
                        : isDark
                          ? 'text-slate-400 hover:bg-[#334155] hover:text-white'
                          : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}

              <div className="pt-3 pb-1">
                <p className="text-[8px] font-extrabold text-[#94A3B8] uppercase tracking-widest px-3">Comms</p>
              </div>

              {commsNav.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-sm'
                        : isDark
                          ? 'text-slate-400 hover:bg-[#334155] hover:text-white'
                          : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:bg-[#334155] hover:text-white'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155]'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* User Profile Block */}
          <div className={`border-t pt-4 ${isDark ? 'border-[#334155]' : 'border-[#F1F5F9]'}`}>
            <div className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition ${
              isDark ? 'hover:bg-[#334155]' : 'hover:bg-[#F8FAFC]'
            }`}>
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center text-white font-extrabold text-xs flex-shrink-0">
                  {user?.firstName?.charAt(0) || 'I'}
                </div>
                <div className="min-w-0">
                  <p className={`text-[11px] font-bold leading-none truncate ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{user?.firstName || 'Israel'}</p>
                  <p className="text-[9px] text-[#94A3B8] font-bold mt-0.5">Administrator</p>
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
            </div>
          </div>
        </aside>

        {/* ═══════════════════ MAIN CONTENT AREA (Centered & Simple) ═══════════════════ */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Top Header bar */}
          <header className={`h-16 border-b flex items-center justify-between px-6 lg:px-8 flex-shrink-0 transition-colors duration-200 ${
            isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-center gap-4">
              <div className="md:hidden flex items-center gap-2">
                <div className="w-6.5 h-6.5 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider hidden md:block">
                St Mary Rideau Clinic Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Sleek Search bar */}
              {/* <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search..."
                  className={`pl-8 pr-4 py-1.5 border rounded-lg text-xs transition-all w-48 sm:w-56 focus:outline-none ${
                    isDark 
                      ? 'bg-[#0F172A] border-[#334155] text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-[#0EA5E9]' 
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] focus:ring-1 focus:ring-[#0EA5E9] focus:bg-white'
                  }`}
                />
              </div> */}

              <button className={`relative p-2 border rounded-lg transition ${
                isDark ? 'bg-[#0F172A] border-[#334155] hover:bg-[#1E293B]' : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-[#F1F5F9]'
              }`}>
                <Bell className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>

              <div className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${
                isDark ? 'bg-[#0F172A] border-[#334155] text-slate-400' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
              }`}>
                <CalendarDays className="w-3 h-3" />
                <span>{shortDateString}</span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
            
            {/* Minimal Welcome Banner */}
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>Welcome, {user?.firstName || 'Israel'}!</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#64748B]'} mt-0.5 font-semibold`}>Manage clinic operations and waitlists efficiently.</p>
            </div>

            {/* Quick KPI stats grid — switches between appointment/waitlist stats */}
            {activeTab === 'waitlist' ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                
                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Total Waitlist</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{waitlistCounts.all}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Active</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{waitlistCounts.active}</p>
                  </div>
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Booked</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{waitlistCounts.booked}</p>
                  </div>
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-amber-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Called</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{waitlistCounts.called}</p>
                  </div>
                  <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-teal-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Rejected</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{waitlistCounts.rejected}</p>
                  </div>
                  <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </div>
                </div>

              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                
                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Appointments</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.all}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Upcoming</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.upcoming}</p>
                  </div>
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Today</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.today}</p>
                  </div>
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Completed</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.completed}</p>
                  </div>
                  <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <div>
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Cancelled</p>
                    <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.cancelled}</p>
                  </div>
                  <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </div>
                </div>

              </div>
            )}

            {/* Active Content Window */}
            <div className="w-full">
              {activeTab === 'waitlist' && <WaitlistTab />}
              {activeTab === 'reports' && <ReportsTab />}
              {activeTab === 'announcements' && <AnnouncementsTab />}
              {activeTab === 'appointments' && <AppointmentsTab />}
              {activeTab === 'slots' && <SlotManagement />}
              {activeTab === 'waitlist-broadcast' && <WaitlistBroadcastTab />}
              {activeTab === 'appointment-broadcast' && <AppointmentBroadcastTab />}
              {activeTab === 'broadcast-history' && <BroadcastHistoryTab />}
              {activeTab === 'settings' && <SettingsTab theme={theme} onThemeChange={handleThemeChange} />}
            </div>

          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}
