'use client';
import AppointmentStatusDropdown from './AppointmentStatusDropdown';
import { useAuth } from '@/hooks/useAuth';
import { exportAppointmentToExcel } from '@/utils/excelExport';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Heart,
  FileText,
  ClipboardList,
  X,
  Download,
} from 'lucide-react';

const AppointmentDetailModal = ({ appointment, onClose, onStatusChange, theme }) => {
  const isDark = theme === 'dark';
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      const dateObj = new Date(year, month - 1, day);
      
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return dateString;
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusBadge = (status) => {
    const styles = {
      scheduled: 'bg-[#EFF6FF] text-[#1E40AF]',
      confirmed: 'bg-[#ECFDF5] text-[#065F46]',
      completed: 'bg-[#F5F3FF] text-[#5B21B6]',
      cancelled: 'bg-[#FEF2F2] text-[#991B1B]',
      no_show: 'bg-[#FFFBEB] text-[#92400E]',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      ></div>
      
      {/* A4-style Document Container */}
      <div className={`rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border ${
        isDark ? 'bg-[#1E293B] border-[#334155] text-slate-100' : 'bg-white border-gray-100 text-gray-900'
      }`}
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
              <p className="text-sky-100 text-xs mt-0.5 tracking-wide">Patient Appointment Record</p>
            </div>
          </div>

          {/* Patient Name + Status */}
          <div className="flex items-end justify-between gap-4 relative">
            <div className="min-w-0">
              <p className="text-sky-200 text-xs uppercase tracking-widest font-medium mb-1">Patient</p>
              <h2 className="text-white text-2xl font-bold tracking-tight leading-tight truncate">
                {appointment.firstName} {appointment.lastName}
              </h2>
              <p className="text-sky-200 text-sm mt-1">
                {calculateAge(appointment.dateOfBirth)} years old · {appointment.gender || '—'}
              </p>
            </div>
            <div className="flex-shrink-0 pb-0.5">
              {getStatusBadge(appointment.status)}
            </div>
          </div>
        </div>

        {/* ─── Thin accent strip / ID bar ─── */}
        <div className={`px-8 py-2.5 flex items-center justify-between border-b ${
          isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-sky-50 border-sky-100'
        }`}>
          <p className={`text-xs ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
            <span className="font-medium">Appointment ID:</span>{' '}
            <span className={`font-mono ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>{appointment._id}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium ${isDark ? 'text-sky-400' : 'text-sky-500'}`}>Status:</span>
            <AppointmentStatusDropdown 
              appointment={appointment} 
              onStatusChange={onStatusChange}
            />
          </div>
        </div>

        {/* ─── Body Content ─── */}
        <div className="px-8 py-6 space-y-6">

          {/* ── Appointment Date & Time Banner ── */}
          <div className={`rounded-xl p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDark ? 'bg-sky-950/40 border-sky-800/60' : 'bg-sky-50/70 border-sky-150'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">Scheduled Date</p>
                <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(appointment.appointmentDate)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">Time Slot</p>
                <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{appointment.appointmentTime}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── Personal Information Card ── */}
            <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${
                isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Personal Information</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">First Name</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.firstName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Last Name</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.lastName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100/10">
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Date of Birth</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.dateOfBirth ? new Date(appointment.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Gender</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.gender || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Contact & Address Card ── */}
            <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${
                isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Contact Details</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.cellPhone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Address</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
                      {appointment.address ? `${appointment.address}, ${appointment.province || ''} ${appointment.postalCode || ''}` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Appointment Details Card ── */}
            <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${
                isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Appointment Details</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Date</p>
                      <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{formatDate(appointment.appointmentDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Time</p>
                      <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.appointmentTime}</p>
                    </div>
                  </div>
                </div>
                {appointment.reason && (
                  <div className="flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Reason for Appointment</p>
                      <p className={`text-sm p-3 rounded-lg leading-relaxed ${
                        isDark ? 'bg-[#0F172A] border border-[#334155] text-slate-200' : 'bg-gray-50 border border-gray-100 text-gray-900'
                      }`}>{appointment.reason}</p>
                    </div>
                  </div>
                )}
                {appointment.notes && (
                  <div className="flex items-start gap-2">
                    <ClipboardList className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Additional Notes</p>
                      <p className={`text-sm p-3 rounded-lg leading-relaxed ${
                        isDark ? 'bg-[#0F172A] border border-[#334155] text-slate-200' : 'bg-amber-50/60 border border-amber-100 text-gray-900'
                      }`}>{appointment.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Healthcare Information Card ── */}
            <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${
                isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Healthcare Information</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Healthcare Number</p>
                  <p className={`text-sm font-mono tracking-wide ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.healthcareNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Healthcare Province</p>
                  <p className={`text-sm ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{appointment.healthcareProvince || 'N/A'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Record Timestamps (full width footer) ── */}
          <div className={`border-t border-dashed pt-4 ${isDark ? 'border-[#334155]' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Record Timestamps</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg px-4 py-2.5 ${isDark ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Created</p>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{new Date(appointment.createdAt).toLocaleString()}</p>
              </div>
              <div className={`rounded-lg px-4 py-2.5 ${isDark ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Last Updated</p>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{new Date(appointment.updatedAt || appointment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* ── Footer Actions ── */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {isDoctor && (
                <button
                  onClick={() => exportAppointmentToExcel(appointment)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-sm cursor-pointer"
                  title="Download Patient Appointment Information as Excel"
                >
                  <Download className="w-4 h-4" />
                  Download Patient
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                isDark ? 'bg-[#334155] text-slate-200 hover:bg-[#475569]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;