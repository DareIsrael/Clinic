'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { History, Calendar, User, Eye, ChevronDown, Sparkles } from 'lucide-react';

export default function BroadcastHistoryTab({ theme }) {
    const isDark = theme === 'dark';
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
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <History className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                        <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>Broadcast Send History</h2>
                        <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
                            Total: {pagination.total} broadcast messages recorded
                        </p>
                    </div>
                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className={`px-3 py-1.5 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer ${
                        isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
                    }`}
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
                <div className={`text-center py-12 text-xs border rounded-xl font-medium ${
                    isDark ? 'bg-[#1E293B] border-[#334155] text-slate-400' : 'bg-[#F8FAFC]/50 border-[#E2E8F0] text-[#94A3B8]'
                }`}>
                    <p className={`font-bold ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>No broadcast logs found</p>
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
                                    className={`border rounded-xl overflow-hidden transition ${
                                        isDark ? 'bg-[#1E293B] border-[#334155] hover:border-[#475569]' : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                                    }`}
                                >
                                    {/* Header Row */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : msg._id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${
                                            isDark ? 'hover:bg-[#0F172A]' : 'hover:bg-[#F8FAFC]'
                                        }`}
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
                                            <span className={`text-xs font-bold truncate ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>
                                                {msg.subject}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                            <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-[#94A3B8]'}`}>
                                                {formatDate(msg.createdAt)}
                                            </span>
                                            
                                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-lg">{msg.sent} sent</span>
                                                {msg.failed > 0 && (
                                                    <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-lg">{msg.failed} failed</span>
                                                )}
                                            </div>

                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                                isDark ? 'text-slate-400' : 'text-[#94A3B8]'
                                            } ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>

                                    {/* Expanded Detail Panel */}
                                    {isExpanded && (
                                        <div className={`border-t p-4 space-y-4 ${
                                            isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                                        }`}>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-bold uppercase tracking-wider">
                                                <div>
                                                    <span className={`block mb-0.5 ${isDark ? 'text-slate-500' : 'text-[#94A3B8]'}`}>Author</span>
                                                    <span className={isDark ? 'text-slate-200' : 'text-[#334155]'}>{msg.sentBy || 'Admin'}</span>
                                                </div>
                                                <div>
                                                    <span className={`block mb-0.5 ${isDark ? 'text-slate-500' : 'text-[#94A3B8]'}`}>Total Receivers</span>
                                                    <span className={isDark ? 'text-slate-200' : 'text-[#334155]'}>{msg.recipientCount}</span>
                                                </div>
                                                <div>
                                                    <span className={`block mb-0.5 ${isDark ? 'text-slate-500' : 'text-[#94A3B8]'}`}>Target Criteria</span>
                                                    <span className={`lowercase truncate block max-w-[150px] ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>
                                                        {msg.targetEmail
                                                            ? msg.targetEmail
                                                            : msg.statusFilter === 'all'
                                                                ? 'All statuses'
                                                                : msg.statusFilter}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className={`block mb-0.5 ${isDark ? 'text-slate-500' : 'text-[#94A3B8]'}`}>Channel</span>
                                                    <span className={isDark ? 'text-slate-200' : 'text-[#334155]'}>{msg.type}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#94A3B8]'}`}>Message Content</span>
                                                <div className={`border rounded-xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto font-medium ${
                                                    isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#475569]'
                                                }`}>
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
                        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-[#334155]' : 'border-[#F1F5F9]'}`}>
                            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
                                Page {pagination.page} of {pagination.pages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fetchHistory(pagination.page - 1)}
                                    disabled={pagination.page <= 1}
                                    className={`px-3.5 py-1.5 text-xs font-bold border rounded-xl disabled:opacity-50 transition ${
                                        isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200 hover:bg-[#334155]' : 'bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]'
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => fetchHistory(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.pages}
                                    className={`px-3.5 py-1.5 text-xs font-bold border rounded-xl disabled:opacity-50 transition ${
                                        isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200 hover:bg-[#334155]' : 'bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]'
                                    }`}
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
