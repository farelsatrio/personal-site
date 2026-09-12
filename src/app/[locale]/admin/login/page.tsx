"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const returnUrl = searchParams.get("returnUrl") || `/${locale}/admin/blog`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to admin blog dashboard
        router.push(returnUrl);
        router.refresh();
      } else {
        setErrorMessage(data.error || "Invalid email or password.");
      }
    } catch (err: any) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-6">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                Admin Portal Login
              </h1>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Sign in to manage blog articles and content settings.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-semibold text-red-400 text-center animate-shake">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email / Username Field */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Email / Username
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    required
                    placeholder="admin@farelsatrio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/30 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/30 pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white shadow-lg hover:bg-accent/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 group mt-2"
              >
                {loading ? (
                  "Authenticating..."
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
