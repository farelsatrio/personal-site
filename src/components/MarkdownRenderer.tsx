"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split by code blocks first
  const sections = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose prose-invert max-w-none space-y-4 text-foreground/90 leading-relaxed font-sans">
      {sections.map((section, index) => {
        // Render Code Block
        if (section.startsWith("```") && section.endsWith("```")) {
          const lines = section.slice(3, -3).trim().split("\n");
          let language = "text";
          let codeLines = lines;

          if (lines.length > 0 && /^[a-zA-Z0-9_-]+$/.test(lines[0].trim())) {
            language = lines[0].trim();
            codeLines = lines.slice(1);
          }

          const codeString = codeLines.join("\n");

          return (
            <div
              key={index}
              className="my-6 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2 text-xs font-mono text-muted-foreground">
                <span>{language}</span>
                <span className="uppercase font-semibold text-[10px]">Code</span>
              </div>
              <pre className="overflow-x-auto p-4 text-xs font-mono text-accent-foreground leading-relaxed">
                <code>{codeString}</code>
              </pre>
            </div>
          );
        }

        // Render regular text / markdown block
        const blocks = section.split("\n\n");

        return blocks.map((block, bIdx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          const blockKey = `${index}-${bIdx}`;

          // Headings
          if (trimmed.startsWith("### ")) {
            return (
              <h3
                key={blockKey}
                className="mt-6 mb-3 text-xl font-bold text-foreground tracking-tight"
              >
                {renderInlineMarkdown(trimmed.replace(/^###\s+/, ""))}
              </h3>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <h2
                key={blockKey}
                className="mt-8 mb-4 text-2xl font-bold text-foreground tracking-tight border-b border-border pb-2"
              >
                {renderInlineMarkdown(trimmed.replace(/^##\s+/, ""))}
              </h2>
            );
          }
          if (trimmed.startsWith("# ")) {
            return (
              <h1
                key={blockKey}
                className="mt-10 mb-4 text-3xl font-extrabold text-foreground tracking-tight"
              >
                {renderInlineMarkdown(trimmed.replace(/^#\s+/, ""))}
              </h1>
            );
          }

          // Blockquote
          if (trimmed.startsWith("> ")) {
            const quoteText = trimmed
              .split("\n")
              .map((line) => line.replace(/^>\s*/, ""))
              .join(" ");
            return (
              <blockquote
                key={blockKey}
                className="my-4 border-l-4 border-accent bg-accent/10 px-4 py-3 rounded-r-lg italic text-muted-foreground"
              >
                {renderInlineMarkdown(quoteText)}
              </blockquote>
            );
          }

          // Bullet List
          if (
            trimmed.split("\n").every((line) => /^\s*[-*]\s+/.test(line))
          ) {
            const items = trimmed.split("\n").map((line) => line.replace(/^\s*[-*]\s+/, ""));
            return (
              <ul
                key={blockKey}
                className="my-4 space-y-2 pl-6 list-disc marker:text-accent text-foreground/90"
              >
                {items.map((item, iIdx) => (
                  <li key={iIdx}>{renderInlineMarkdown(item)}</li>
                ))}
              </ul>
            );
          }

          // Numbered List
          if (
            trimmed.split("\n").every((line) => /^\s*\d+\.\s+/.test(line))
          ) {
            const items = trimmed.split("\n").map((line) => line.replace(/^\s*\d+\.\s+/, ""));
            return (
              <ol
                key={blockKey}
                className="my-4 space-y-2 pl-6 list-decimal marker:text-accent text-foreground/90"
              >
                {items.map((item, iIdx) => (
                  <li key={iIdx}>{renderInlineMarkdown(item)}</li>
                ))}
              </ol>
            );
          }

          // Regular Paragraph
          const lines = trimmed.split("\n");
          return (
            <p key={blockKey} className="my-3 leading-relaxed text-foreground/90">
              {lines.map((line, lIdx) => (
                <React.Fragment key={lIdx}>
                  {lIdx > 0 && <br />}
                  {renderInlineMarkdown(line)}
                </React.Fragment>
              ))}
            </p>
          );
        });
      })}
    </div>
  );
}

/** Helper to render inline formatting: **bold**, `code`, [links](url) */
function renderInlineMarkdown(text: string): React.ReactNode {
  // Regex pattern for bold, inline code, links
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:text-accent/80 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}
