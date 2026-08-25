"use client";

import { useTranslations } from "next-intl";
import { achievements } from "@/data/achievements";
import AnimatedSection from "./AnimatedSection";
import { Award, Trophy, Medal, ExternalLink } from "lucide-react";

export default function Achievements() {
  const t = useTranslations("Achievements");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="h-5 w-5" />;
      case "Trophy":
        return <Trophy className="h-5 w-5" />;
      case "Medal":
        return <Medal className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <section id="achievements" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header — left-aligned */}
        <AnimatedSection>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground md:mb-16 md:text-4xl">
            {t("title")}
          </h2>
        </AnimatedSection>

        {/* Grid — 2 columns matching 2 items */}
        <div className="grid gap-6 sm:grid-cols-2">
          {achievements.map((item, index) => (
            <AnimatedSection key={item.titleKey} delay={index * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-accent/30 md:p-8">
                <div>
                  {/* Icon + Category */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t(`categories.${item.category}`)}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.organization}
                  </p>
                </div>

                {/* Footer: Date & Link */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">
                    {item.date}
                  </span>
                  {item.credentialLink && (
                    <a
                      href={item.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-foreground"
                    >
                      Verify <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
