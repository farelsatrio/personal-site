import { Heart } from "lucide-react";

/**
 * Minimalist footer with copyright and a "Built with" badge.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Alex Chen. All rights reserved.
        </p>

        {/* Built-with badge */}
        <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          Built with{" "}
          <Heart
            size={12}
            className="text-accent"
            fill="currentColor"
            aria-hidden="true"
          />{" "}
          using Next.js &amp; Tailwind
        </p>
      </div>
    </footer>
  );
}
