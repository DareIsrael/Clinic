'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { History, Calendar, User, Eye, ChevronDown, Sparkles } from 'lucide-react';

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
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-6">
            
            {/* Header */}
            <div className="pb-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <History className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Broadcast Send History</h2>
                        <p className="text-xs text-[#64748B] mt-0.5 font-semibold">
                            Total: {pagination.total} broadcast messages recorded
                        </p>
                    </div>
                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer"
                >
                    <option value="all">All Channels</option>
                    <option value="waitlist">Waitlist Channel</option>
                    <option value="appointment">Appointment Channel</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
                    <p className="mt-3 text-xs text-[#94A3B8]">Loading history...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#94A3B8] border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]/50">
                    <p className="font-bold text-[#475569]">No broadcast logs found</p>
                    <p className="mt-0.5 font-medium">When you send dynamic broadcast messages, details will appear here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="space-y-2">
                        {messages.map((msg) => {
                            const isExpanded = expandedId === msg._id;
                            return (
                                <div
                                    key={msg._id}
                                    className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white hover:border-[#CBD5E1] transition"
                                >
                                    {/* Header Row */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : msg._id)}
                                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F8FAFC] transition"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span
                                                className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                                                    msg.type === 'waitlist'
                                                        ? 'bg-purple-50 text-purple-700'
                                                        : 'bg-sky-50 text-sky-700'
                                                }`}
                                            >
                                                {msg.type}
                                            </span>
                                            <span className="text-xs font-bold text-[#334155] truncate">
                                                {msg.subject}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                            <span className="text-[10px] text-[#94A3B8] font-bold">
                                                {formatDate(msg.createdAt)}
                                            </span>
                                            
                                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-lg">{msg.sent} sent</span>
                                                {msg.failed > 0 && (
                                                    <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-lg">{msg.failed} failed</span>
                                                )}
                                            </div>

                                            <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${
                                                isExpanded ? 'rotate-180' : ''
                                            }`} />
                                        </div>
                                    </button>

                                    {/* Expanded Detail Panel */}
                                    {isExpanded && (
                                        <div className="border-t border-[#E2E8F0] p-4 bg-[#F8FAFC] space-y-4">
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                                <div>
                                                    <span className="text-[#94A3B8] block mb-0.5">Author</span>
                                                    <span className="text-[#334155]">{msg.sentBy || 'Admin'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#94A3B8] block mb-0.5">Total Receivers</span>
                                                    <span className="text-[#334155]">{msg.recipientCount}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#94A3B8] block mb-0.5">Target Criteria</span>
                                                    <span className="text-[#334155] lowercase truncate block max-w-[150px]">
                                                        {msg.targetEmail
                                                            ? msg.targetEmail
                                                            : msg.statusFilter === 'all'
                                                                ? 'All statuses'
                                                                : msg.statusFilter}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-[#94A3B8] block mb-0.5">Channel</span>
                                                    <span className="text-[#334155]">{msg.type}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Message Content</span>
                                                <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-xs text-[#475569] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto font-medium">
                                                    {msg.message}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination control */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                            <span className="text-xs text-[#64748B] font-semibold">
                                Page {pagination.page} of {pagination.pages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fetchHistory(pagination.page - 1)}
                                    disabled={pagination.page <= 1}
                                    className="px-3.5 py-1.5 text-xs font-bold text-[#334155] bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] disabled:opacity-50 transition"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => fetchHistory(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.pages}
                                    className="px-3.5 py-1.5 text-xs font-bold text-[#334155] bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] disabled:opacity-50 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
