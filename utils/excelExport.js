import * as XLSX from 'xlsx';

/**
 * Format date for display in Excel
 */
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return String(dateStr);
  }
};

/**
 * Format waitlist record into a readable key-value row object
 */
const mapWaitlistRecord = (entry) => {
  return {
    'First Name': entry.firstName || 'N/A',
    'Last Name': entry.lastName || 'N/A',
    'Gender': entry.gender || 'N/A',
    'Date of Birth': formatDate(entry.dateOfBirth),
    'Email Address': entry.email || 'N/A',
    'Phone Number': entry.cellPhone || 'N/A',
    'Street Address': entry.address || 'N/A',
    'Country': entry.country || 'N/A',
    'Postal Code': entry.postalCode || 'N/A',
    'Healthcare Number': entry.healthcareNumber || 'N/A',
    'Healthcare Province': entry.healthcareProvince || 'N/A',
    'Status': entry.status || 'Active',
    'Joined Date': formatDate(entry.createdAt),
  };
};

/**
 * Format appointment record into a readable key-value row object
 */
const mapAppointmentRecord = (app) => {
  return {
    'Appointment Reference ID': app._id || 'N/A',
    'First Name': app.firstName || 'N/A',
    'Last Name': app.lastName || 'N/A',
    'Gender': app.gender || 'N/A',
    'Date of Birth': formatDate(app.dateOfBirth),
    'Email Address': app.email || 'N/A',
    'Phone Number': app.cellPhone || 'N/A',
    'Street Address': app.address || 'N/A',
    'City': app.city || 'N/A',
    'Province': app.province || 'N/A',
    'Postal Code': app.postalCode || 'N/A',
    'Country': app.country || 'N/A',
    'Appointment Date': formatDate(app.appointmentDate || app.canadaDate),
    'Appointment Time': app.appointmentTime || 'N/A',
    'Reason for Appointment': app.reason || 'N/A',
    'Additional Notes': app.notes || 'N/A',
    'Healthcare Number': app.healthcareNumber || 'N/A',
    'Healthcare Province': app.healthcareProvince || 'N/A',
    'Status': (app.status || 'scheduled').toUpperCase(),
    'Created At': formatDate(app.createdAt),
  };
};

/**
 * Auto-fit column widths based on max content length
 */
const getAutoColumnWidths = (rows) => {
  if (!rows || rows.length === 0) return [];
  const keys = Object.keys(rows[0]);
  return keys.map((key) => {
    let maxLen = key.length;
    rows.forEach((row) => {
      const val = row[key] ? String(row[key]) : '';
      if (val.length > maxLen) maxLen = val.length;
    });
    return { wch: Math.min(Math.max(maxLen + 3, 10), 50) };
  });
};

/**
 * Export all Waitlist entries to .xlsx
 */
export const exportWaitlistToExcel = (entries, filename = 'waitlist.xlsx') => {
  if (!entries || entries.length === 0) {
    alert('No waitlist data available to download.');
    return;
  }
  const formattedRows = entries.map(mapWaitlistRecord);
  const worksheet = XLSX.utils.json_to_sheet(formattedRows);
  worksheet['!cols'] = getAutoColumnWidths(formattedRows);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Waitlist Patients');
  XLSX.writeFile(workbook, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
};

/**
 * Export individual Waitlist Patient to .xlsx
 */
export const exportWaitlistPatientToExcel = (entry) => {
  if (!entry) return;
  const nameSlug = `${entry.firstName || 'patient'}-${entry.lastName || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = `patient-${nameSlug || 'record'}.xlsx`;

  const formattedRows = [mapWaitlistRecord(entry)];
  const worksheet = XLSX.utils.json_to_sheet(formattedRows);
  worksheet['!cols'] = getAutoColumnWidths(formattedRows);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Patient Record');
  XLSX.writeFile(workbook, filename);
};

/**
 * Export all Appointments to .xlsx
 */
export const exportAppointmentsToExcel = (appointments, filename = 'appointments.xlsx') => {
  if (!appointments || appointments.length === 0) {
    alert('No appointments data available to download.');
    return;
  }
  const formattedRows = appointments.map(mapAppointmentRecord);
  const worksheet = XLSX.utils.json_to_sheet(formattedRows);
  worksheet['!cols'] = getAutoColumnWidths(formattedRows);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');
  XLSX.writeFile(workbook, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
};

/**
 * Export individual Appointment to .xlsx
 */
export const exportAppointmentToExcel = (appointment) => {
  if (!appointment) return;
  const ref = appointment._id ? String(appointment._id).slice(-8) : 'record';
  const filename = `appointment-${ref}.xlsx`;

  const formattedRows = [mapAppointmentRecord(appointment)];
  const worksheet = XLSX.utils.json_to_sheet(formattedRows);
  worksheet['!cols'] = getAutoColumnWidths(formattedRows);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointment Record');
  XLSX.writeFile(workbook, filename);
};
