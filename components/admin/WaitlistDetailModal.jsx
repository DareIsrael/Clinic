'use client';
import WaitlistStatusDropdown from './WaitlistStatusDropdown';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Clock,
  ClipboardList,
  X,
} from 'lucide-react';

const WaitlistDetailModal = ({ entry, onClose, onStatusChange }) => {
  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      Booked: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      Accepted: 'bg-violet-50 text-violet-700 ring-violet-600/20',
      Rejected: 'bg-red-50 text-red-700 ring-red-600/20',
      Called: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      'Left Voicemail': 'bg-orange-50 text-orange-700 ring-orange-600/20',
      'Not Reachable': 'bg-gray-50 text-gray-700 ring-gray-600/20',
    };
    const s = status || 'Active';
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[s] || styles.Active}`}>
        {s}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      ></div>
      
      {/* A4-style Document Container */}
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border border-gray-100"
           style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
        
        {/* ─── Blue Header / Letterhead ─── */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-t-2xl px-8 pt-6 pb-5 relative overflow-hidden">
          {/* Subtle decorative pattern */}
          <div className="absolute inset-0 opacity-[0.07]"
               style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/15 rounded-lg p-1.5 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top row: Logo + Clinic Name */}
          <div className="flex items-center gap-3 mb-5 relative">
            <div className="w-11 h-11 rounded-xl bg-white/95 p-1.5 shadow-sm flex items-center justify-center flex-shrink-0">
              <img src="/St.MaryLOGO2.svg" alt="St Mary Rideau Clinic Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight tracking-tight">St Mary Rideau Clinic</h1>
              <p className="text-sky-100 text-xs mt-0.5 tracking-wide">Patient Waitlist Record</p>
            </div>
          </div>

          {/* Patient Name + Status */}
          <div className="flex items-end justify-between gap-4 relative">
            <div className="min-w-0">
              <p className="text-sky-200 text-xs uppercase tracking-widest font-medium mb-1">Patient</p>
              <h2 className="text-white text-2xl font-bold tracking-tight leading-tight truncate">
                {entry.firstName} {entry.lastName}
              </h2>
              {entry.dateOfBirth && (
                <p className="text-sky-200 text-sm mt-1">
                  {entry.gender || '—'}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 pb-0.5">
              {getStatusBadge(entry.status)}
            </div>
          </div>
        </div>

        {/* ─── Thin accent strip ─── */}
        <div className="bg-sky-50 border-b border-sky-100 px-8 py-2.5 flex items-center justify-between">
          <p className="text-xs text-sky-600">
            <span className="font-medium">Joined Waitlist:</span>{' '}
            <span className="text-sky-700">{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-sky-500 font-medium">Status:</span>
            <WaitlistStatusDropdown 
              waitlistEntry={entry} 
              onStatusChange={onStatusChange}
            />
          </div>
        </div>

        {/* ─── Body Content ─── */}
        <div className="px-8 py-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── Personal Information Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
              </div>
              <div className="px-5 py-4">
                <dl className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">First Name</dt>
                      <dd className="text-sm text-gray-900 font-medium">{entry.firstName}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Last Name</dt>
                      <dd className="text-sm text-gray-900 font-medium">{entry.lastName}</dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Gender</dt>
                    <dd className="text-sm text-gray-900">{entry.gender || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Date of Birth</dt>
                    <dd className="text-sm text-gray-900">
                      {entry.dateOfBirth ? new Date(entry.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* ── Contact Information Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Contact Information</h3>
              </div>
              <div className="px-5 py-4">
                <dl className="space-y-3.5">
                  <div className="flex items-start gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Email</dt>
                      <dd className="text-sm text-gray-900">{entry.email}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Phone</dt>
                      <dd className="text-sm text-gray-900">{entry.cellPhone || 'N/A'}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            {/* ── Address Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Address</h3>
              </div>
              <div className="px-5 py-4">
                <dl className="space-y-3.5">
                  <div>
                    <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Street Address</dt>
                    <dd className="text-sm text-gray-900">{entry.address || 'N/A'}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Country</dt>
                      <dd className="text-sm text-gray-900">{entry.country || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Postal Code</dt>
                      <dd className="text-sm text-gray-900">{entry.postalCode || 'N/A'}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            {/* ── Healthcare Information Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Healthcare Information</h3>
              </div>
              <div className="px-5 py-4">
                <dl className="space-y-3.5">
                  <div>
                    <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Healthcare Number</dt>
                    <dd className="text-sm text-gray-900 font-mono tracking-wide">{entry.healthcareNumber || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Healthcare Province</dt>
                    <dd className="text-sm text-gray-900">{entry.healthcareProvince || 'N/A'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* ── Waitlist Info (full width) ── */}
          <div className="border-t border-dashed border-gray-200 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-3.5 h-3.5 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Waitlist Record</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Joined Date</p>
                <p className="text-sm text-gray-700">
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Current Status</p>
                <p className="text-sm text-gray-700 font-medium">{entry.status || 'Active'}</p>
              </div>
            </div>
          </div>

          {/* ── Footer Actions ── */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-800 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistDetailModal;