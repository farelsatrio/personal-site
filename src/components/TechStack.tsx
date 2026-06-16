"use client";

import AnimatedSection from "./AnimatedSection";

/** Tech tool/skill definition */
interface Tool {
  name: string;
  description: string;
}

/** Category of tools with a label and list of tools */
interface StackCategory {
  category: string;
  tools: Tool[];
}

/**
 * DevOps & Cloud technology stack organized by category.
 * Edit this array to reflect your actual skills.
 */
const TECH_STACK: StackCategory[] = [
  {
    category: "Cloud Providers",
    tools: [
      { name: "AWS", description: "EC2, S3, Lambda, ECS, RDS" },
      { name: "GCP", description: "GKE, Cloud Run, BigQuery" },
    ],
  },
  {
    category: "Containerization",
    tools: [
      { name: "Docker", description: "Multi-stage builds, Compose" },
      { name: "Kubernetes", description: "Helm, ArgoCD, Service Mesh" },
    ],
  },
  {
    category: "CI/CD",
    tools: [
      { name: "GitHub Actions", description: "Workflows, Matrix builds" },
      { name: "Jenkins", description: "Pipeline as Code, Shared Libs" },
    ],
  },
  {
    category: "Infrastructure as Code",
    tools: [
      { name: "Terraform", description: "Modules, State management" },
      { name: "Ansible", description: "Playbooks, Roles, Automation" },
    ],
  },
  {
    category: "Monitoring & Logging",
    tools: [
      { name: "Prometheus", description: "Metrics, Alertmanager" },
      { name: "Grafana", description: "Dashboards, Visualization" },
    ],
  },
  {
    category: "Operating Systems",
    tools: [
      { name: "Linux", description: "Ubuntu, CentOS, Alpine" },
      { name: "Shell Scripting", description: "Bash, Automation scripts" },
    ],
  },
];

/**
 * Tech Stack section displaying DevOps & Cloud tools in a clean
 * category-based grid with subtle hover effects.
 */
export default function TechStack() {
  return (
    <section id="stack" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 font-mono text-sm text-accent">~/stack</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tech Stack
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              The tools and technologies I work with daily to build, deploy,
              and maintain cloud-native infrastructure.
            </p>
          </div>
        </AnimatedSection>

        {/* Stack Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((category, catIndex) => (
            <AnimatedSection
              key={category.category}
              delay={catIndex * 0.08}
            >
              <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                {/* Category Label */}
                <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-accent">
                  {category.category}
                </h3>

                {/* Tools List */}
                <div className="space-y-3">
                  {category.tools.map((tool) => (
                    <div key={tool.name} className="space-y-0.5">
                      <p className="font-medium text-card-foreground">
                        {tool.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
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
