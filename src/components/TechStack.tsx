"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "./AnimatedSection";
import Devicon from "./Devicon";

/** Tech tool/skill definition */
interface Tool {
  name: string;
  iconName: string;
}

/** Category of tools with a label and list of tools */
interface StackCategory {
  category: string;
  tools: Tool[];
}

/**
 * DevOps & Cloud technology stack organized by category.
 */
const TECH_STACK: StackCategory[] = [
  {
    category: "Cloud Providers",
    tools: [
      { name: "AWS", iconName: "amazonwebservices" },
      { name: "OpenStack", iconName: "openstack" },
    ],
  },
  {
    category: "Containerization",
    tools: [
      { name: "Docker", iconName: "docker" },
      { name: "Kubernetes", iconName: "kubernetes" },
    ],
  },
  {
    category: "CI/CD",
    tools: [
      { name: "GitHub Actions", iconName: "github" },
      { name: "Git", iconName: "git" },
    ],
  },
  {
    category: "Infrastructure as Code",
    tools: [
      { name: "Terraform", iconName: "terraform" },
      { name: "Ansible", iconName: "ansible" },
    ],
  },
  {
    category: "Monitoring & Logging",
    tools: [
      { name: "Prometheus", iconName: "prometheus" },
      { name: "Grafana", iconName: "grafana" },
    ],
  },
  {
    category: "Operating Systems",
    tools: [
      { name: "Linux", iconName: "linux" },
      { name: "Bash", iconName: "bash" },
    ],
  },
];

/**
 * Tech Stack section displaying DevOps & Cloud tools in a clean
 * category-based grid with subtle hover effects.
 */
export default function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section id="stack" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 font-mono text-sm text-accent">{t("section")}</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Stack Categories & Grid */}
        <div className="space-y-12">
          {TECH_STACK.map((cat, catIndex) => (
            <AnimatedSection key={cat.category} delay={catIndex * 0.06}>
              <div className="space-y-4">
                {/* Category Header */}
                <h3 className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                  {cat.category}
                </h3>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-accent/30 hover:shadow-accent/5"
                    >
                      <Devicon
                        name={tool.iconName}
                        logoStyle="plain"
                        colored={true}
                        size="2.5rem"
                      />
                      <span className="mt-2 text-xs font-mono text-muted-foreground">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
