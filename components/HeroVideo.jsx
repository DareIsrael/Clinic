"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Never download the 8.2MB background video on mobile/tablet viewports (< 1024px)
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    // Respect user data-saver or reduced-motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (prefersReducedMotion || saveData) return;

    const loadAndPlay = () => {
      const video = videoRef.current;
      if (!video || video.src) return;
      video.src = "/StmaryBackvid.mp4";
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy; poster remains visible
        });
      }
    };

    // Defer video loading until after initial paint / browser idle
    let idleId;
    let timerId;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadAndPlay, { timeout: 1500 });
    } else {
      timerId = window.setTimeout(loadAndPlay, 400);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      poster="/St.MaryBackground.webp"
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

