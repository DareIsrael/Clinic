'use client';
import AppointmentStatusDropdown from './AppointmentStatusDropdown';
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
} from 'lucide-react';

const AppointmentDetailModal = ({ appointment, onClose, onStatusChange }) => {
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
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusBadge = (status) => {
    const styles = {
      scheduled: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      completed: 'bg-violet-50 text-violet-700 ring-violet-600/20',
      cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
      no_show: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    };
    const labels = {
      scheduled: 'Scheduled',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled',
      no_show: 'No Show',
    };
    const s = status || 'scheduled';
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[s] || styles.scheduled}`}>
        {labels[s] || s}
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
        <div className="bg-sky-50 border-b border-sky-100 px-8 py-2.5 flex items-center justify-between">
          <p className="text-xs text-sky-600">
            <span className="font-medium">Appointment ID:</span>{' '}
            <span className="font-mono text-sky-700">{appointment._id}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-sky-500 font-medium">Status:</span>
            <AppointmentStatusDropdown 
              appointment={appointment} 
              onStatusChange={onStatusChange}
            />
          </div>
        </div>

        {/* ─── Body Content ─── */}
        <div className="px-8 py-6 space-y-6">

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Personal Information Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">First Name</p>
                    <p className="text-sm text-gray-900 font-medium">{appointment.firstName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Last Name</p>
                    <p className="text-sm text-gray-900 font-medium">{appointment.lastName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Gender</p>
                    <p className="text-sm text-gray-900">{appointment.gender}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Date of Birth</p>
                    <p className="text-sm text-gray-900">
                      {new Date(appointment.dateOfBirth).toLocaleDateString()}
                      <span className="ml-1 text-gray-400 text-xs">({calculateAge(appointment.dateOfBirth)} yrs)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Contact & Address Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Contact & Address</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm text-gray-900">{appointment.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-gray-900">{appointment.cellPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-sm text-gray-900">{appointment.address}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {appointment.city && `${appointment.city}, `}
                      {appointment.province} {appointment.postalCode}
                      {appointment.country && `, ${appointment.country}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Appointment Details Card ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Appointment Details</h3>
              </div>
              <div className="px-5 py-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Date</p>
                      <p className="text-sm text-gray-900 font-medium">{formatDate(appointment.appointmentDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Time</p>
                      <p className="text-sm text-gray-900 font-medium">{appointment.appointmentTime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Reason for Appointment</p>
                    <p className="text-sm text-gray-900 bg-gray-50 border border-gray-100 rounded-lg p-3 leading-relaxed">{appointment.reason}</p>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="flex items-start gap-2">
                    <ClipboardList className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Additional Notes</p>
                      <p className="text-sm text-gray-900 bg-amber-50/60 border border-amber-100 rounded-lg p-3 leading-relaxed">{appointment.notes}</p>
                    </div>
                  </div>
                )}
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
              <div className="px-5 py-4 space-y-3.5">
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Healthcare Number</p>
                  <p className="text-sm text-gray-900 font-mono tracking-wide">{appointment.healthcareNumber}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Healthcare Province</p>
                  <p className="text-sm text-gray-900">{appointment.healthcareProvince}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Record Timestamps (full width footer) ── */}
          <div className="border-t border-dashed border-gray-200 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Record Timestamps</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Created</p>
                <p className="text-sm text-gray-700">{new Date(appointment.createdAt).toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Last Updated</p>
                <p className="text-sm text-gray-700">{new Date(appointment.updatedAt || appointment.createdAt).toLocaleString()}</p>
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

export default AppointmentDetailModal;