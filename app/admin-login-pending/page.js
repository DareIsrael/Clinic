'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, Home, AlertCircle } from 'lucide-react';

function AdminLoginPendingContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                {/* Logo section */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/St.MaryLOGO2.svg"
                        alt="St Mary Rideau Clinic Logo"
                        width={220}
                        height={60}
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center space-y-6">
                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto text-sky-600">
                        <Mail className="w-8 h-8 stroke-[1.5]" />
                    </div>

                    {/* Heading & Subheading */}
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-slate-900">
                            Check Your Email
                        </h1>
                        <p className="text-sm text-slate-500">
                            A secure login confirmation link has been sent to:
                        </p>
                    </div>

                    {/* Email Display */}
                    {email && (
                        <div className="bg-slate-50 rounded-xl border border-slate-100 p-3.5 break-all">
                            <span className="text-sm font-semibold text-sky-600">
                                {email}
                            </span>
                        </div>
                    )}

                    {/* Details and Info */}
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Please click the confirmation button or link in that email to complete your sign in. 
                        The link will automatically expire in <strong className="text-slate-800 font-semibold">15 minutes</strong>.
                    </p>

                    {/* Spam Alert / Note */}
                    <div className="bg-amber-50/60 border border-amber-100/80 rounded-xl p-4 flex gap-3 text-left">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-amber-900">Can't find the email?</p>
                            <p className="text-[11px] text-amber-700 leading-relaxed">
                                Please check your spam or promotions folder, or ensure you entered the correct address.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 space-y-3">
                        <Link
                            href="/login"
                            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                        </Link>

                        <Link
                            href="/"
                            className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <Home className="w-3.5 h-3.5 text-slate-400" /> Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminLoginPending() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
                            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-sky-600 border-t-transparent"></div>
                            </div>
                            <h1 className="text-lg font-bold text-slate-900 mb-2">Loading...</h1>
                        </div>
                    </div>
                </div>
            }
        >
            <AdminLoginPendingContent />
        </Suspense>
    );
}
