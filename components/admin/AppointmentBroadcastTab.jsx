'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { Mail, Send, Sparkles } from 'lucide-react';

export default function AppointmentBroadcastTab() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [targetEmail, setTargetEmail] = useState('');
    const [recipientCount, setRecipientCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    // Fetch recipient count when statusFilter changes (and no targetEmail)
    useEffect(() => {
        if (!targetEmail) {
            fetchPreview();
        }
    }, [statusFilter]);

    const fetchPreview = async () => {
        try {
            setPreviewLoading(true);
            const response = await dashboardService.previewAppointmentBroadcast(statusFilter);
            if (response.success) {
                setRecipientCount(response.count);
            }
        } catch (err) {
            console.error('Preview error:', err);
        } finally {
            setPreviewLoading(false);
        }
    };

    const handleSend = async () => {
        setShowConfirm(false);
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const payload = { subject, message };
            if (targetEmail) {
                payload.targetEmail = targetEmail;
            } else {
                payload.statusFilter = statusFilter;
            }

            const response = await dashboardService.broadcastToAppointments(payload);
            if (response.success) {
                setResult(response);
                setSubject('');
                setMessage('');
                setTargetEmail('');
            } else {
                setError(response.message || 'Failed to send emails');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while sending emails');
        } finally {
            setLoading(false);
        }
    };

    const canSend = subject.trim() && message.trim() && (targetEmail || recipientCount > 0);

    return (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-6">
            
            {/* Header */}
            <div className="pb-4 border-b border-[#F1F5F9] flex items-center gap-3">
                <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Appointment Broadcast Messages</h2>
                    <p className="text-xs text-[#64748B] mt-0.5 font-semibold">
                        Send automated updates and broadcast announcements directly to patient email records
                    </p>
                </div>
            </div>

            {/* Success result */}
            {result && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{result.message}</span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-xl text-xs font-bold">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {/* Target email input */}
                <div>
                    <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                        Target Email Address <span className="text-gray-400 font-normal lowercase">(optional — leave empty to broadcast to group)</span>
                    </label>
                    <input
                        type="email"
                        value={targetEmail}
                        onChange={(e) => setTargetEmail(e.target.value)}
                        placeholder="e.g. patient@example.com"
                        className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
                    />
                </div>

                {/* Status filter — hidden when targeting a specific email */}
                {!targetEmail && (
                    <div>
                        <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">Filter by Appointment Status</label>
                        <div className="flex items-center gap-3">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no_show">No Show</option>
                            </select>
                            <div className="bg-sky-50 border border-sky-100 text-sky-700 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap">
                                {previewLoading ? (
                                    <span className="animate-pulse">Calculating recipients...</span>
                                ) : (
                                    `${recipientCount ?? '—'} target recipients`
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Subject */}
                <div>
                    <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">Subject Line *</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter email subject header"
                        className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">Message Body *</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Compose clinical message text here..."
                        rows={8}
                        className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 resize-y"
                    />
                </div>
            </div>

            {/* Send button */}
            <div className="flex justify-end pt-3 border-t border-[#F1F5F9]">
                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!canSend || loading}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                >
                    <Send className="w-3.5 h-3.5" />
                    {loading ? 'Sending Emails...' : 'Send Broadcast'}
                </button>
            </div>

            {/* Confirmation modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl border border-[#E2E8F0] space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Confirm Send</h3>
                            <p className="text-xs text-gray-500 mt-1">Please review the details below before sending.</p>
                        </div>
                        
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl text-xs space-y-2 text-[#334155]">
                            <p><strong>Subject:</strong> {subject}</p>
                            <p>
                                <strong>To:</strong>{' '}
                                {targetEmail
                                    ? targetEmail
                                    : `${recipientCount} patient${recipientCount !== 1 ? 's' : ''} (${statusFilter === 'all' ? 'all statuses' : statusFilter})`}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition"
                            >
                                Confirm & Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
