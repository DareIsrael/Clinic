'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';

export default function BroadcastHistoryTab() {
    const [messages, setMessages] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [typeFilter, setTypeFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchHistory(1);
    }, [typeFilter]);

    const fetchHistory = async (page = 1) => {
        try {
            setLoading(true);
            const response = await dashboardService.getBroadcastHistory(page, 15, typeFilter);
            if (response.success) {
                setMessages(response.messages || []);
                setPagination(response.pagination);
            }
        } catch (err) {
            console.error('History error:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Broadcast History</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {pagination.total} message{pagination.total !== 1 ? 's' : ''} sent
                    </p>
                </div>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    <option value="all">All Types</option>
                    <option value="waitlist">Waitlist</option>
                    <option value="appointment">Appointment</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    <svg className="animate-spin h-8 w-8 mx-auto mb-3 text-sky-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg font-medium">No broadcasts sent yet</p>
                    <p className="text-sm mt-1">Messages you send will appear here for reference.</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                {/* Row header */}
                                <button
                                    onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${msg.type === 'waitlist'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {msg.type === 'waitlist' ? 'Waitlist' : 'Appointment'}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 truncate">
                                            {msg.subject}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                            {formatDate(msg.createdAt)}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-green-600 font-medium">{msg.sent} sent</span>
                                            {msg.failed > 0 && (
                                                <span className="text-red-500 font-medium">{msg.failed} failed</span>
                                            )}
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === msg._id ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expanded details */}
                                {expandedId === msg._id && (
                                    <div className="border-t border-gray-200 px-4 py-4 bg-gray-50">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs text-gray-600">
                                            <div>
                                                <span className="font-medium text-gray-500 block">Sent by</span>
                                                {msg.sentBy}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Recipients</span>
                                                {msg.recipientCount}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Filter</span>
                                                {msg.targetEmail
                                                    ? `Target: ${msg.targetEmail}`
                                                    : msg.statusFilter === 'all'
                                                        ? 'All statuses'
                                                        : msg.statusFilter}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Type</span>
                                                {msg.type === 'waitlist' ? 'Waitlist' : 'Appointment'}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-500 text-xs block mb-1">Message</span>
                                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                            <span className="text-sm text-gray-600">
                                Page {pagination.page} of {pagination.pages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fetchHistory(pagination.page - 1)}
                                    disabled={pagination.page <= 1}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => fetchHistory(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.pages}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
