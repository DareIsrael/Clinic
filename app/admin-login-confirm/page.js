'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, XCircle, Loader2, ArrowLeft, Home } from 'lucide-react';

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
                    {/* Status Icon */}
                    <div className="flex justify-center">
                        {status === 'verifying' && (
                            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                                <Loader2 className="w-8 h-8 stroke-[1.5] animate-spin" />
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 animate-bounce">
                                <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                                <XCircle className="w-8 h-8 stroke-[1.5]" />
                            </div>
                        )}
                    </div>

                    {/* Status Heading */}
                    <div className="space-y-2">
                        <h1 className={`text-xl font-bold ${
                            status === 'verifying' ? 'text-slate-900' :
                            status === 'success' ? 'text-emerald-800' : 'text-rose-800'
                        }`}>
                            {status === 'verifying' ? 'Confirming Login...' :
                             status === 'success' ? 'Login Confirmed!' : 'Confirmation Failed'}
                        </h1>
                        <p className={`text-sm leading-relaxed ${
                            status === 'error' ? 'text-rose-600 font-medium' : 'text-slate-500'
                        }`}>
                            {message}
                        </p>
                    </div>

                    {/* Actions and status-specific display */}
                    {status === 'error' ? (
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
                    ) : status === 'success' ? (
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-slate-500 border-t-transparent"></div>
                            Auto-redirecting to dashboard...
                        </div>
                    ) : (
                        <p className="text-xs text-slate-400">
                            Please wait while we establish your secure session.
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
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
                            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Loader2 className="w-6 h-6 stroke-[1.5] text-sky-600 animate-spin" />
                            </div>
                            <h1 className="text-lg font-bold text-slate-900 mb-2">Loading...</h1>
                        </div>
                    </div>
                </div>
            }
        >
            <AdminLoginConfirmContent />
        </Suspense>
    );
}
