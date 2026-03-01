'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

function AdminLoginConfirmContent() {
    const [status, setStatus] = useState('verifying'); // verifying | success | error
    const [message, setMessage] = useState('Verifying your confirmation link...');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
            setStatus('error');
            setMessage('Invalid confirmation link. Missing required parameters.');
            return;
        }

        confirmLogin(token, email);
    }, [searchParams]);

    const confirmLogin = async (token, email) => {
        try {
            // Step 1: Validate the token via our API
            const response = await fetch('/api/auth/admin-login-confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, email }),
            });

            const data = await response.json();

            if (!data.success) {
                setStatus('error');
                setMessage(data.message || 'Confirmation failed. Please try logging in again.');
                return;
            }

            // Step 2: Use the returned loginToken to create a next-auth session
            setMessage('Confirmation successful! Signing you in...');

            const result = await signIn('credentials', {
                loginToken: data.loginToken,
                redirect: false,
            });

            if (result?.ok) {
                setStatus('success');
                setMessage('Login successful! Redirecting to dashboard...');
                setTimeout(() => {
                    router.push('/admin');
                }, 1500);
            } else {
                setStatus('error');
                setMessage(result?.error || 'Failed to complete sign in. Please try again.');
            }
        } catch (error) {
            console.error('Confirmation error:', error);
            setStatus('error');
            setMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                    {/* Status icon */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${status === 'verifying' ? 'bg-sky-100' :
                            status === 'success' ? 'bg-green-100' :
                                'bg-red-100'
                        }`}>
                        {status === 'verifying' && (
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
                        )}
                        {status === 'success' && (
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {status === 'error' && (
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>

                    <h1 className={`text-2xl font-bold mb-3 ${status === 'verifying' ? 'text-gray-900' :
                            status === 'success' ? 'text-green-800' :
                                'text-red-800'
                        }`}>
                        {status === 'verifying' ? 'Confirming Login...' :
                            status === 'success' ? 'Login Confirmed!' :
                                'Confirmation Failed'}
                    </h1>

                    <p className={`mb-6 ${status === 'error' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {message}
                    </p>

                    {status === 'error' && (
                        <div className="space-y-3">
                            <Link
                                href="/login"
                                className="block w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition-colors text-center font-medium"
                            >
                                Go to Login
                            </Link>
                            <Link
                                href="/"
                                className="block text-gray-500 hover:text-gray-700 text-sm transition-colors"
                            >
                                Go to Homepage
                            </Link>
                        </div>
                    )}

                    {status === 'success' && (
                        <p className="text-gray-500 text-sm">
                            Redirecting to admin dashboard...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AdminLoginConfirm() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="max-w-md w-full">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">Confirming Login...</h1>
                            <p className="text-gray-600">Verifying your confirmation link...</p>
                        </div>
                    </div>
                </div>
            }
        >
            <AdminLoginConfirmContent />
        </Suspense>
    );
}
