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
        return <Award className="h-8 w-8 text-accent" />;
      case "Trophy":
        return <Trophy className="h-8 w-8 text-accent" />;
      case "Medal":
        return <Medal className="h-8 w-8 text-accent" />;
      default:
        return <Award className="h-8 w-8 text-accent" />;
    }
  };

  return (
    <section id="achievements" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 font-mono text-sm text-accent">{t("section")}</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
          </div>
        </AnimatedSection>

        {/* Grid Layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => (
            <AnimatedSection key={item.titleKey} delay={index * 0.08}>
              <div className="group flex flex-col justify-between h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-accent">
                      {t(`categories.${item.category}`)}
                    </span>
                    <div className="p-2 rounded-lg bg-muted border border-border transition-colors duration-300 group-hover:border-accent/20 group-hover:bg-accent/5">
                      {getIcon(item.iconName)}
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="mb-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.organization}
                  </p>
                </div>

                {/* Footer details: Date & Optional Link */}
                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.date}
                  </span>
                  {item.credentialLink && (
                    <a
                      href={item.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-accent transition-colors hover:text-accent-foreground"
                    >
                      Verify <ExternalLink size={12} />
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
