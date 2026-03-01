'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AdminLoginPendingContent() {
    const [error, setError] = useState('');
    const [resent, setResent] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                    {/* Email icon */}
                    <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        Check Your Email
                    </h1>

                    <p className="text-gray-600 mb-2">
                        A confirmation link has been sent to
                    </p>

                    {email && (
                        <p className="text-sky-600 font-semibold mb-4 break-all">
                            {email}
                        </p>
                    )}

                    <p className="text-gray-500 text-sm mb-6">
                        Click the link in your email to complete your admin login.
                        The link will expire in <strong>15 minutes</strong>.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <p className="text-amber-800 text-sm">
                                Don&apos;t see the email? Check your spam folder or try logging in again.
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    {resent && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                            A new confirmation email has been sent!
                        </div>
                    )}

                    <div className="space-y-3">
                        <Link
                            href="/login"
                            className="block w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition-colors text-center font-medium"
                        >
                            Back to Login
                        </Link>

                        <Link
                            href="/"
                            className="block text-gray-500 hover:text-gray-700 text-sm transition-colors"
                        >
                            Go to Homepage
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
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="max-w-md w-full">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">Loading...</h1>
                        </div>
                    </div>
                </div>
            }
        >
            <AdminLoginPendingContent />
        </Suspense>
    );
}
