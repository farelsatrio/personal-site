"use client";

import { Download, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

/**
 * Hero section with profile picture, name, title, bio,
 * and CTA buttons for resume download and contact.
 */
export default function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
    >
      {/* Subtle gradient background decoration */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* ─── Profile Picture ─── */}
          <AnimatedSection className="shrink-0">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-sm" />
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-border bg-muted md:h-48 md:w-48">
                {/*
                  TODO: Replace this placeholder with your actual profile picture.
                  Place your image in /public/profile.jpg and update the src below.
                */}
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
                  alt="Profile picture"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </AnimatedSection>

          {/* ─── Text Content ─── */}
          <div className="text-center md:text-left">
            <AnimatedSection delay={0.1}>
              {/* Subtle tag line */}
              <p className="mb-3 font-mono text-sm text-accent">
                ~/welcome
              </p>

              {/* Name */}
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
                  Alex Chen
                </span>
              </h1>

              {/* Title */}
              <p className="mb-4 font-mono text-lg text-muted-foreground md:text-xl">
                DevOps &amp; Cloud Engineer
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {/* Bio */}
              <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                I architect and automate scalable cloud infrastructure,
                building robust CI/CD pipelines and container orchestration
                systems that empower engineering teams to ship faster and more
                reliably.
              </p>
            </AnimatedSection>

            {/* ─── CTA Buttons ─── */}
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                {/*
                  TODO: Place your actual resume PDF at /public/resume.pdf
                  The download button links to this file.
                */}
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-sm font-medium text-background transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
                >
                  <Download size={16} />
                  Download Resume
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-mono text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
                >
                  <Mail size={16} />
                  Contact Me
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
