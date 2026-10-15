"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const TYPE_CONFIG = {
  emergency: {
    bg: "bg-red-600",
    text: "text-white",
    border: "border-red-700",
    badge: "bg-red-800 text-red-100",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    pulse: true,
  },
  warning: {
    bg: "bg-amber-500",
    text: "text-white",
    border: "border-amber-600",
    badge: "bg-amber-700 text-amber-100",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    pulse: false,
  },
  success: {
    bg: "bg-emerald-600",
    text: "text-white",
    border: "border-emerald-700",
    badge: "bg-emerald-800 text-emerald-100",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    pulse: false,
  },
  update: {
    bg: "bg-sky-700",
    text: "text-white",
    border: "border-sky-800",
    badge: "bg-sky-900 text-sky-100",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    pulse: false,
  },
  info: {
    bg: "bg-sky-600",
    text: "text-white",
    border: "border-sky-700",
    badge: "bg-sky-800 text-sky-100",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    pulse: false,
  },
};

const DISMISS_KEY = "st_mary_banner_dismissed";

export default function EmergencyBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(true); // start true so nothing flashes on SSR
  const [expanded, setExpanded] = useState(false);

  // On mount, check if banner was dismissed for these specific announcement ids
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(DISMISS_KEY) || "[]");
      // We only dismiss if we already know the ids — will re-evaluate after fetch
      if (!Array.isArray(stored) || stored.length === 0) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await fetch("/api/emergency-teaser");
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.teasers) && data.teasers.length > 0) {
        setAnnouncements(data.teasers);

        // Check dismissal against actual fetched ids
        try {
          const stored = JSON.parse(sessionStorage.getItem(DISMISS_KEY) || "[]");
          const fetchedIds = data.teasers.map((a) => a._id);
          // If every fetched announcement was already dismissed, keep hidden
          const allDismissed = fetchedIds.every((id) => stored.includes(id));
          setDismissed(allDismissed);
        } catch {
          setDismissed(false);
        }
      }
    } catch {
      // Silently fail — banner is non-critical UI
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
    // Re-fetch every 2 minutes so new announcements appear without a page reload
    const interval = setInterval(fetchAnnouncements, 120_000);
    return () => clearInterval(interval);
  }, [fetchAnnouncements]);

  // Auto-cycle through multiple announcements
  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
      setExpanded(false);
    }, 9000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(
        DISMISS_KEY,
        JSON.stringify(announcements.map((a) => a._id))
      );
    } catch {
      // ignore
    }
  };

  // Nothing to show
  if (dismissed || announcements.length === 0) return null;

  const ann = announcements[current];
  if (!ann) return null;

  const config = TYPE_CONFIG[ann.type] || TYPE_CONFIG.info;
  const isLong = ann.content && ann.content.length > 120;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`w-full ${config.bg} ${config.text} ${config.border} border-b shadow-md`}
      style={{ zIndex: 45 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-start gap-3">

          {/* Pulsing dot for emergency type */}
          {config.pulse && (
            <span className="flex-shrink-0 relative flex h-3 w-3 mt-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-300" />
            </span>
          )}

          {/* Type icon */}
          <span className="flex-shrink-0 mt-0.5">
            {config.icon}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badge} uppercase tracking-wider`}>
                {ann.type}
              </span>
              <span className="font-bold text-sm sm:text-base leading-snug">
                {ann.title}
              </span>
            </div>

            {ann.content && (
              <p className={`text-sm leading-relaxed opacity-95 ${!expanded && isLong ? "line-clamp-1" : ""}`}>
                {ann.content}
              </p>
            )}

            <div className="flex items-center gap-4 mt-1">
              {isLong && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="text-xs underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity font-medium"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}

              {/* Dot navigation for multiple announcements */}
              {announcements.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {announcements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrent(i);
                        setExpanded(false);
                      }}
                      aria-label={`Announcement ${i + 1}`}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === current
                          ? "opacity-100 scale-125 bg-white"
                          : "opacity-40 bg-white"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Button — only when both label and URL are present */}
          
          {/* CTA Button — white background with sky-blue label */}
          {ann.buttonLabel && ann.buttonUrl && (
            ann.buttonUrl.startsWith("/") ? (
              <Link
                href={ann.buttonUrl}
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-sky-700 text-sm font-semibold rounded-full border border-white/80 shadow-sm transition-all duration-200 hover:bg-sky-50 hover:border-sky-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700 self-center"
              >
                {ann.buttonLabel}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M7 7h10v10"
                  />
                </svg>
              </Link>
            ) : (
              <a
                href={ann.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-sky-700 text-sm font-semibold rounded-full border border-white/80 shadow-sm transition-all duration-200 hover:bg-sky-50 hover:border-sky-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700 self-center"
              >
                {ann.buttonLabel}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M7 7h10v10"
                  />
                </svg>
              </a>
            )
          )}

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="flex-shrink-0 p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-white/20 transition-all duration-200 mt-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
