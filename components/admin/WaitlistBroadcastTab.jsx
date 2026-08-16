'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { Mail, Send, User, ChevronRight, X, Sparkles } from 'lucide-react';

export default function WaitlistBroadcastTab({ theme }) {
    const isDark = theme === 'dark';
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
            const response = await dashboardService.previewWaitlistBroadcast(statusFilter);
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
            const payload = {
                subject,
                message,
                statusFilter: targetEmail ? undefined : statusFilter,
                targetEmail: targetEmail || undefined,
            };

            const response = await dashboardService.sendWaitlistBroadcast(payload);
            if (response.success) {
                setResult(response);
                setSubject('');
                setMessage('');
                setTargetEmail('');
            } else {
                setError(response.message || 'Failed to send broadcast');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending broadcast');
        } finally {
            setLoading(false);
        }
    };

    const canSend = subject.trim() && message.trim() && (targetEmail.trim() || recipientCount > 0);

    return (
        <div className={`rounded-2xl border shadow-sm p-6 space-y-6 ${
            isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
        }`}>
            
            {/* Header */}
            <div className={`pb-4 border-b flex items-center gap-3 ${isDark ? 'border-[#334155]' : 'border-[#F1F5F9]'}`}>
                <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                    <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>Waitlist Broadcast Messages</h2>
                    <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
                        Broadcast a premium template email to waitlist segments or target a specific email address
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
                    <label className={`block text-xs font-bold mb-1.5 uppercase ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>
                        Target Email Address <span className="text-gray-400 font-normal lowercase">(optional — leave empty to broadcast to group)</span>
                    </label>
                    <input
                        type="email"
                        value={targetEmail}
                        onChange={(e) => setTargetEmail(e.target.value)}
                        placeholder="e.g. patient@example.com"
                        className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 ${
                            isDark ? 'bg-[#0F172A] border-[#334155] text-slate-200 placeholder-slate-500' : 'bg-white border-[#E2E8F0] text-[#334155] placeholder-[#94A3B8]'
                        }`}
                    />
                </div>

                {/* Status filter — hidden when targeting a specific email */}
                {!targetEmail && (
                    <div>
                        <label className={`block text-xs font-bold mb-1.5 uppercase ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Filter by Waitlist Status</label>
                        <div className="flex items-center gap-3">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={`flex-1 px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer ${
                                    isDark ? 'bg-[#0F172A] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
                                }`}
                            >
                                <option value="all">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Booked">Booked</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Called">Called</option>
                                <option value="Left Voicemail">Left Voicemail</option>
                                <option value="Not Reachable">Not Reachable</option>
                            </select>
                            <div className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border ${
                                isDark ? 'bg-sky-950/60 border-sky-800/60 text-sky-400' : 'bg-sky-50 border-sky-100 text-sky-700'
                            }`}>
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
                    <label className={`block text-xs font-bold mb-1.5 uppercase ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Subject Line *</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter email subject header"
                        className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 ${
                            isDark ? 'bg-[#0F172A] border-[#334155] text-slate-200 placeholder-slate-500' : 'bg-white border-[#E2E8F0] text-[#334155] placeholder-[#94A3B8]'
                        }`}
                    />
                </div>

                {/* Message */}
                <div>
                    <label className={`block text-xs font-bold mb-1.5 uppercase ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Message Body *</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Compose clinical message text here..."
                        rows={8}
                        className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 resize-y ${
                            isDark ? 'bg-[#0F172A] border-[#334155] text-slate-200 placeholder-slate-500' : 'bg-white border-[#E2E8F0] text-[#334155] placeholder-[#94A3B8]'
                        }`}
                    />
                </div>
            </div>

            {/* Send button */}
            <div className={`flex justify-end pt-3 border-t ${isDark ? 'border-[#334155]' : 'border-[#F1F5F9]'}`}>
                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!canSend || loading}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                    <Send className="w-3.5 h-3.5" />
                    {loading ? 'Sending Emails...' : 'Send Broadcast'}
                </button>
            </div>

            {/* Confirmation modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowConfirm(false)} />
                    <div className={`rounded-2xl max-w-md w-full p-6 relative shadow-2xl border space-y-4 ${
                        isDark ? 'bg-[#1E293B] border-[#334155] text-slate-100' : 'bg-white border-gray-100 text-gray-900'
                    }`}>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider">Confirm Broadcast Send</h3>
                            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Please review the details below before sending.</p>
                        </div>
                        
                        <div className={`border p-3.5 rounded-xl text-xs space-y-2 ${isDark ? 'bg-[#0F172A] border-[#334155] text-slate-300' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'}`}>
                            <p><strong>Subject:</strong> {subject}</p>
                            <p>
                                <strong>To:</strong>{' '}
                                {targetEmail
                                    ? targetEmail
                                    : `${recipientCount} waitlist member${recipientCount !== 1 ? 's' : ''} (${statusFilter === 'all' ? 'all statuses' : statusFilter})`}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                                    isDark ? 'bg-[#334155] text-slate-200 hover:bg-[#475569]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
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
