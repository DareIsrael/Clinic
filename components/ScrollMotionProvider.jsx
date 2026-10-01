"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUp, Calendar } from "lucide-react";

export default function ScrollMotionProvider({ children }) {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Enable smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Handle scroll position to toggle back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Staggered reveal observer setup
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.08,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const attachMotionElements = () => {
      const explicitTargets = document.querySelectorAll(
        ".reveal-fade-up, .reveal-fade-in, .reveal-pop, .reveal-slide-right, .reveal-slide-left"
      );
      explicitTargets.forEach((el) => observer.observe(el));

      const headings = document.querySelectorAll("main h2, main h3");
      headings.forEach((heading, idx) => {
        if (!heading.classList.contains("reveal-fade-up") && !heading.classList.contains("is-revealed")) {
          heading.classList.add("reveal-fade-up");
          heading.style.transitionDelay = `${(idx % 3) * 0.1}s`;
          observer.observe(heading);
        }
      });

      const cardContainers = document.querySelectorAll(
        "main .grid > div, main section .rounded-xl, main section .rounded-2xl, main section .bg-white.shadow-md, main section .bg-white.shadow-lg"
      );

      cardContainers.forEach((card) => {
        if (card.closest("nav") || card.closest("footer") || card.closest(".modal")) return;
        card.classList.add("slick-card");

        if (!card.classList.contains("reveal-pop") && !card.classList.contains("reveal-fade-up") && !card.classList.contains("is-revealed")) {
          card.classList.add("reveal-pop");
          observer.observe(card);
        }
      });

      const cardIcons = document.querySelectorAll(
        "main section svg, main button svg, main a.btn svg"
      );
      cardIcons.forEach((svg) => {
        if (!svg.classList.contains("icon-fun-bounce")) {
          svg.classList.add("icon-fun-bounce");
        }
      });
    };

    const timer = setTimeout(() => {
      attachMotionElements();
    }, 100);

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Do not display floating buttons on appointment page itself to avoid duplicate CTAs
  const isAppointmentPage = pathname === "/appointment";

  return (
    <>
      {children}

      {/* Floating Action Bar (Bottom Right) */}
      {!isAppointmentPage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 transition-all duration-300 ease-out transform ${
            showScrollTop
              ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
              : "opacity-0 translate-y-8 pointer-events-none scale-75"
          }`}
        >
          {/* Book Appointment Button */}
          <Link
            href="/appointment"
            className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl border border-sky-300/30 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 group whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform duration-200" />
            <span>Book Appointment</span>
          </Link>

          {/* Scroll to Top Arrow Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-full shadow-2xl border border-sky-300/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      )}
    </>
  );
}
