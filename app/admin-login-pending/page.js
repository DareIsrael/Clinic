'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowLeft, Home, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

function AdminLoginPendingContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const router = useRouter();

    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const [status, setStatus] = useState('idle'); // idle | verifying | success | error
    const [message, setMessage] = useState('');
    const [resending, setResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef([]);

    // Focus the first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const handleDigitChange = (index, value) => {
        // Only allow single numeric digits
        if (value && !/^\d$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        // Clear any previous error when user starts typing
        if (status === 'error') {
            setStatus('idle');
            setMessage('');
        }

        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all 6 digits are filled
        if (value && index === 5) {
            const fullCode = newDigits.join('');
            if (fullCode.length === 6) {
                handleSubmit(fullCode);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Backspace: clear current and move to previous
        if (e.key === 'Backspace') {
            if (!digits[index] && index > 0) {
                const newDigits = [...digits];
                newDigits[index - 1] = '';
                setDigits(newDigits);
                inputRefs.current[index - 1]?.focus();
            }
        }
        // Left arrow
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        // Right arrow
        if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        // Only accept if it looks like a 6-digit code
        if (/^\d{6}$/.test(pastedData)) {
            const newDigits = pastedData.split('');
            setDigits(newDigits);
            inputRefs.current[5]?.focus();
            handleSubmit(pastedData);
        }
    };

    const handleSubmit = async (codeOverride) => {
        const code = codeOverride || digits.join('');
        if (code.length !== 6) {
            setStatus('error');
            setMessage('Please enter all 6 digits.');
            return;
        }

        setStatus('verifying');
        setMessage('Verifying your code...');

        try {
            // Step 1: Verify the code via our API
            const response = await fetch('/api/auth/admin-login-confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, email }),
            });

            const data = await response.json();

            if (!data.success) {
                setStatus('error');
                setMessage(data.message || 'Invalid verification code. Please try again.');
                setDigits(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
                return;
            }

            // Step 2: Use the returned loginToken to create a next-auth session
            setMessage('Code verified! Signing you in...');

            const result = await signIn('credentials', {
                loginToken: data.loginToken,
                redirect: false,
            });

            if (result?.ok) {
                setStatus('success');
                setMessage('Login successful! Redirecting to dashboard...');
                // Clear the stored password
                sessionStorage.removeItem('_adminLoginPwd');
                setTimeout(() => {
                    router.push('/admin');
                }, 1500);
            } else {
                setStatus('error');
                setMessage(result?.error || 'Failed to complete sign in. Please try again.');
                setDigits(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('error');
            setMessage('An unexpected error occurred. Please try again.');
            setDigits(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    const handleResendCode = async () => {
        const storedPassword = sessionStorage.getItem('_adminLoginPwd');
        if (!storedPassword || !email) {
            setStatus('error');
            setMessage('Session expired. Please go back to the login page and try again.');
            return;
        }

        setResending(true);
        setStatus('idle');
        setMessage('');

        try {
            const response = await fetch('/api/auth/admin-login-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: storedPassword }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setDigits(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
                setMessage('A new verification code has been sent to your email.');
                setStatus('idle');
                setResendCooldown(60); // 60-second cooldown before next resend
            } else {
                setStatus('error');
                setMessage(data.message || 'Failed to resend code. Please try again.');
            }
        } catch (error) {
            console.error('Resend error:', error);
            setStatus('error');
            setMessage('Failed to resend code. Please try again.');
        } finally {
            setResending(false);
        }
    };

    const isSubmitDisabled = digits.join('').length !== 6 || status === 'verifying' || status === 'success';

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
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                        status === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        status === 'error' ? 'bg-rose-50 text-rose-600' :
                        'bg-sky-50 text-sky-600'
                    }`}>
                        {status === 'verifying' ? (
                            <Loader2 className="w-8 h-8 stroke-[1.5] animate-spin" />
                        ) : status === 'success' ? (
                            <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
                        ) : (
                            <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
                        )}
                    </div>

                    {/* Heading & Subheading */}
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-slate-900">
                            {status === 'success' ? 'Login Confirmed!' : 'Enter Verification Code'}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {status === 'success'
                                ? 'Redirecting to dashboard...'
                                : 'A 6-digit verification code has been sent to:'}
                        </p>
                    </div>

                    {/* Email Display */}
                    {email && status !== 'success' && (
                        <div className="bg-slate-50 rounded-xl border border-slate-100 p-3.5 break-all">
                            <span className="text-sm font-semibold text-sky-600">
                                {email}
                            </span>
                        </div>
                    )}

                    {/* 6-Digit Code Inputs */}
                    {status !== 'success' && (
                        <div className="flex justify-center gap-2.5">
                            {digits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleDigitChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    disabled={status === 'verifying'}
                                    className={`w-11 h-13 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none
                                        ${status === 'error'
                                            ? 'border-rose-300 text-rose-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
                                            : digit
                                                ? 'border-sky-400 text-sky-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                                                : 'border-slate-200 text-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                                        }
                                        ${status === 'verifying' ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                    aria-label={`Digit ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Status / Error Messages */}
                    {message && (
                        <p className={`text-sm font-medium ${
                            status === 'error' ? 'text-rose-600' :
                            status === 'success' ? 'text-emerald-600' :
                            'text-sky-600'
                        }`}>
                            {message}
                        </p>
                    )}

                    {/* Verify Button */}
                    {status !== 'success' && (
                        <button
                            onClick={() => handleSubmit()}
                            disabled={isSubmitDisabled}
                            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            {status === 'verifying' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Code'
                            )}
                        </button>
                    )}

                    {/* Expiry & Resend Info */}
                    {status !== 'success' && (
                        <div className="space-y-3">
                            <p className="text-xs text-slate-500 leading-relaxed">
                                The code will expire in <strong className="text-slate-800 font-semibold">10 minutes</strong>.
                            </p>

                            {/* Resend Code Button */}
                            <button
                                onClick={handleResendCode}
                                disabled={resending || resendCooldown > 0 || status === 'verifying'}
                                className="text-xs font-semibold text-sky-600 hover:text-sky-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5 mx-auto"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                                {resending
                                    ? 'Sending...'
                                    : resendCooldown > 0
                                        ? `Resend code in ${resendCooldown}s`
                                        : "Didn't receive the code? Resend"}
                            </button>
                        </div>
                    )}

                    {/* Success auto-redirect indicator */}
                    {status === 'success' && (
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-slate-500 border-t-transparent"></div>
                            Auto-redirecting to dashboard...
                        </div>
                    )}

                    {/* Spam Alert / Note */}
                    {status !== 'success' && (
                        <div className="bg-amber-50/60 border border-amber-100/80 rounded-xl p-4 flex gap-3 text-left">
                            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-amber-900">Can&apos;t find the email?</p>
                                <p className="text-[11px] text-amber-700 leading-relaxed">
                                    Please check your spam or promotions folder, or ensure you entered the correct address.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    {status !== 'success' && (
                        <div className="pt-2 space-y-3">
                            <Link
                                href="/login"
                                className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                                onClick={() => sessionStorage.removeItem('_adminLoginPwd')}
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                            </Link>

                            <Link
                                href="/"
                                className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                                onClick={() => sessionStorage.removeItem('_adminLoginPwd')}
                            >
                                <Home className="w-3.5 h-3.5 text-slate-400" /> Go to Homepage
                            </Link>
                        </div>
                    )}
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
