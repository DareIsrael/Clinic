'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';

export default function WaitlistBroadcastTab() {
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
            const payload = { subject, message };
            if (targetEmail) {
                payload.targetEmail = targetEmail;
            } else {
                payload.statusFilter = statusFilter;
            }

            const response = await dashboardService.broadcastToWaitlist(payload);
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
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Waitlist Messages</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Send an email to waitlist members — broadcast to a group or target a specific email
                </p>
            </div>

            {/* Success result */}
            {result && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{result.message}</span>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Target email input */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Email <span className="text-gray-400 font-normal">(optional — leave empty to broadcast)</span>
                </label>
                <input
                    type="email"
                    value={targetEmail}
                    onChange={(e) => setTargetEmail(e.target.value)}
                    placeholder="e.g. patient@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {/* Status filter — hidden when targeting a specific email */}
            {!targetEmail && (
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                        <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                            {previewLoading ? (
                                <span className="animate-pulse">Loading...</span>
                            ) : (
                                `${recipientCount ?? '—'} recipient${recipientCount !== 1 ? 's' : ''}`
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Subject */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email subject line"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {/* Message */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y"
                />
            </div>

            {/* Send button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!canSend || loading}
                    className="bg-sky-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        'Send Email'
                    )}
                </button>
            </div>

            {/* Confirmation modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Send</h3>
                        <p className="text-gray-600 text-sm mb-1">
                            <strong>Subject:</strong> {subject}
                        </p>
                        <p className="text-gray-600 text-sm mb-4">
                            <strong>To:</strong>{' '}
                            {targetEmail
                                ? targetEmail
                                : `${recipientCount} waitlist member${recipientCount !== 1 ? 's' : ''} (${statusFilter === 'all' ? 'all statuses' : statusFilter})`}
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition"
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
