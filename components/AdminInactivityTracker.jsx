'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';

/**
 * AdminInactivityTracker
 *
 * Automatically signs out admin users after a period of inactivity.
 * - Only activates for users with role === 'admin'
 * - Tracks real user interaction (click, keydown, mousemove, scroll, touch)
 * - Uses localStorage so the timer survives page refresh
 * - Syncs across browser tabs via the 'storage' event
 * - Shows a warning modal before logout
 *
 * ──────────────────────────────────────────────────────
 *  FOR TESTING: change these two constants to smaller
 *  values, e.g. 2 * 60 * 1000 (2 min) and 30 * 1000 (30s)
 * ──────────────────────────────────────────────────────
 */
const INACTIVITY_LIMIT_MS = 4 * 60 * 60 * 1000; // 4 hours
const WARNING_BEFORE_MS = 60 * 1000;             // 1 minute before logout

const STORAGE_KEY = 'adminLastActivity';
const CHECK_INTERVAL_MS = 10_000; // how often to check (10 seconds)
const THROTTLE_MS = 1000;         // throttle mousemove/scroll to 1/sec

export default function AdminInactivityTracker() {
  const { data: session, status } = useSession();
  const [showWarning, setShowWarning] = useState(false);

  // Refs to avoid stale closures inside setInterval and event handlers
  const warningVisibleRef = useRef(false);
  const lastThrottleRef = useRef(0);
  const intervalRef = useRef(null);
  const isAdminRef = useRef(false);

  // Determine if current user is admin
  const isAdmin = status === 'authenticated' && session?.user?.role === 'admin';

  // Keep ref in sync so interval callback always has current value
  isAdminRef.current = isAdmin;

  // ─── Touch localStorage ───────────────────────────────────
  const touchActivity = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    // If warning is showing, dismiss it
    if (warningVisibleRef.current) {
      warningVisibleRef.current = false;
      setShowWarning(false);
    }
  }, []);

  // ─── Event handler (throttled for mousemove/scroll) ───────
  const handleUserActivity = useCallback((e) => {
    const now = Date.now();
    // Throttle high-frequency events
    if (e.type === 'mousemove' || e.type === 'scroll') {
      if (now - lastThrottleRef.current < THROTTLE_MS) return;
      lastThrottleRef.current = now;
    }
    touchActivity();
  }, [touchActivity]);

  // ─── Main effect: only runs when admin status changes ─────
  useEffect(() => {
    // Don't do anything for non-admin users
    if (!isAdmin) {
      // Clean up if user was admin and is no longer (e.g. session expired)
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Set initial activity timestamp
    touchActivity();

    // ── Register user-interaction listeners ──
    const events = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    // ── Cross-tab sync: when another tab updates localStorage ──
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        // Another tab was active — dismiss warning if showing
        if (warningVisibleRef.current) {
          warningVisibleRef.current = false;
          setShowWarning(false);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // ── Periodic inactivity check ──
    intervalRef.current = setInterval(() => {
      // Safety: if somehow this runs after user is no longer admin
      if (!isAdminRef.current) return;

      const lastActivity = Number(localStorage.getItem(STORAGE_KEY) || Date.now());
      const elapsed = Date.now() - lastActivity;

      // LOGOUT: inactivity limit reached
      if (elapsed >= INACTIVITY_LIMIT_MS) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        localStorage.removeItem(STORAGE_KEY);
        signOut({ callbackUrl: '/login' });
        return;
      }

      // WARNING: approaching limit
      if (elapsed >= INACTIVITY_LIMIT_MS - WARNING_BEFORE_MS) {
        if (!warningVisibleRef.current) {
          warningVisibleRef.current = true;
          setShowWarning(true);
        }
      } else {
        // Not in warning zone — make sure warning is hidden
        if (warningVisibleRef.current) {
          warningVisibleRef.current = false;
          setShowWarning(false);
        }
      }
    }, CHECK_INTERVAL_MS);

    // ── Cleanup ──
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      window.removeEventListener('storage', handleStorageChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAdmin, touchActivity, handleUserActivity]);

  // Don't render anything for non-admin users
  if (!isAdmin || !showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center animate-in fade-in duration-200">
        {/* Warning Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg
            className="h-8 w-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Session Timeout Warning
        </h2>

        <p className="text-gray-600 mb-6">
          You will be automatically logged out due to inactivity.
          Click the button below to continue your session.
        </p>

        <button
          onClick={touchActivity}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-sm"
        >
          Stay Logged In
        </button>

        <p className="text-xs text-gray-400 mt-4">
          This is a security measure to protect patient data.
        </p>
      </div>
    </div>
  );
}