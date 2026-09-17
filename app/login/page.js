'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();
  const { signIn } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Step 1: Check if this is an admin login (requires email confirmation)
      const checkResponse = await fetch('/api/auth/admin-login-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        setError(checkData.message || 'Invalid email or password. Please try again.');
        return;
      }

      // If admin — redirect to the verification code entry page
      if (checkData.requiresConfirmation) {
        // Store password temporarily in sessionStorage so the verification
        // page can support "Resend Code" without re-entering credentials.
        // sessionStorage is cleared when the tab/browser closes.
        sessionStorage.setItem('_adminLoginPwd', formData.password);
        router.push(`/admin-login-pending?email=${encodeURIComponent(formData.email)}`);
        return;
      }

      // Step 2: Non-admin — proceed with normal next-auth sign in
      const result = await signIn(formData.email, formData.password);

      if (result?.ok) {
        router.push('/');
      } else {
        // Display the specific error from the backend (e.g., rate limit, invalid credentials)
        setError(result?.error || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-50 font-sans">
      {/* Left Side - Animated Video Section with Diagonal Cut */}
      <div className="relative w-full lg:w-[56%] h-[26vh] sm:h-[36vh] lg:h-screen flex-shrink-0 overflow-hidden [clip-path:polygon(0_0,100%_0,100%_80%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)] z-10 bg-slate-900">
        {/* Background Video */}
        <video
          src="https://res.cloudinary.com/dveill0ji/video/upload/v1789562225/StmaryBackvid_ew7noz.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle Overlay for contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-900/40" />

        {/* Logo at Left Upper Edge of Video */}
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-20">
          <Link href="/" className="block group">
            <div className="bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-white/60 transition-transform duration-300 group-hover:scale-105 flex items-center">
              <Image
                src="/St.MaryLOGO2.svg"
                alt="St Mary Rideau Clinic Logo"
                width={150}
                height={45}
                className="object-contain h-7 sm:h-9 w-auto"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Video Hero Caption (Desktop Only) */}
        <div className="hidden lg:flex absolute bottom-12 left-10 right-24 z-20 flex-col text-white max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 text-sky-200 text-xs font-semibold tracking-wide w-fit mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            St. Mary Rideau Family Clinic
          </div>
        </div>
      </div>

      {/* Right Side - Login Form Section */}
      <div className="flex-1 flex flex-col justify-start lg:justify-center items-center p-4 sm:p-10 lg:p-12 z-0 -mt-6 lg:mt-0 lg:-ml-12 relative bg-gradient-to-br from-slate-50 via-sky-50/20 to-slate-100">
        <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 my-auto">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 mb-4 border border-sky-100 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-sm mt-1.5">Sign in to the Dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50/90 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2.5 animate-fadeIn">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl focus:outline-none text-slate-900 font-medium text-sm transition-all ${
                    validationErrors.email
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:bg-white'
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-900 font-medium text-sm focus:outline-none transition-all pr-12 ${
                    validationErrors.password
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:bg-white'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{validationErrors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="ml-2 text-slate-600 text-xs font-medium">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3.5 px-4 rounded-xl font-semibold text-sm shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="text-slate-500 mt-8 text-center text-xs font-medium border-t border-slate-100 pt-6">
            New Staff Member?{' '}
            <Link href="/signup" className="text-sky-600 hover:text-sky-700 font-semibold transition-colors">
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}