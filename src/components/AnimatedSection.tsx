"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "fade-up" | "fade-in" | "scale-in" | "fade-right";

/** Hidden-state transform per variant (shown state is always none). */
const HIDDEN_TRANSFORM: Record<Variant, string> = {
  "fade-up": "translateY(24px)",
  "fade-in": "translateY(0)",
  "scale-in": "scale(0.96)",
  "fade-right": "translateX(-16px)",
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}

/** True when the user prefers reduced motion (client-only check). */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Reduced-motion users see content immediately, no observer needed.
  const [isVisible, setIsVisible] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Tambahkan delay sebelum animasi
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-80px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, isVisible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : HIDDEN_TRANSFORM[variant],
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
